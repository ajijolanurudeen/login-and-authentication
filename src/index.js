const express = require('express')

const path = require('path')

const bcrypt = require('bcrypt')

const collection = require('./config');

const { name } = require('ejs');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs');

app.use(express.static("public"));

app.use(express.static("img"));


app.get("/",(req,res)=>{
    res.render('index')
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

// register

app.post('/signup',async(req,res)=>{
    const data ={
        name:req.body.username,
        password:req.body.password
    }

const existingUser = await collection.findOne({name: data.name});

if (existingUser){res.send('user already exists');

}else{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password,saltRounds);
    data.password= hashedPassword
    const userdata = await collection.insertMany(data);
    console.log(userdata)
    res.render("home");
}
});

//login User
app.post("/login",async (req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.username});
        if(!check){
            res.send("user name not found")
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            res.render("home");
        }else{
            req.send("wrong password");
        }
    }catch{
        res.send("wrong details")
    }
})

const port = 7000

app.listen(port,()=>{
    console.log(`server running on port:${port}`)
})