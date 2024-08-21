from flask import Flask, request, jsonify, send_file
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os
import pandas as pd
from sklearn.cluster import DBSCAN
from geopy.distance import great_circle
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
import pickle

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

# Load your model from the .pkl file
with open('models/your_model.pkl', 'rb') as file:
    your_model = pickle.load(file)

def clean_data(data):
    """
    Function to clean the data
    """
    # Convert to DataFrame
    df = pd.DataFrame(data)
    
    # Drop rows with missing values
    df.dropna(inplace=True)
    
    # Standardize numerical data (e.g., latitude, longitude)
    df['latitude'] = (df['latitude'] - df['latitude'].mean()) / df['latitude'].std()
    df['longitude'] = (df['longitude'] - df['longitude'].mean()) / df['longitude'].std()
    
    # Example: Encoding categorical data if present
    # if 'category' in df.columns:
    #     df = pd.get_dummies(df, columns=['category'])
    
    return df

@app.route('/api/artisans', methods=['GET'])
def get_artisans():
    artisans = list(mongo.db.artisans.find())
    return jsonify(artisans)

@app.route('/api/users', methods=['GET'])
def get_users():
    users = list(mongo.db.users.find())
    return jsonify(users)

@app.route('/api/recommend', methods=['POST'])
def recommend_artisans():
    user_id = request.json['user_id']
    user = mongo.db.users.find_one({'_id': user_id})
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    artisans = list(mongo.db.artisans.find())
    artisans_df = clean_data(artisans)
    locations = artisans_df[['latitude', 'longitude']].values
    
    dbscan = DBSCAN(eps=0.1, min_samples=5, metric=lambda x, y: great_circle(x, y).meters)
    artisans_df['cluster'] = dbscan.fit_predict(locations)
    
    user_location = [user['latitude'], user['longitude']]
    user_cluster = dbscan.fit_predict([user_location])[0]
    
    if user_cluster == -1:
        return jsonify({'error': 'User does not belong to any cluster'}), 404
    
    recommended_artisans = artisans_df[artisans_df['cluster'] == user_cluster].to_dict('records')
    return jsonify(recommended_artisans)

@app.route('/api/visualize_clusters', methods=['GET'])
def visualize_clusters():
    artisans = list(mongo.db.artisans.find())
    artisans_df = clean_data(artisans)
    locations = artisans_df[['latitude', 'longitude']].values
    
    dbscan = DBSCAN(eps=0.1, min_samples=5, metric=lambda x, y: great_circle(x, y).meters)
    artisans_df['cluster'] = dbscan.fit_predict(locations)
    
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x=artisans_df['longitude'], y=artisans_df['latitude'], hue=artisans_df['cluster'], palette='tab10')
    plt.title('Artisan Clusters')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
