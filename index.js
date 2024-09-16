const express = require('express');
const parser = require('body-parser');

const app = express();

const PORT = 3000;

let data = [];

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());


app.get('/blogs',(req,res)=>{
    res.status(200).json({
        result : data,
        success : true,

    })
})

app.post('/blogs', (req,res)=>{
    console.log(req.body);
    data.push({
        title:req.body.title,
        description:req.body.content,
        id: Math.floor(Math.random()*1000),
    }
    );
    res.status(201).json({
        result:"success"
    });
})

app.get('/blogs/:id', (req,res)=>{
    const result = data.filter((blog)=>blog.id==req.params.id);
    res.status(201).json({
        Blog : result,
        success:true
    })
})

app.put('/blogs/:id', (req,res)=>{
    const result = data.find((blog)=>blog.id==req.params.id);
    result.title = req.body.title;
    res.status(203).json({
        success: true
    })
})

app.delete('/blogs/:id',(req,res)=>{
    const index = data.findIndex((blog)=>blog.id==req.params.id);
    data.splice(index,1);
    res.status(203).json({
        success: true
    })
})

app.listen(PORT, function Process(){
    console.log("Server is running on PORT",PORT);
})