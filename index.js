const express = require("express");
const port = 3000;
const path = require("path");
const db = require("./data/utils/db.js");
const crypto = require("crypto");
const axios = require("axios").default;
const global = require("./utils.js");
const { response } = require("express");

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
    

app.post("/api/login",(req,res)=>{
    //validation
    const userLogin=req.body;
    const dbUser=db.findUser(userLogin.email.trim().toLowerCase())
    if(dbUser===undefined){
        //send error to ui
        
        res.setHeader("err", "notExist").end();

    }
    else{
        const salt=dbUser.salt;
        const hash = crypto.pbkdf2Sync(userLogin.pass, salt, 1000, 64, `sha512`).toString(`hex`);
        if(hash===dbUser.hash){
            const id = dbUser.id;
            const token = crypto.randomBytes(16).toString('hex');
            global.setId(id,token);
            res.cookie('token',`${token}`).end()        
        }
        else{
            res.setHeader("err","notMatch").end();

        }

    }
    
   
})

app.post("/api/signup",(req,res)=>{
    const person = req.body;
    if(person.pass === person.pass2){
        const user = db.findUser(person.email);
        if(user === undefined){
            // hashing process
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(person.pass, salt, 1000, 64, `sha512`).toString(`hex`);
            // inserting the user into user table
            db.insertUser(person.name,person.email.trim().toLowerCase(),hash,salt);
            const user = db.findUser(person.email);
            const id = user.id;
            const token = crypto.randomBytes(16).toString('hex');
            global.setId(id,token);
            res.cookie('token',`${token}`).end()
        }
        else{
            // err to ui about exists email
            res.setHeader("err", "exists").end();
        }
    }
    else{
        // err to ui about not same
        res.setHeader("err", "notMatched").end();
        
    }
    // validation
    

});
app.get("/workouts", (req, res) => {
    const userToken = global.cookieParser(req.headers.cookie);
    const userGV = global.getId(userToken);

    const allTrainings = db.selectTrainings()
    const allUsers = db.selectUsers()

    const currentUser = allUsers.filter(user=> user.id === userGV.id);
    const currentUserTrainings = allTrainings.filter(training => training.userId === userGV.id)
    const otherUsers = allUsers.filter(user=> user.id !== userGV.id);
    const otherUsersTrainings = allTrainings.filter(training => training.userId !== userGV.id)

    
    let arrOfOtherUsers =[]
    let temp = [];
    
    otherUsers.forEach((user,idx)=>{
        temp.push(user);
        if(temp.length === 4 || idx+1 === allUsers.length) {
            arrOfOtherUsers.push(temp);
            temp = [];
        }
    })

    // let otherGym1Data = []
    // axios.get("https://b304-113-203-87-189.eu.ngrok.io/api/ourgym")
    //         .then(response=>{
    //             otherGym1Data = response.data;
    //         }) 
    
    // let otherGymsUsers =[]
    // let otherGymsWorkouts =[]

    // otherGymsUsers = otherGym1Data.map(datum=>{
    //     return [...otherGymsUsers, {'username':datum.personName}]
    // })

    // otherGymsWorkouts = otherGym1Data.map(datum=>{
        
    //     return [...otherGymsWorkouts, ]
    // })






    res.render("pages/workouts",{
        currentUser,
        currentUserTrainings,
        arrOfOtherUsers,
        otherUsersTrainings
        //otherGymsUsers,
        //otherGymsWorkouts

    })
});

app.get("/modify", (req, res) => {
    const userToken = global.cookieParser(req.headers.cookie);
    const userGV = global.getId(userToken)
    let userTrainings = db.selectUserTrainings(userGV.id);
    const nowDate=new Date().getDate();
    userTrainings = userTrainings.map(training=> {

        const due = new Date(training.dueDate)
        training = {...training, 'remaining':Math.abs(due.getDate() - nowDate)};
        return training
    })
    
    res.render("pages/modify",{
        userTrainings
    })
    
});
app.post("/modify",(req,res)=>{
    const filter=req.body;
    const userToken = global.cookieParser(req.headers.cookie);
    const userGV = global.getId(userToken)
    let userTrainings = db.selectUserTrainings(userGV.id);
    
    if(filter.hasOwnProperty("end")){
        let dueDate,start,end;
        userTrainings=userTrainings.map(training=>{
            dueDate=training.dueDate.split("-").join("");
            start=filter.start.split("-").join("");
            end=filter.end.split("-").join("");
            if(dueDate>start && dueDate<end){
                console.log(training)
                return training;
            }
        })
        
    }
    else{
        let dueDate,daily;
        userTrainings=userTrainings.filter(training=>{
            dueDate=training.dueDate;
            daily=filter.daily
            console.log(daily)
            console.log(dueDate)
            if(daily===dueDate){
                console.log(training)
                return training
            }
        })
        console.log(userTrainings)
    }
    res.json({data:userTrainings})

})

app.post("/api/addtraining", (req, res) => {
    const training = req.body;
    const userToken = global.cookieParser(req.headers.cookie);
    const userGV = global.getId(userToken)
    db.insertTraining(userGV.id,training.name,parseInt(training.repeatCount),training.dueDate,parseInt(training.timeCount),training.category);
    res.redirect("../modify")
    
    
});

app.put("/api/edittraining", (req, res) => {
    const training = req.body;
    db.updateTraining(training.name,parseInt(training.repeatCount),training.dueDate,parseInt(training.timeCount),training.category,training.trainingId);
    res.redirect("../modify")
});

app.delete("/api/deletetraining", (req, res) => {
    const training = req.body;
    db.deleteTraining(training.id);
    
    res.redirect("../modify")
});

app.post("/api/logout", (req, res) => {
    const userToken = req.body
    const userGV = global.getId(userToken)
    global.clearUser(userGV)    
    res.redirect("http://localhost:3000")
});

app.get("/api/trainings", (req, res) => {
    let allTrainings = db.selectTrainings();
    const users = db.selectUsers();
    const usersName = users.map(user=>{
        return {id:user.id, name:user.name}
    });
    allTrainings = allTrainings.map(training=>{
        const user = usersName.find(user=> user.id === training.userId);
        delete training.id;
        delete training.userId;
        return training = {...training,'username' : user.name}
    })
    res.json(allTrainings);
});



// serving not found urls
app.use((req, res) => {
    res.render("pages/notFound")
});
  