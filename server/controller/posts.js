import express from "express"
import {Op} from "sequelize"

import db from "../database/connect.js"
import {postValidator} from "../middleware/validate.js"
import upload from "../middleware/multer.js"
import { auth } from "../middleware/auth.js"

const router = express.Router();

// visos visu vartotoju nuotraukos
router.get("/",auth, async (req,res)=>{
    try {
        const posts = await db.Posts.findAll({
            include: [db.Users, db.Likes, db.Comments]
        })
        res.json(posts)
    } catch {

        res.status(500).send("Įvyko serverio klaida")
    }
})

// bet kokio vartotojo postai
router.get("/user/:id",auth, async (req,res)=>{
    try {
        const posts = await db.Posts.findAll({
            where:{userId: req.params.id},
            include: [{
                model: db.Users
            },
            {
                model: db.Likes
            },
            {
                model: db.Comments
            }
        ]
        })
        res.json(posts)
    } catch {

        res.status(500).send("Įvyko serverio klaida")
    }
})

// posto ikelimas
router.post("/new/", auth, upload.single("image"), postValidator, async(req,res)=>{
    console.log(req.body)
    try {
        if(req.file)
            req.body.image = "/uploads/"+req.file.filename
            console.log(req.body);

        req.body.userId=req.session.user.id
        new db.Posts(req.body).save()
        res.send("Įrašas sėkmingai sukurtas")
    } catch {
        res.status(500).send("Įvyko serverio klaida")
    }
    
})

// vienas posto periurejimui bendram lange
router.get("/:id",auth, async (req,res)=>{
    try {
        const post = await db.Posts.findByPk(req.params.id, {
            include: [
                {model:db.Users},
                {model:db.Likes} ,
                {
                    model: db.Comments,
                    include: [db.Users]
                }] 
        })
        console.log(post);
        res.json(post)
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
   
})



router.put("/edit/:id", auth, upload.single("image"), postValidator, async (req,res)=>{
    try {
        console.log(req.params.id);
        const post = await db.Posts.findByPk(req.params.id)
        post.update(req.body)
        res.send("Įrašas sėkmingai atnaujintas");
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
    
})

router.delete("/delete/:id",auth,async(req,res)=>{
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.destroy()
        res.send("Įrašas sėkmingai ištrintas");
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
    
})




//CRUD - Create, Read, Update, Delete
//       POST    GET    PUT    DELETE

export default router