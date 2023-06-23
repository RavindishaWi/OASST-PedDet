import json
import tempfile
import urllib

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
import base64

from backend.api.service import get_results

# initialize the Firebase Admin SDKcred = credentials.Certificate('firebase-adminsdk.json')
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


@app.route('/api/detect', methods=['POST'])
def detect_objects():
    # Check that the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    data = request.get_json()
    image_urls_list = data['imageUrls']

    print(data)

    print(image_urls_list)

    results = {}

    for image_url in image_urls_list:
        image = load_image(image_url)
        local_file_path = create_local_temp_file(image_url)
        status = get_results(local_file_path)
        # Will wait till the combined_attention and output image is generated
        if status == 'done':
            print('Image generation successful')

            # output path of the generated images by the dino model
            output_com_image_path = 'results/combined_attention.png'
            output_image_path = 'results/output_image.jpg'

            # passing the paths of the generated images for encoding
            output_com_image = encode_image(output_com_image_path)
            output_image = encode_image(output_image_path)

            # encoded images will be added for a dictionary
            temp_result = {'combined_attention': output_com_image, 'output_image': output_image}

            # adding to final json, this containes original image url from firebase, and the generated output images
            results[image_url] = temp_result

    # print(results)
    # sample how the results json will look like
    # results = {'image1url : {'combined_attention': data, 'output_image': data}, image2url: : {'combined_attention': data, 'output_image': data}...}

    return jsonify(results)


def load_image(image_url):
    """
    Load an image from a URL
    """
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))

    # Convert the image to numpy array and normalize it
    image = np.array(image) / 255.0

    return image


# Dino model dosen't accept image url as path, so this function will download and create temp local file
def create_local_temp_file(url):
    with urllib.request.urlopen(url) as response:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(response.read())
            return temp_file.name


# Images will be encoded to output to the API
def encode_image(image_path):
    # Read the image file
    with open(image_path, 'rb') as f:
        image_data = f.read()

    encoded_image = base64.b64encode(image_data).decode('utf-8')
    # Create a JSON response containing the image data
    response = encoded_image

    return response


if __name__ == '__main__':
    app.run(debug=True)
