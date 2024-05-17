//jshint eversion:6


const express =require("express");
const bodyparser=require("body-parser");
const _=require("lodash");
const app=express();
const Filter=require('bad-words');

  filter=new Filter();

let post=["mussoorie"];
var ti;
var cm;

let pay=[];

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));





app.get("/",function(req,res){
  res.render("index");
});


app.get("/mussoorie",function(req,res){
  res.render("tourism_spot");
});





app.post("/mussoorie",function(req,res){
  
  const p={
    fn:req.body.firstname,
    em:req.body.email,
    cn:req.body.cardnumber,
   em:req.body.expmonth,
   ey:req.body.expyear,
   cv:req.body.cvv
  };

  ti=req.body.destiny;
  cm=req.body.comment;
  pay.push(p);
 
 if(p.fn){

  res.render("tourism_spot"); 
  console.log(pay);
  pay=[];
 }
  

  else if(ti){
    post.forEach(function(pos){
      if( _.lowerCase(pos)===_.lowerCase(ti)){
        console.log(ti);
        res.render("tourism_spot"); 
      }   
      else{
       res.render("error",{content:"404 erro"}); 
      }
     });
     ti="";
  }
  else if(cm){
    console.log(cm);
    cm=filter.clean(cm)
    console.log(cm);

    for(var i=0;i<cm.length;i++){
      if(cm[i]=='*')
      res.render("error",{content:"foul word used"}); 
    }

    res.render("tourism_spot"); 
     cm="";
  }
});







app.listen(process.env.PORT || 3000,function(){
    console.log("server is running");
})