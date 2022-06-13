const db = require("./data/utils/db");
const Queries = require("./data/utils/queries");



const Database = db.database;

// User table
let stmt = Database.prepare(Queries.userTableCreate)
let info = stmt.run();
console.log(info);


// Training table
stmt = Database.prepare(Queries.trainingTableCreate)   
info = stmt.run();
console.log(info);

