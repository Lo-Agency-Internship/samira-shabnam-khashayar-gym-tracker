const { application } = require("express");
const express = require("express");
const port = 3000;
const path = require("path");
const db = require("./data/utils/db.js");

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
    res.render("index",{
        err: true
    })
});

app.post("/api/signup",(req,res)=>{
    const person = req.body;
    if(person.pass === person.pass2){
        const user = db.findUser(person.username);
        if(user === undefined){

            // hash the password
            db.insertUser(person.id,person.name,person.username,person.pass);
            const user = db.findUser(person.username);
            res.setHeader("user-id",user.id)
            res.redirect("../workouts")       
        }
        else{
            // err to ui about exists email
        }
    }
    else{
        // err to ui about not same
    }
    // validation
    

});
app.get("/workouts", (req, res) => {
    const userId = req.get("user-id");
    const allTrainings = db.selectTraining();
    const userTraining = allTrainings.filter(training => training.userId === userId);
    const otherTrainings = [];
    
    allTrainings = allTrainings.filter(training => training.userId !== userId)
    res.cookie("id",)
    res.render("pages/workouts",{
        allTrainings,
        userTraining,
        otherTrainings
    })
});

app.get("/modify", (req, res) => {
    res.render("pages/modify")
});


// serving not found urls
app.use((req, res) => {
    res.render("pages/notFound")
});
  