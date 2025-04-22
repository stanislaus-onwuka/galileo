# Galileo

Galileo is the prototype of my final year project required for the completion of my B.Sc. 

### Brief
It is web based platform that allows customers to connect with artisans. The artisans are clustered together based on location and proximity to clients using a clustering algorithm. The artisans are then ranked based on user preferences and feedback, qualifications and competence. There’s a user feedback mechanism that collects this data. There is also a payment system integrated throughout the platform. This platform provides a channel for suppliers to be linked to artisans that require supplies. This channel also provides quotation and inventory management for the suppliers. Other business tools like invoicing and bookkeeping are also offer on the platform to suppliers and artisans


## 🚀 Features

- **Connecting Artisans**: Linking customers with qualified artisans

- **Feedback system**: Designed a system for collecting and storing feedback from users about artisans.

- **Payment integration**: Integrated a secure payment system to handle transactions between customers, artisans, and suppliers.

- **Supplier linkage**: Created features for linking suppliers with artisans, including capabilities for sending and receiving quotes and managing inventory.

- **Business tools integration**: Included tools for invoicing and bookkeeping for both suppliers and artisans.



## 🏗️ Project Structure

```
galileo/
├── frontend/                     # Frontend built with React
├── backend/                      # Backend built with Python (Fast API)
└── modeling/                     # Clustering and Recommending 
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or later)
- Python
- npm or yarn package manager
- MongoDB (local instance or MongoDB Atlas account)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stanislaus-onwuka/galileo.git
   cd galileo
   ```

2. Install dependencies:
 - frontend/
   ```bash
   npm install
   # or
   yarn install
   ```
- backend/
   ```bash
  pip install
   ```

3. Set up your environment variables:
   Create a `.env` file in the backend root directory

   ```
    MONGODB_URI=your_mongodb_connection_string
    SECRET_KEY=your_secret_key
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=30


    EMAIL_API_KEY= ***
    EMAIL_API_SECRET= ***
    MONGO_URI= mongodb://localhost:27017
    ADMIN_EMAIL= ***

    MONGO_PASSWORD= ***
   ```

4. Start the development server:
- frontend/
   ```bash
   npm run dev
   # or
   yarn dev
   ```
- backend/app/
   ```bash
   uvicorn main:app --reload
   ```



## 🔒 Authentication

Galileo uses JWT (JSON Web Tokens) for authentication.


## 💾 API Endpoints
The endpoints can be viewed locally on http://127.0.0.1:8000/docs


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 📞 Contact

- Stanley Onwuka - chisomstanleyo@yahoo.com
- Tolulope Joel - toluisjoel@gmail.com

Project Link: [https://github.com/stanislaus-onwuka/galileo](https://github.com/stanislaus-onwuka/galileo)

## 🙏 Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Chart.js](https://www.chartjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
