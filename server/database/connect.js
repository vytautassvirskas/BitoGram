import {Sequelize} from "sequelize";
import mysql from "mysql2/promise"

import Users from "../model/users.js"
import Posts from "../model/posts.js"
import Comments from "../model/comments.js"
import Likes from "../model/likes.js"



const database = {}
const credentials = {
    host:"localhost",
    user:"root",
    password:"",
    database:"bitogram"
}
try {
    // prisijungimas
    const connection = await mysql.createConnection({
        host:credentials.host,
        user:credentials.user,
        password:credentials.password
    })
    // dumenu bazes sukurimas
    await connection.query('CREATE DATABASE IF NOT EXISTS '+ credentials.database)
    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {dialect: "mysql"})
    
    database.Users = Users(sequelize)
    database.Posts = Posts(sequelize)
    database.Comments = Comments(sequelize)
    database.Likes = Likes(sequelize)


    database.Users.hasMany(database.Posts)
    database.Posts.belongsTo(database.Users)

    database.Users.hasMany(database.Comments)
    database.Comments.belongsTo(database.Users)

    database.Posts.hasMany(database.Comments)
    database.Comments.belongsTo(database.Posts)

    database.Posts.hasMany(database.Likes)
    database.Likes.belongsTo(database.Posts)


    await sequelize.sync({alter: true}) 
} catch (error)  {
    console.log(error)
    console.log("nepavyko prisijungti prie duomenu bazes");
}

export default database;