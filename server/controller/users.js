import express from "express";
import db from "../database/connect.js"
import bcrypt from 'bcrypt';
import { registerValidator, loginValidator,userEditingValidator } from "../middleware/validate.js";
import {auth} from "../middleware/auth.js"
import upload from "../middleware/multer.js"

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
    console.log(req.body)
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
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                description: user.description,
                image: user.image,
                email: user.email
            }
            res.json({
                message: "Prisijungimas sėkmingas", 
                user: req.session.user 
            })

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
// PATOBULINTI
// paieska tam tikro vartotojo nuotrauku
router.get("/search/:keyword",auth, async (req,res)=>{
    console.log(req.params)
    try {
        const posts = await db.Posts.findAll({
            where: {
                '$Accounts.userName$': { [Op.like]: `%${req.params.keyword}%`}
              },
              include: [{
                model: db.Users,
                as: 'Accounts'
              }]
            // include: [db.Users, db.Likes, db.Comments],
            // where:{
            //     userName: {
            //         [Op.like]: `%${req.params.keyword}%`
            //     }
            // }
        })
        res.json(posts)
    } catch {

        res.status(500).send("Įvyko serverio klaida")
    }
})

router.put("/edit/:id", auth, upload.single("image"), userEditingValidator, async (req,res)=>{
    console.log("veikia");
    try {
        const user = await db.Users.findByPk(req.params.id)
        if(req.file)
            req.body.image = "/uploads/"+req.file.filename
        console.log("req body zemiua:");
        console.log(req.body)
        user.update(req.body)
        res.send("Profilis sėkmingai atnaujintas");
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
    
})
// PATOBULINTI
// vienas posto periurejimui bendram lange
router.get("/:id",auth, async (req,res)=>{
    console.log("veikia??");
    console.log(req.params);
    try {
        const user = await db.Users.findByPk(req.params.id)
        res.json(user)
        console.log(user);
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
   
})





export default router