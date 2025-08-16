var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
require("dotenv")

var user_route = require("./routes/user_route");
var admin_route = require("./routes/admin_route")

var app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public/"))
app.use(session({
secret:"asdfghjkl",
saveUninitialized:"true",
resave:"true"
}));



app.use("/",user_route);
 app.use("/admin",admin_route);




app.listen(process.env.port || 1000);
