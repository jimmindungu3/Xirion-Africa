# MERN E-Commerce Application

A full-stack **e-commerce web application** built using the **MERN stack (MongoDB, Express, React, Node.js)**. The application allows users to browse products, add items to the cart, place orders, and manage their profiles. Admins can manage products, orders, and users.  

## Features

- User authentication (register/login/logout)
- Product listing with categories and search
- Product details page
- Shopping cart and checkout
- Order history and status tracking
- Responsive design for mobile and desktop
- RESTful API backend

## Tech Stack

- **Frontend:** React, React Router, Context API, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** [M-Pesa]
- **State Management:** Context API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jimmindungu3/xirion-africa.git
cd mern-ecommerce
```

2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Create a `.env` file in the backend folder with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the application:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view in your browser.

## Folder Structure

```
/backend
  /controllers
  /models
  /routes
  server.js
/frontend
  /components
  /pages
  /redux
  /styles
  App.js
```

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request.  

## License

This project is licensed under the MIT License.
