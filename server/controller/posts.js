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
            include: db.Users
        })
        res.json(posts)
    } catch {

        res.status(500).send("Įvyko serverio klaida")
    }
})

// prisijungusio vartotojo nuotraukos
router.get("/loggedIn-user-posts/:id",auth, async (req,res)=>{
    try {
        const posts = await db.Posts.findAll({
            where:{userId: req.params.id}
        })
        res.json(posts)
    } catch {

        res.status(500).send("Įvyko serverio klaida")
    }
})

// posto ikelimas
router.post("/loggedIn-user/new/", auth, upload.single("image"), postValidator, async(req,res)=>{
    console.log("ar rodo?");
    console.log(req.body);
    console.log(req.file);

    const user_id=2
    try {
        if(req.file)
            req.body.image = "/uploads/"+req.file.filename
            console.log(req.body);

        req.body.userId=user_id
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
            include: [db.Users, db.Comments] 
            // include: [
            //     {   model: db.Users,
            //         attributes: { exclude: ['password', 'role', 'email', 'updatedAt'] }
            //     }, 
            //     { 
            //         model: db.Comments, 
            //         include: { 
            //             model: db.Users,
            //             attributes: { exclude: ['password', 'role', 'email', 'updatedAt'] }
            //         }
            //     }
            // ],
            // attributes: { 
            //     exclude: ['postId', 'userId'] 
            // }
        })
        res.json(post)
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
   
})

// vienas blogo irasas konkretaus vartotojo
router.get("/userpost/:id",auth, async (req,res)=>{
    try {
        const post = await db.Posts.findByPk(req.params.id, {
            include: db.Users
        })
        res.json(post)
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
   
})

router.put("/loggedIn-user/edit/:id", auth, upload.single("image"), postValidator, async (req,res)=>{
    try {
        console.log(req.params.id);
        const post = await db.Posts.findByPk(req.params.id)
        post.update(req.body)
        res.send("Įrašas sėkmingai atnaujintas");
    } catch (error) {
        res.status(500).send("Įvyko serverio klaida")
    }
    
})

router.delete("/loggedIn-user/delete/:id",auth,async(req,res)=>{
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