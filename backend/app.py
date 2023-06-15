import json
import firebase_admin

from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_cors import CORS
from firebase_admin import credentials, firestore, storage, auth

# initialize the Firebase Admin SDK
cred = credentials.Certificate('api/firebase-adminsdk.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'oasst-peddet.appspot.com'
})

# get a reference to the Firestore database
db = firestore.client()

app = Flask(__name__)
CORS(app)

@app.route('/admin', methods=['POST'])
def admin_login():
    email = request.form['email']
    password = request.form['password']

    id_token = request.form['id_token']
    decoded_token = auth.verify_id_token(id_token)
    uid = decoded_token['uid']

    try:
        # Authenticate the admin user using Firebase Authentication
        user = auth.get_user_by_email(email)
        # Check if the user's email matches the admin user list
        if user.email in ['ravindisha.2019430@iit.ac.lk']:
            auth.verify_password(password, user)
            # Admin authentication successful
            success_message = 'Login successful'
            return render_template('admin_login.html', success_message=success_message)
        else:
            # User not in the admin user list
            error_message = 'Access denied'
            return render_template('admin_login.html', error_message=error_message)

    except auth.AuthError:
        # admin authentication failed
        error_message = 'Invalid credentials'
        return render_template('admin_login.html', error_message=error_message)

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
