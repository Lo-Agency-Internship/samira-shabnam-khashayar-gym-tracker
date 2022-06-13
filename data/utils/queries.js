module.exports={

    // user queries
    userTableCreate: `CREATE TABLE IF NOT EXISTS users(id int PRIMARY KEY,
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
    userFind: `SELECT * FROM users WHERE username = ?`,


    // training queries
    trainingTableCreate: `CREATE TABLE IF NOT EXISTS trainings(id int PRIMARY KEY, 
        userId int, 
        name string, 
        repeatCount int,
        dueDate string, 
        timeCount int, 
        category string
        )`,

    trainingInsert: `INSERT INTO trainings(id, 
        userId, 
        name, 
        repeatCount,
        dueDate,
        timeCount,
        category
        ) VALUES 
        (?,?,?,?,?,?)`,

    trainingSelect: `SELECT * FROM training`,

    trainingDelete: `DELETE FROM trainings WHERE id= ?`
}