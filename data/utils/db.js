const Database = require("better-sqlite3");
const Constants = require("./constants");


const db = new Database('./data/db.sqlite3');


module.exports={
    createUser: ()=>{
        const stmt = db.prepare(Constants.userCreate)
    
        const info = stmt.run();
    
        console.log(info);
    
    },
    insertUser: (id,name,username,password)=>{
        const stmt = db.prepare(Constants.userInsert);
    
        const info = stmt.run(id,name,username,password);
    
        console.log(info);
    
    },
    selectUser:()=>{
        const stmt = db.prepare(Constants.userSelect)
    
        const users = stmt.all();
    
        return users
    },



    createTraining: ()=>{
        const stmt = db.prepare(Constants.trainingCreate)
    
        const info = stmt.run();
    
        console.log(info);
    
    },
    insertTraining: (id,userId,name,repeat,time,category)=>{
        const stmt = db.prepare(Constants.trainingInsert);
    
        const info = stmt.run(id,userId,name,repeat,time,category);
    
        console.log(info);
    
    },
    selectTraining:()=>{
        const stmt = db.prepare(Constants.trainingSelect)
    
        const trainings = stmt.all();
    
        return trainings
    },
    deleteTraining:(id)=>{
        const stmt = db.prepare(Constants.trainingDelete(id))
    
        const info = stmt.run();
    
        console.log(info);
    }
}