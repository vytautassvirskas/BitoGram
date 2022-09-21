import express from "express";
import db from "../database/connect.js"
import {auth} from "../middleware/auth.js"
// import {commentsValidator} from "../middleware/validate.js"

const router = express.Router();

router.post("/new/", auth, async (req, res) => {
    try {
      const likeExists = await db.Likes.findOne({
        where: { 
          postId: req.body.postId,
          userName: req.session.user.userName
      }
      })
      if(likeExists){
          await likeExists.destroy()
          return res.send("Nutrauka sėkmingai nepamėgta")
    } 

        req.body.userName=req.session.user.userName
        await db.Likes.create(req.body)
        res.send("Nutrauka sėkmingai pamėgta")

    } catch (error) {
      console.log(error);
      res.status(500).send("Įvyko serverio klaida")
    }
})

router.get("/",auth, async (req,res)=>{
  try {
      const likes = await db.Likes.findAll({
        // where: { 
        //   userName: req.session.user.userName
        // }
      })
      res.json(likes)
  } catch {

      res.status(500).send("Įvyko serverio klaida")
  }
})

export default router