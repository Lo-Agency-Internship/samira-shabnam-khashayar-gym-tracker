const express = require("express");
const port = 3000;
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set("view engine","twig");
app.set("views", path.join(__dirname, "public" , "templates"))


app.listen(port, () => {
    console.log(`The server is running succesfully on the http://localhost:${port}. `);
});


// serving the static files
app.use(express.static(path.join(__dirname, "public")));


// serving the / route
app.get("/", (req, res) => {
    res.render("index")
});

app.get("/workouts", (req, res) => {
    res.render("pages/workouts")
});

app.get("/modify", (req, res) => {
    res.render("pages/modify")
});


// serving not found urls
app.use((req, res) => {
    res.render("pages/notFound")
});
  