const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

// db (.env uzantılı dosyayı düzenleyin)
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("Veritabanı bağlantısı başarılı"));

mongoose.connection.on("error", err => {
    console.log(`Veritabanına bağlanılamadı: ${err.message}`);
});

// routes
const postRoutes = require('./routes/post');
const wallRoutes = require('./routes/wall');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", wallRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Yetkinizin dışında bir alana girmeye çalıştınız!"});
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`Lojistisyen API Portu: ${port}`);});