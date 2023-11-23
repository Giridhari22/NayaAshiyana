require('dotenv').config()
const express = require("express");
const app = express()
const PORT = process.env.PORT || 4500;
const path = require("path");
const userRoute = require("./routes/userRoutes")
const ownerRoute = require("./routes/ownerRoutes")
const PgRoute = require("./routes/pgRoute")
const passport = require('./passport');
const paymentRoute = require("./routes/paymentRoute")
const session = require("express-session")

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const cors = require("cors")

const bodyParser = require('body-parser');
require("./config/db")()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./uploads")));


app.use("/", userRoute)
app.use("/", ownerRoute)
app.use("/", PgRoute)
app.use("/", paymentRoute)



app.listen(PORT, () => {
    console.log(`listening to the port no ${PORT}`)
});