
import express from 'express';
import path from 'path';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import donationRoutes from './routes/donationRoutes.js'
import jwt from "jsonwebtoken"

mongoose.connect("mongodb://localhost:27017",{dbName:"backend"}).then(()=>console.log("db connected")).catch((e)=>console.log(e))

const app = express();
app.set("view engine","ejs");



const isAuthenticated= async(req,res,next) => {
    const {token} = req.cookies;
    // console.log(req.cookies.token)
    if (token) {
        const dd = jwt.verify(token,"yytgyytgh")
        // console.log(dd);
        req.user = await User.findById(dd._id);
        next();
    }
    else{
        res.render("login")
    }

}
 




app.get("/donation",(req,res)=>{
    res.render("donation");
})

app.get("/home",(req,res)=>{
    res.render("home");
  })
app.get("/login",(req,res)=>{
    res.render("login");
  })

  
  app.get("/register",(req,res)=>{
    res.render("register");
  })

  app.get("/contact",(req,res)=>{
    res.render("contact");
  })

  app.get("/about",(req,res)=>{
    res.render("about")
  })



//using middelware
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/donation",donationRoutes);

const userSchema = new mongoose.Schema({
    name:String,email:String,
    phone:Number,address:String,
    password:String,


});
const User = mongoose.model("User",userSchema);


const getAllUsers = async(req,res,next)=>{
    try {
        const User = await User.find();
        res.json(User);
    } catch (error) {
        console.error("error finding users",error);
        res.sendStatus(500);
    }
}



  const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.render("profile", { user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.sendStatus(500);
    }
};





app.get("/",isAuthenticated,(req,res)=>{
    console.log(req.user.name)
    res.render("logout",{name:req.user.name})
    
})

app.get("/api/users",getAllUsers);
app.get("/api/profile",isAuthenticated,getUserProfile)



try {
    

    app.post("/login",async(req,res)=>{
        const {name,email} = req.body
        let user = await User.findOne({email})
        if (!user) {
            console.log("register first");
            return res.redirect("/register")
        }
        if (!email){
            console.log("enter email");
            return res.render("login");
        }
        
        //  user= await User.create({
        //     name,
        //     email,
        // });
        

        const token = jwt.sign({_id:user._id},"yytgyytgh")


        res.cookie("token",token,{
            httpOnly:true,expires:new Date(Date.now()+60*1000)
        });
        // console.log(token);
        
        res.redirect("/");
    })

    app.get("/register",(req,res)=>{
        res.render("register");
    })

    app.post("/register",async(req,res)=>{
        const {name,email,phone,address,password}= req.body;

        const user = await User.create({
            name,
            email,
            phone,
            address,
            password,
        });
        console.log(user);
        res.redirect("/");

    })

    app.get("/logout", (req, res) => {
        res.cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now())
        });
        res.redirect("/");
    });
}catch(error){
    console.error("error creating user:",error);
    res.sendStatus(500);
}



app.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile", { user: req.user });
  });

  app.get("/home",(req,res)=>{
    res.render("home");
  })

  


app.listen(4000, ()=>{
    console.log('server is working');
    
})

