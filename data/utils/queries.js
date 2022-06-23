module.exports={

    // user queries
    userTableCreate: `CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name string NOT NULL, 
        username string NOT NULL, 
        hash string,
        salt string
        )`,

    userInsert: `INSERT INTO users( 
        name, 
        username,
        hash,
        salt
        ) VALUES 
        (?,?,?,?)`,

    userSelect: `SELECT * FROM users`,
    userFind: `SELECT * FROM users WHERE username = ?`,
    saltGet: `SELECT salt FROM users WHERE username =?`,


    // training queries
    trainingTableCreate: `CREATE TABLE IF NOT EXISTS trainings(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
        userId int NOT NULL, 
        name string NOT NULL, 
        repeatCount int NOT NULL,
        dueDate string NOT NULL, 
        timeCount int NOT NULL, 
        category string NOT NULL
        )`,

    trainingInsert: `INSERT INTO trainings( 
        userId, 
        name, 
        repeatCount,
        dueDate,
        timeCount,
        category
        ) VALUES 
        (?,?,?,?,?,?)`,
    

    trainingSelect: `SELECT * FROM trainings`,
    userTrainingSelect: `SELECT * FROM trainings WHERE userId= ?`,

    trainingDelete: `DELETE FROM trainings WHERE id= ?`,
    userTrainingUpdate:`UPDATE trainings( 
        name, 
        repeatCount,
        dueDate,
        timeCount,
        category
        ) VALUES 
        (?,?,?,?,?)
        WHERE id=?`,
    joinTrainingWithUsername: `SELECT * FROM trainings INNER JOIN users ON trainings.userId = users.id;`
}