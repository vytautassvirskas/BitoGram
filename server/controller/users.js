import express from "express";
import db from "../database/connect.js"
import bcrypt from 'bcrypt';
import { registerValidator, loginValidator } from "../middleware/validate.js";
import {auth} from "../middleware/auth.js"

const router = express.Router();

const saltRounds = 10;

router.post("/register",registerValidator, async (req,res)=>{
    try {
        const userExists=await db.Users.findOne({
            where: { 
                email: req.body.email
            }
        })
        
        if(userExists){
            res.status(401).send("Toks vartotojas jau egzistuoja")
            return
        }   

        req.body.password = await bcrypt.hash(req.body.password, saltRounds)

       await db.Users.create(req.body)
       res.send("Vartotojas sėkmingai sukurtas")
    } catch {
        res.status(400).send("Registracija nepavyko")
    }
})

router.post("/login",loginValidator, async (req,res)=>{
    try {
        const user = await db.Users.findOne({
            where: {
                email: req.body.email}
        })
        if(!user){
            return res.status(401).send("Toks vartotojas nerastas")
        }
    
        if(await bcrypt.compare(req.body.password, user.password)){
            req.session.loggedin = true,
            req.session.user={
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
            res.json({
                message: "Prisijungimas sėkmingas", 
                user: req.session.user 
            })
            // res.send("Prisijungimas sėkmingas")

        } else{
            res.status(401).send("Nepavyko prisijungti")
        }
    } catch (error) {
        console.log(error);
        res.status(418).send("Įvyko serverio klaida")
    }
    
})


router.get("/logout", (req,res)=>{
    req.session.destroy()
    res.send("Jūs sėkmingai atsijungėte")
})


router.get("/check-auth",auth, async(req,res)=>{
    try {
        res.send(req.session.user)
    } catch (error) {
        res.status().send("Įvyko serverio klaida")
    }
})


export default router