module.exports={


    // user queries
    userCreate: `CREATE TABLE users(id int PRIMARY KEY,
        name string, 
        username string, 
        password string
        )`,

    userInsert: `INSERT INTO users(id, 
        name, 
        username, 
        password
        ) VALUES 
        (?,?,?,?)`,

    userSelect: `SELECT * FROM users`,


    // training queries
    trainingCreate: `CREATE TABLE trainings(id int PRIMARY KEY, 
        userId int, 
        name string, 
        repeatCount int, 
        timeCount int, 
        category string
        )`,

    trainingInsert: `INSERT INTO trainings(id, 
        userId, 
        name, 
        repeatCount,
        timeCount,
        category
        ) VALUES 
        (?,?,?,?,?,?)`,

    trainingSelect: `SELECT * FROM training`,

    trainingDelete: (id)=> `DELETE FROM trainings WHERE id="${id}"`
}