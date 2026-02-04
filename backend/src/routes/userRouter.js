import express from "express"

import { 
    addUser,
    getUser,
    getOneUser,
    udpateOneUser,
    deleteOneUser,
    connectUser
} from "../controllers/loginController.js"

export const userRouter = express.Router();

userRouter.post("/user", addUser)
userRouter.post("/connexion", connectUser)

userRouter.get("/user", getUser)
userRouter.get("/user/:id", getOneUser)

userRouter.patch("/user/:id", udpateOneUser)
userRouter.delete("/user/:id", deleteOneUser)

