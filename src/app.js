import express from 'express';
import postModel from './models/post.model.js';
import multer from 'multer';
import uploadFile from './services/storage.service.js';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(cors())
app.use(express.json())
const upload = multer({storage: multer.memoryStorage()})



app.get('/', (req, res)=>{
    res.send("Hello this the backend server")
})


app.get('/posts', async (req,res)=>{
    const posts = await postModel.find()

    res.status(200).json({
        message:"This are the posts",
        posts: posts
    })
})



app.post('/create-post', upload.single('image') , async (req, res)=>{
    const result = await uploadFile(req.file.buffer);
    console.log(result.url);
    const url = result.url;
    const postData = await postModel.create({
        image: url,
        caption: req.body.caption
    })
    
    res.status(201).json({
        message:"Post created successfully",
        data: postData
    })
})

app.post('/temp', (req, res)=>{
    postModel.create({
        image: req.body.image,
        caption:req.body.caption
    })

    res.status(200).json({
        message:"Temp_successful"
    })
})


app.delete('/posts/:id', async (req, res)=>{
    const id = req.params.id;
    await postModel.findByIdAndDelete({
        _id: id
    })

    res.status(200).json({
        message:"The post is deleted"
    })
})












app.delete('/temp/:id', async (req, res)=>{
    const id = req.params.id;
    await postModel.findByIdAndDelete({
        _id: id
    })

    res.status(200).json({
        message:"The post is deleted"
    })
})
export default app;
