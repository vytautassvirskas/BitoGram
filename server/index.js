import express from "express"
import cors from "cors"
import session from 'express-session'
import database from "./database/connect.js";

import Users from "./controller/users.js"


const app = express();

//CORS blokavimo nuėmimas 
app.use(cors())

//Duomenų priėmimui JSON formatu
app.use(express.json())

// failu perdavimui is statines direktorijos
app.use("/uploads", express.static("uploads"))

// duomenu priemimui POST metodu
app.use(express.urlencoded({extended:false}))

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'labai slapta fraze',
  resave: false,
  saveUninitialized: false,  //sita eilute neissaugo cookio
  cookie: { 
    //tik naudojant https protokola, 
    //norint talptinti kazkur apsaugtam domene, 
    //tada reikia nustatyti secure i true
    secure: false,
    maxAge: 600000
 }, 

}))

// kontroleriu priskyrimas
app.use("/api/users/", Users)


//Paleidžiame serverį
app.listen(3000)