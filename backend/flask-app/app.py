import json
import firebase_admin

from flask import Flask, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore

# Initialize the Firebase Admin SDK
cred = credentials.Certificate('../api/firebase-adminsdk.json')
firebase_admin.initialize_app(cred)

# Get a reference to the Firestore database
db = firestore.client()

app = Flask(__name__)
CORS(app)

@app.route('/models')
def get_models():
    models_ref = db.collection('models')
    models_docs = models_ref.get()
    models_data = []
    for doc in models_docs:
        models_data.append(doc.to_dict())
    return json.dumps(models_data)


@app.route('/hello')
def hello():
    response = {'message': 'Hello, World!'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug = True)
