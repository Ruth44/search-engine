
//jshint esversion:6
const express = require("express");
const mongoose=require("mongoose");
const cors= require('cors');
const app = express();
const KeywordModel = require('./models/Keyword');
const { updateOne } = require("./models/Keyword");

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
// Connection URL
mongoose.connect('mongodb://localhost:27017/keywordDB', { useUnifiedTopology: true, useNewUrlParser: true });

const StopwordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
});

const StopwordModel = mongoose.model("stopword", StopwordSchema);
app.get('/stopword', async function(req,res){
  const stopword= new StopwordModel([
    {
      word: 'a'
    },
    {
      word: 'about'
    },{
      word: 'above'
    },{
      word: 'after'
    },{
      word: 'again'
    },{
      word: 'against'
    },{
      word: 'am'
    },{
      word: 'all'
    },{
      word: 'an'
    },{
      word: 'and'
    },{
      word: 'any'
    },{
      word: 'are'
    },{
      word: "aren't"
    },{
      word: 'as'
    },
  ])
  await stopword.save();
  res.send('Success');
})

app.post("/insert",async function(req, res) {
  const originalName= req.body.original;
  const key= new KeywordModel({
    original: originalName, 
});
await key.save();
  });


  app.patch("/token",async function(req, res) {
//     const filter = { orig: req.body.orig };
// const update = { token: req.body.tokens };
//     const tokens= req.body.token;
//    KeywordModel.update(filter, update);
KeywordModel.update(
  {original: req.body.orig},
  {tokens: req.body.tokens
},
  function(err,results){
      if(!err){
          res.send("Updated successfully")
      }else{
          res.send("Failed to update")
      }
  }
)
    });


  app.get('/read', async(req,res)=> {
    KeywordModel.find({$where: {original: req.body.original}},(err,result)=>{
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    });
  });
  app.listen(3001, function() {
    console.log("Server started");
  });
  