import json
import firebase_admin

from flask import Flask, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore, storage

# Initialize the Firebase Admin SDK
cred = credentials.Certificate('api/firebase-adminsdk.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'oasst-peddet.appspot.com'
})

# Get a reference to the Firestore database
db = firestore.client()

app = Flask(__name__)
CORS(app)

@app.route('/api/images')
def get_image_urls():
    # Retrieve all files in the 'test-images' folder
    bucket = storage.bucket()
    blob_list = bucket.list_blobs(prefix='test-images/', delimiter='/')

    # Build list of image URLs
    urls = []
    for blob in blob_list:
        if not blob.name.endswith('/'):
            urls.append(blob.public_url)

    # Return list of image URLs as JSON
    return jsonify(urls)

@app.route('/models')
def get_models():
    models_ref = db.collection('models')
    models_docs = models_ref.get()
    models_data = []
    for doc in models_docs:
        models_data.append(doc.to_dict())
    return json.dumps(models_data)

if __name__ == '__main__':
    app.run(debug = True)
