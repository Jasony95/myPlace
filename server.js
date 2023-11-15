const express = require("express");
const path = require("path")
const app = express()
const exhbs = require("express-handlebars")
const routes = require("./controllers")
// const sequelize = require('../config/connection');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exhbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// home page route
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/index.html"))
// })

app.get("/", (req, res) => {

    res.render("home");
})

app.get("/login", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("login", options)
})

app.get("/signup", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("signup", options)
})

app.get("/userpage", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("userpage", options)
})

app.get("/home", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("home", options)
})



app.use("*", routes)

// Set up sessions with cookies
// const sess = {
//     secret: 'Super secret secret',
//     cookie: {
//         // Stored in milliseconds
//         maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
//     },
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize,
//     }),
// };

// app.use(session(sess));

const okToSync = process.env.NODE_ENV === "production" ? false : true;

// Force above to drop/recreate table(s) on every sync
sequelize.sync({ force: okToSync }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});