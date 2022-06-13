const Database = require("better-sqlite3");
const Queries = require("./queries");


const db = new Database('./data/db.sqlite3');


module.exports={
    database:db,
    
    findUser: (username)=>{
        const stmt = db.prepare(Queries.userFind)

        const person = stmt.get(username);
    
        return person;
    
    },
    insertUser: (id,name,username,password)=>{
        const stmt = db.prepare(Queries.userInsert);
    
        const info = stmt.run(id,name,username,password);
    
        console.log(info);
    
    },
    selectUser:()=>{
        const stmt = db.prepare(Queries.userSelect)
    
        const users = stmt.all();
    
        return users
    },



    insertTraining: (id,userId,name,repeat,time,category)=>{
        const stmt = db.prepare(Queries.trainingInsert);
    
        const info = stmt.run(id,userId,name,repeat,time,category);
    
        console.log(info);
    
    },
    selectTraining:()=>{
        const stmt = db.prepare(Queries.trainingSelect)
    
        const trainings = stmt.all();
    
        return trainings
    },
    deleteTraining:(id)=>{
        const stmt = db.prepare(Queries.trainingDelete)
    
        const info = stmt.run(id);
    
        console.log(info);
    }
}