const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
/* const { send } = require("process");
 */
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

/* const key = "d08751a996d585e2f1994fd4f15eaf3d-us21";
    id = ddae1ebd95
 */
app.listen(process.env.PORT ||3000,function(){
    console.log("Server is runnig on 3000");
});

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){

    var firstName =req.body.prenom;
    var lastName=req.body.nom;
    var email = req.body.email;

    const data = {
        members : [
            {
                email_address : email ,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/ddae1ebd95";
    
    const options = {

        method: "POST",
        auth : "anystring:21c76e4eaebfbe03b75d051d180ba725-us2"

      };


    const request = https.request(url , options , function(response){

        console.log(response.statusCode) ;
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else
        {
            res.sendFile(__dirname+"/failure.html")
        }

/*         response.on("data",function(data){
            console.log(JSON.parse(data));
        }); */

    });

    request.write(jsonData);
    request.end();


});


app.post("/failure",function(req,res){
    res.redirect("/");
});
