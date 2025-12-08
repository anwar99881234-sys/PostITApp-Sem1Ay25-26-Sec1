import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';
import PostModel from './models/PostModel.js';
import bcrypt from 'bcrypt';

let app = express();
app.use(cors());
app.use(express.json());

const conStr = "mongodb+srv://admin:1234@cluster0.kbo8y4l.mongodb.net/PostITApp-S1-2526-FS1?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(conStr);

app.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user)
            res.status(500).json({ message: "User not found" });
        else {
            const pass_valid = await bcrypt.compare(req.body.password, user.password);
            if (pass_valid)
                res.status(200).json({ user: user, message: "success" });
            else
                res.status(401).json({ message: "Unauthorized user" });
        }
    }
    catch (error) {
        res.send(error);
    }
});

app.post("/register", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user)
            res.status(500).json({ message: "User already exists" });
        else {
            const hpass = await bcrypt.hash(req.body.password, 10);
            const newuser = new UserModel({
                uname: req.body.uname,
                email: req.body.email,
                password: hpass,
                profilepic: req.body.profilepic
            });
            await newuser.save();
            res.send({ message: "User Registered.." });
        }

    }
    catch (error) {
        res.send(error);
    }
});

app.listen(5000, () => {
    console.log("Server started at 5000..");
})



app.post("/savePost", async (req, res) => {
    try {

        const new_post = new PostModel({
            postMsg: req.body.postMsg,
            email: req.body.email,
            lat: req.body.lat,
            lng: req.body.lng
        });
        await new_post.save();
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.send(error);
    }
});


app.get("/showPosts", async (req, res) => {
    try {
        const posts = await PostModel.aggregate(
            [
                {
                    $lookup:    {
                                    from: "Users", //collection name
                                    localField: "email", //field from Posts collection
                                    foreignField: "email", //field from Users collection
                                    as: "user" // this is the array for the datails
                                },
                },
                {
                    $sort:      {
                                    createdAt: -1
                                }
                },
                {
                    $project:    {
                                    "user._id" : 0,
                                    "user.password": 0,
                                    "user.__v":0,
                                    "user.email":0
                                }
                }
            ]
        )
        res.send(posts);
    } catch (error) {
        res.send(error);
    }
});

app.delete("/delAllPosts", async (req, res) => {
    try {
        const post_del=await PostModel.deleteMany({});
        res.send(post_del);
    } catch (error) {
        res.send(error);
    }
});

app.put("/updatePost", async (req, res) => {
    try {
        const post=await PostModel.findOne({_id:req.body._id});
        post.postMsg=req.body.postMsg;
        await post.save();
        res.status(200).json({ post:post,message: "Success" });
    } catch (error) {
        res.send(error);
    }
});

app.delete("/delPost/:pid", async (req, res) => {
    try {
        const post=await PostModel.findOneAndDelete({_id:req.params.pid});
        res.status(200).json({ post:post,message: "Success" });
    } catch (error) {
        res.send(error);
    }
});