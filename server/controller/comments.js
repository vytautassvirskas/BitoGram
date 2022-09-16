import express from "express";
import db from "../database/connect.js"
import {auth} from "../middleware/auth.js"
import {commentsValidator} from "../middleware/validate.js"

const router = express.Router();

router.post("/loggedIn-user/new/", auth,commentsValidator, async (req, res) => {
  const user_id=1

    try {
        req.body.userId = user_id
        // req.body.userId =req.session.user.id
        await db.Comments.create(req.body)
        res.send("Komentaras sėkmingai išsaugotas")

    } catch (error) {
      console.log(error);
      res.status(500).send("Įvyko serverio klaida")
    }
})

export default router