const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("Server is runnig on 3000");
});
