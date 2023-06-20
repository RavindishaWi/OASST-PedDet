import json
import firebase_admin

from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_cors import CORS
from firebase_admin import credentials, firestore, storage, auth

from PIL import Image
import requests
from io import BytesIO
from google.cloud import storage as gcs_storage
import joblib
import numpy as np
from skimage.transform import resize
import pickle
from werkzeug.exceptions import BadRequest
import functools

# initialize the Firebase Admin SDK
cred = credentials.Certificate('api/firebase-adminsdk.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'sst-peddet.appspot.com'
})

app = Flask(__name__)
CORS(app)

# get a reference to the storage bucket
bucket = storage.bucket()

# initialize the Firestore database client
db = firestore.client()

model_cache = {}

@app.route('/auth', methods=['POST'])
def verify_token():
    print("Request reached /auth")
    id_token = request.json.get('idToken', '')
    try:
        # check the token against the Firebase Auth API
        # this verifies that the token is correctly signed and not expired
        decoded_token = auth.verify_id_token(id_token)
        # token is valid, return some sort of success response
        return jsonify({"status": "success"}), 200
    except Exception as e:
        # token is invalid, return an error response
        return jsonify({"error": str(e)}), 400

@app.route('/api/images')
def get_image_urls():
    # retrieve all files in the 'test-images' folder
    bucket = storage.bucket()
    blob_list = bucket.list_blobs(prefix='test-images/', delimiter='/')

    # build list of image URLs
    urls = []
    for blob in blob_list:
        if not blob.name.endswith('/'):
            urls.append(blob.public_url)

    # return list of image URLs as JSON
    return jsonify(urls)

@app.route('/upload', methods=['POST'])
def upload_file():
    # get the file from the HTTP POST request
    file = request.files['file']

    # create a storage client
    bucket = storage.bucket()

    # create a blob (object) in the Firebase Storage 'test-images' folder and give it the name of the uploaded file
    blob = bucket.blob('test-images/' + file.filename)

    # upload the file content to the created blob
    blob.upload_from_string(
        file.read(),
        content_type=file.content_type
    )

    # make the blob publicly viewable
    blob.make_public()

    # get the public URL of the uploaded file
    public_url = blob.public_url

    # initialize Firestore client
    db = firestore.client()

    # add the image URL to Firestore
    doc_ref = db.collection('images').document(file.filename)
    doc_ref.set({
        'url': public_url
    })

    # return public_url wrapped in a JSON response
    return jsonify({'url': public_url})

def doc_to_dict(doc):
    data = doc.to_dict()
    for key, value in data.items():
        if isinstance(value, firestore.DocumentReference):
            data[key] = value.path  # convert DocumentReference to path string
    return {**data, 'id': doc.id}

@app.route('/models', methods=['GET'])
def get_models():
    models_ref = db.collection('models')
    models = models_ref.stream()
    models_data = [doc_to_dict(doc) for doc in models]
    return json.dumps(models_data)

def load_model(model_id):
    """
    Load a model from Firebase Storage
    """
    if model_id is None:
        raise ValueError("Model ID cannot be None")

    # Check if model is in cache
    if model_id in model_cache:
        return model_cache[model_id]

    # If model is not in cache, download from storage
    blob = bucket.blob(f'models/{model_id}.pkl')
    blob_bytes = blob.download_as_bytes()
    model = pickle.loads(blob_bytes)

    # Save model to cache
    model_cache[model_id] = model

    return model

@app.route('/api/detect', methods=['POST'])
def detect_objects():
    # Check that the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    data = request.get_json()

    # Check for required fields in the JSON data
    if 'modelId' not in data or 'imageUrls' not in data:
        return jsonify({"error": "The fields 'modelId' and 'imageUrls' are required"}), 400

    model_id = data.get('modelId')
    image_urls = data.get('imageUrls')

    try:
        model = load_model(model_id)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    results = []

    for image_url in image_urls:
        try:
            image = load_image(image_url)
            result = apply_model_to_image(model, image)
            results.append({
                'imageUrl': image_url,
                'result': result
            })
        except Exception as e:
            return jsonify({'error': 'Error processing image {}: {}'.format(image_url, e)}), 500

    return jsonify(results)

def apply_model_to_image(model, image):
    """
    Apply a model to an image
    """
    # Resize the image to the size the model expects
    image = resize(image, (224, 224, 3)) # Use your model's expected input size here

    # Apply the model
    result = model.predict(np.expand_dims(image, axis=0))

    # Convert the result to a list (if it's not already) so it can be serialized to JSON
    if not isinstance(result, list):
        result = result.tolist()

    return result

def load_image(image_url):
    """
    Load an image from a URL
    """
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))

    # Convert the image to numpy array and normalize it
    image = np.array(image) / 255.0

    return image

if __name__ == '__main__':
    app.run(debug = True)
