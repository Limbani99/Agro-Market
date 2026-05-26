const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/users', require('./routers/userRoutes'))
app.use('/api/products', require('./routers/productRoutes'))
app.use('/api/reviews', require('./routers/reviewRoutes'))
app.use('/api/cart', require('./routers/cartRoutes'))
app.use('/api/order', require('./routers/orderRoutes'))
// app.use('/api/payment', require('./routers/paymentRoutes'))
app.use('/api/wishlist', require('./routers/wishlistRoutes'))
app.use('/api/notifications', require('./routers/notificationRoutes'))
// app.use('/api/contact', require('./routers/contactRoutes'))
// app.use('/api/admin', require('./routers/adminRoutes'))

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(5000, () => {
    console.log("Server started on port 5000");
})