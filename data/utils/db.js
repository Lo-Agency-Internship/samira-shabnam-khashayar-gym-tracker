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
    insertUser: (name,username,hash,salt)=>{
        const stmt = db.prepare(Queries.userInsert);
    
        const info = stmt.run(name,username,hash,salt);
    
        console.log(info);
    
    },
    selectUsers:()=>{
        const stmt = db.prepare(Queries.userSelect)
    
        const users = stmt.all();
    
        return users
    },
    getSalt:(username)=>{
        const stmt = db.prepare(Queries.saltGet)
    
        const users = stmt.get(username);
    
        return users
    },



    insertTraining: (userId,name,repeat,time,category)=>{
        const stmt = db.prepare(Queries.trainingInsert);
    
        const info = stmt.run(userId,name,repeat,time,category);
    
        console.log(info);
    
    },
    selectTrainings:()=>{
        const stmt = db.prepare(Queries.trainingSelect)
    
        const trainings = stmt.all();
    
        return trainings
    },
    selectUserTrainings:(id)=>{
        const stmt = db.prepare(Queries.userTrainingSelect)
    
        const trainings = stmt.all(id);
    
        return trainings
    },
    deleteTraining:(id)=>{
        const stmt = db.prepare(Queries.trainingDelete)
    
        const info = stmt.run(id);
    
        console.log(info);
    }
}