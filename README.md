# 🌱 Agro Market

A modern MERN Stack based digital marketplace that connects farmers directly with customers for selling fresh vegetables and farm products online.

Agro Market creates a transparent farm-to-table ecosystem where farmers can manage their products and orders, while customers can browse fresh produce, place secure orders, and track deliveries easily.

---

# 🚀 Features

## 👨‍🌾 Buyer Features

* Browse fresh vegetables and farm products
* Search and filter products
* Category-wise product browsing
* View detailed product pages
* Explore farmer profiles
* Add products to cart
* Secure checkout system
* Order tracking
* Wishlist functionality
* User profile management
* Ratings and reviews

---

## 🌾 Farmer Features

* Farmer dashboard
* Add/Edit/Delete products
* Manage product inventory
* View and manage orders
* Update order status
* Sales analytics
* Earnings management
* Farmer profile management
* Customer reviews management

---

## 🔐 Authentication Features

* JWT Authentication
* Secure password hashing using bcryptjs
* Buyer & Farmer roles
* Protected routes
* Login/Register system

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* Framer Motion
* Lucide React

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication & Security

* JWT
* bcryptjs

---

# 📁 Project Structure

```bash
Agro-Market/
│
├── client/         # Buyer Side
├── farmer/         # Farmer Dashboard
├── server/         # Backend API
│
└── README.md
```

---

# 📦 Backend Folder Structure

```bash
server/src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── uploads/
│
├── app.js
└── server.js
```

---

# 📄 Main Pages

## Buyer Side

* Home Page
* Produce Catalog
* Product Details
* Farmer Profiles
* Shopping Cart
* Checkout
* User Account
* About Page
* Contact Page

## Farmer Side

* Dashboard
* Products
* Add Product
* Edit Product
* Orders
* Analytics
* Earnings
* Reviews
* Profile
* Settings

---

# 🔗 API Routes

## Authentication

```bash
/api/auth
```

## Products

```bash
/api/products
```

## Farmers

```bash
/api/farmers
```

## Orders

```bash
/api/orders
```

## Cart

```bash
/api/cart
```

## Reviews

```bash
/api/reviews
```

---

# 📊 Database Models

* User
* FarmerProfile
* Product
* Cart
* Order
* Review
* Wishlist
* Payment

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/agro-market.git
```

---

## Install Frontend Dependencies

### Buyer App

```bash
cd client
npm install
```

### Farmer App

```bash
cd farmer
npm install
```

---

## Install Backend Dependencies

```bash
cd server
npm install
```

---

# ▶️ Run Project

## Start Buyer Frontend

```bash
cd client
npm run dev
```

## Start Farmer Dashboard

```bash
cd farmer
npm run dev
```

## Start Backend Server

```bash
cd server
npm run dev
```

---

# 🌐 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

# 🎯 Future Enhancements

* AI-based product recommendations
* Live chat system
* Real-time order tracking
* Mobile application
* Multi-language support
* Online payment integration
* Farmer verification system

---

# 🤝 Contributing

Contributions are welcome.
Feel free to fork this repository and submit pull requests.

---

# 📜 License

This project is created for educational and learning purposes.

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
