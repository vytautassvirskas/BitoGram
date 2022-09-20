import express from "express";
import db from "../database/connect.js"
import {auth} from "../middleware/auth.js"
// import {commentsValidator} from "../middleware/validate.js"

const router = express.Router();

router.post("/new/", auth, async (req, res) => {
  console.log(req.body)
    try {
        req.body.userId =req.session.user.id
        req.body.userName=req.session.user.userName
        await db.Comments.create(req.body)
        res.send("Komentaras sėkmingai išsaugotas")

    } catch (error) {
      console.log(error);
      res.status(500).send("Įvyko serverio klaida")
    }
})

export default router