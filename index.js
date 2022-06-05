const express = require("express");
const port = 3000;
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.listen(port, () => {
    console.log(`The server is running succesfully on the http://localhost:${port}. `);
});


// serving the static files
app.use(express.static(path.join(__dirname, "public")));


// serving the / route
app.get("/", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
});





// serving not found urls
app.use((req, res) => {
    res.sendFile("./public/pages/notFound.html", { root: __dirname });
});
  