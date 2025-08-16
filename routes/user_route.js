var express = require("express");
var router = express.Router();
var exe = require("./../connection");
const { route } = require("./admin_route");

// admin home
router.get("/",async function(req,res){
    res.render("user/home.ejs");
})

// Admin about
router.get("/about",async function(req,res){
    var data = await exe(`SELECT * FROM aboutus`);
    
    var data2 = await exe('SELECT * FROM aboutourcompony');

    var data3 = await exe(`SELECT * FROM team_member`);

    var obj = {"about_banner":data[0],"about_compony":data2,"team_member":data3};
    res.render("user/about.ejs",obj);
})

// admin Service
router.get("/services",async function(req,res){
    var sql = `SELECT * FROM service`;
    var data = await exe(sql);
    var obj = {"service":data}
    res.render("user/services.ejs",obj)
})

router.post("/save_get_free_quote",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO get_free_quote(name,email,phone,education,special_note) VALUES (?,?,?,?,?)`
    var data = await exe(sql,[d.name,d.email,d.phone,d.education,d.special_note]);
    // res.send(data);
    res.redirect("/services")
    // res.send(req.body);
})
// admin product
router.get("/products",function(req,res){
    res.render("user/products.ejs")
})
// blog
router.get("/blog",function(req,res){
    res.render("user/Blog.ejs");
})
// contact
router.get("/contact",async function(req,res){
    var sql = `SELECT * FROM contact_a`
    var data = await exe(sql);
    var obj = {"con":data}
    res.render("user/contact.ejs",obj);
})
// FAQ's
router.get("/faq",async function(req,res){
    var sql = `SELECT * FROM faq`
    var data = await exe(sql);
    var obj = {"faq":data}
    res.render("user/faq.ejs",obj);
})
// term & condition
router.get("/terms",async function(req,res){
     var data = await exe(`SELECT * FROM term_condition`)
    var obj = {"terms":data};
    res.render("user/term_condition.ejs",obj);
})
// Privacy policy
router.get("/privacy_policy",async function(req,res){
    var sql = `SELECT * FROM privacy_policy`
    var data = await exe(sql);
    var obj = {"privacy_policy":data}
    res.render("user/privacy_policy.ejs",obj);
})

module.exports = router;