import { User } from "../models/entity/user.js";

export async function addUser(req, res){ //OK
    try {
        const data = req.body;
        const user = new User(data)
        await user.save();
        res.json({ok: true});
        
    } catch (error) {
        console.error(error);
        res.json({ok: false, error})  
    }
}

export async function getUser(req,res){ //OK
    try {
        const user= await User.find()
        res.json(user)
        
    } catch (error) {
        console.error(error);
        res.json({ok: false, error}) 
    }
}

export async function getOneUser(req,res){ //OK
    const id = req.params.id;
    try {
        const user = await User.findOne({_id: id})
        res.json(user);
        
    } catch (error) {
        console.error(error);
        res.json({ok: false, error}) 
    }
}

export async function udpateOneUser(req,res){ //OK
    const id = req.params.id;
    const data = req.body;
    try {
        const user = await User.updateOne({_id: id}, data)
        res.json(user)
        
    } catch (error) {
        console.error(error);
        res.json({ok: false, error}) 
        
    }
}

export async function deleteOneUser(req,res){ //OK
    const id = req.params.id;
    try {
        await User.deleteOne({_id: id})
        res.json({ok: true});
        
    } catch (error) {
        console.error(error);
        res.json({ok: false, error}) 
        
    }
}

//Partie connexion
export async function connectUser(req, res){
    try {
        
        const user = await User.find({email: req.body.email, password: req.body.password})
    //Trouver l'identifiant et le mot de passe
        if(user!== null){
            res.json({id: user[0]["_id"]})
        }
        else{
            throw new Error("Identifiants invalides");
            
        }

} catch (error) {
    console.error(error);
    res.json({ok: false,error})   
    
}}