var express = require("express");
var router = express.Router();
var exe = require("./../connection");

router.get("/",function(req,res){
    res.render("admin/Home_admin.ejs")
});

router.get("/authentication",function(req,res){
  res.render("admin/authentication.ejs");
})

// About Hero banner
router.get("/about",async function(req,res){
    var sql1 = `SELECT * FROM aboutus`
    var data = await exe(sql1);

    var sql2 = `SELECT * FROM aboutourcompony`
    var data2 = await exe(sql2)
    var obj = {"list":data,"about_co_list":data2}
    res.render("admin/about/about.ejs",obj);
})
// hero banner about
router.post("/about/save_about",async function(req,res){
    var photo = new Date().getTime()+req.files.photo.name;
    req.files.photo.mv("public/"+photo)
   
    var d = req.body;
    var sql = `INSERT INTO aboutus(title, subtitle, image) VALUES (?,?,?)`;
    var data = await exe(sql,[d.title,d.subtitle,photo]);
    res.redirect("/admin/about")

})
//hero banner Aboutus edit
router.get("/about/edit_aboutus/:id",async function(req,res){
    var id = req.params.id;
    var sql = `SELECT * FROM aboutus WHERE id = '${id}'`
    var data = await exe(sql);
    var obj = {"det":data}
    res.render("admin/about/edit_aboutus.ejs",obj);
})
//hero banner Aboutus update
router.post("/about/update_about",async function(req,res){
    var d = req.body;
 if(req.files)
    {
        var filename = new Date().getTime()+req.files.photo.name;
        req.files.photo.mv("public/"+filename);
        var sql = `UPDATE aboutus SET
                     image = '${filename}' 
                   WHERE id = '${d.id}'`
        var data = await exe(sql) 
        // res.send(data);          
    }
   var sql = `UPDATE aboutus
            SET
             title = ?,
             subtitle = ?
           WHERE id = ?
            `
    var data = await exe(sql,[d.title,d.subtitle,d.id])
    // res.send(data);
    res.redirect("/admin/about")
})
//hero banner Aboutus delete
router.get("/about/delete_aboutus/:id",async function(req,res){
    var id = req.params.id;
    var sql = `DELETE FROM aboutus WHERE id = '${id}'`
    var data = await exe(sql);
    // res.send("delete success")
    res.redirect("/admin/about")
})


// About Our Compony
router.post("/about/save_aboutourcompony",async function(req,res){
  var photo = new Date().getTime()+req.files.photo.name;
   req.files.photo.mv("public/"+photo)

    var d = req.body;
    var sql = `INSERT INTO aboutourcompony(title, subtitle, photo)
    VALUES (?,?,?);`
    var data = await exe(sql,[d.title,d.subtitle,photo]);
    // res.send(req.body.subtitle)
    res.redirect("/admin/about")
})

router.get("/about/edit_aboutourcompony/:id", async function(req, res) {
  var id = req.params.id;
  var sql = `SELECT * FROM aboutourcompony WHERE id = '${id}'`;
  var data = await exe(sql);
  var obj = {"info":data}
  res.render("admin/about/edit_aboutourcompony.ejs",obj);
});

// update About our compony
router.post("/about/update_aboutourcompony", async function(req, res) {
  var d = req.body;
  var sql, params;

  if (req.files && req.files.photo) {
    var filename = Date.now() + "_" + req.files.photo.name;
    await req.files.photo.mv("public/" + filename);
    sql = `
      UPDATE aboutourcompony
      SET title = ?, subtitle = ?, photo = ?
      WHERE id = ?
    `;
    params = [d.title, d.subtitle, filename, d.id];
  } else {
    sql = `
      UPDATE aboutourcompony
      SET title = ?, subtitle = ?
      WHERE id = ?
    `;
    params = [d.title, d.subtitle, d.id];
  }
  var data = await exe(sql, params);
//   res.send(data)
  res.redirect("/admin/about");
});

// About our Delete
router.get("/about/delete_aboutourcompony/:id", async function(req, res) {
  var id = req.params.id;
  var sql = `DELETE FROM aboutourcompony WHERE id = '${id}'`;
  var data = await exe(sql);
  res.redirect("/admin/about");
});


// Add team Member
router.get("/team_member",async function(req,res){
    var sql = `SELECT * FROM team_member`
    var data = await exe(sql);
    var obj = {"tlist":data}
    res.render("admin/about/team_member.ejs",obj)
})
// team member insert
router.post("/about/save_team_member",async function(req,res){
    var d = req.body;
    var photo = new Date().getTime()+req.files.photo.name;
    req.files.photo.mv("public/"+photo);

    var sql = `INSERT INTO team_member(title,subtitle,photo) VALUES (?,?,?)`
    var data = await exe(sql,[d.title,d.subtitle,photo]);
    // res.send(data);
    res.redirect("/admin/team_member");
})

//  edit form team_member
router.get("/about/edit_team_member/:id",async function(req,res){
  var id = req.params.id;
  var sql = `SELECT * FROM team_member WHERE id = ?`;
  var data = await exe(sql,[id]);
  var obj = {"tdet":data}
  res.render("admin/about/edit_team_member.ejs",obj);
});

// update for team-member
router.post("/about/update_team_member", async function (req, res) {
  var d = req.body;

  // If a new photo is uploaded, update the photo
  if (req.files && req.files.photo) {
    var photo = new Date().getTime() + req.files.photo.name;
    req.files.photo.mv("public/" + photo);

    var sqlPhoto = `
      UPDATE team_member 
      SET photo = '${photo}' 
      WHERE id = '${d.id}'
    `;
    await exe(sqlPhoto);
  }

  // Update title and subtitle
  var sql = `
    UPDATE team_member SET 
      title = '${d.title}', 
      subtitle = '${d.subtitle}' 
    WHERE id = '${d.id}'
  `;
  await exe(sql);
  res.redirect("/admin/team_member");
});
// delete team member
router.get("/about/delete_team_member/:id", async (req, res) => {
  var id= req.params.id;
  var sql = `DELETE FROM team_member WHERE id = ?`
  await exe(sql,[id]);
  res.redirect("/admin/team_member");
});


// Service
router.get("/service",async function(req,res){
    var sql = `SELECT * FROM service`
    var data = await exe(sql);
    var obj = {"slist":data}
    res.render("admin/service/service.ejs",obj)
})
// service insert
router.post("/service/save_service",async function(req,res){
    var d = req.body;
    var photo = new Date().getTime()+req.files.photo.name;
    req.files.photo.mv("public/"+photo);

    var sql = `INSERT INTO service(title,subtitle,photo) VALUES (?,?,?)`
    var data = await exe(sql,[d.title,d.subtitle,photo]);
    // res.send(data);
    res.redirect("/admin/service");
})

//  edit form service
router.get("/service/edit_service/:id",async function(req,res){
  var id = req.params.id;
  var sql = `SELECT * FROM service WHERE id = ?`;
  var data = await exe(sql,[id]);
  var obj = {"sdet":data}
  res.render("admin/service/edit_service.ejs",obj);
});

// update for service
router.post("/service/update_service", async function (req, res) {
  var d = req.body;
  if(req.files){
        var img = new Date().getTime()+req.files.photo.name;
        req.files.photo.mv("public/"+img)
        var sql = `UPDATE service SET
                     photo = '${img}'
                   WHERE
                      id = '${d.id}'`
        var data = await exe(sql);
        // res.send(data) 
    }
  // Update title and subtitle
  var sql = `
    UPDATE service SET 
      title = '${d.title}', 
      subtitle = '${d.subtitle}' 
    WHERE id = '${d.id}'`

    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/service")
});
 

// service delete
router.get("/service/delete_service/:id", async (req, res) => {
  var id= req.params.id;
  var sql = `DELETE FROM service WHERE id = ?`
  await exe(sql,[id]);
  res.redirect("/admin/service");
});

// get free quote
router.get("/get_free_quote",async function(req,res){
  var sql = `SELECT * FROM get_free_quote`
  var data = await exe(sql);
  var obj = {"get_free_quote":data}
  res.render("admin/service/get_free_quote.ejs",obj);
})
// Delete free qoute
router.get("/service/delete_get_free_quote/:id",async function(req,res){
    var id = req.params.id;
    var sql = `DELETE FROM get_free_quote WHERE id = '${id}'`
    var data = await exe(sql);
    // res.send("delete success")
    res.redirect("/admin/get_free_quote")
})

// Term and Condition
router.get("/term_condition",async function(req,res){
    var sql = `SELECT * FROM term_condition`
    var data = await exe(sql);
    var obj = {"tlist":data}
    res.render("admin/pages/term_condition.ejs",obj);
});

router.post("/pages/save_term_condition",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO term_condition(point_name,description) VALUES(?,?)`
    var data = await exe(sql,[d.point_name,d.description]);
    // res.send(data);
    res.redirect("/admin/term_condition")
})

router.get("/pages/edit_term_condition/:id",async function(req,res){
    var id = req.params.id;
    var sql = `SELECT * FROM term_condition WHERE id = '${id}'`;
    var data = await exe(sql)
    var obj = {"tdet":data}
    res.render("admin/pages/edit_term_condition.ejs",obj);
})

router.post("/pages/update_term_condition",async function(req,res){
   var d = req.body;
   var sql = `UPDATE term_condition
            SET
             point_name = ?,
             description = ?
           WHERE id = ?
            `
    var data = await exe(sql,[d.point_name,d.description,d.id])
    // res.send(sql);
    res.redirect("/admin/term_condition")
})


router.get("/pages/delete_term_condition/:id",async function(req,res){
    var id = req.params.id;
    var sql = `DELETE FROM term_condition WHERE id = '${id}'`
    var data = await exe(sql);
    // res.send("delete success")
    res.redirect("/admin/term_condition")
})
 

// FAQ
router.get("/faq",async function(req,res){
    var sql = `SELECT * FROM faq`;
    var data = await exe(sql);
    var obj = {"flist":data}
    res.render("admin/pages/faq.ejs",obj);
})

router.post("/pages/save_faq",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO faq(question, answer) VALUES (?,?);`
    var data = await exe(sql,[d.question,d.answer])
    // res.send(data);
    // res.send(req.body);
    res.redirect("/admin/faq")
})

//  FAQ for edit form
router.get("/pages/edit_faq/:id",async function(req,res){
    var id = req.params.id;
    var sql = "SELECT * FROM faq WHERE id = ?";
    var data = await exe(sql,[id]);
    var obj = {"fdet":data}
    res.render("admin/pages/edit_faq.ejs",obj);
})

// Update existing FAQ
router.post("/pages/update_faq",async function(req,res){
    var d = req.body;
    var sql = "UPDATE faq SET question = ?, answer = ? WHERE id = ?";
    var data = await exe(sql,[d.question,d.answer,d.id])
    // res.send(data);
    res.redirect("/admin/faq")
})

// Delete FAQ
router.get("/pages/delete_faq/:id",async function(req,res){
    var id = req.params.id;
    var sql = "DELETE FROM faq WHERE id = ?";
    var data = await exe(sql,[id])
    res.redirect("/admin/faq")
})


// Privacy Policy
router.get("/privacy_policy",async function(req,res){
    var sql =  `SELECT * FROM privacy_policy`
    var data = await exe(sql)
    var obj = {"plist":data}
    res.render("admin/pages/privacy_policy.ejs",obj)
})

router.post("/pages/save_privacy_policy",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO privacy_policy (heading,subtitle) VALUES (?,?);`
    var data = await exe(sql,[d.heading,d.subtitle])
    // res.send(data)
    res.redirect("/admin/privacy_policy")
})

// Privacy Policy for edit form
router.get("/pages/edit_privacy_policy/:id", async function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM privacy_policy WHERE id = ?";
    var data = await exe(sql, [id]);
    var obj = { "pdet": data}; // Use data[0] to get the single policy object
    res.render("admin/pages/edit_privacy_policy.ejs", obj);
});

// Update Privacy Policy
router.post("/pages/update_privacy_policy", async function(req, res) {
    var d = req.body;
    var sql = `UPDATE privacy_policy
             SET 
                heading = ?,
                subtitle = ?
             WHERE 
                id = ?`;
    var data = await exe(sql, [d.heading, d.subtitle, d.id]); // Ensure d.id is passed
    res.redirect("/admin/privacy_policy");
});

// Delete Privacy Policy
router.get("/pages/delete_privacy_policy/:id", async function(req, res) {
    var id = req.params.id;
    var sql = "DELETE FROM privacy_policy WHERE id = ?";
    var data = await exe(sql, [id]);
    res.redirect("/admin/privacy_policy");
});


// Contact section
router.get("/contact",async function(req,res){
    var sql = `SELECT * FROM contact_a`
    var data = await exe(sql);
    var obj = {"clist":data}
    res.render("admin/contact/contact.ejs",obj)
})

router.post("/contact/save_contact",async function(req,res){
    var d = req.body;
    // res.send(req.body)
    var sql = `INSERT INTO contact_a(phone, email, address,location,office_hour,facebook,twitter) VALUES (?,?,?,?,?,?,?)`;
    var data = await exe(sql,[d.phone,d.email,d.address,d.location,d.office_hour,d.facebook,d.twitter])
    // res.send(data)
    res.redirect("/admin/contact")
})

// Get Contact for edit form
router.get("/contact/edit_contact/:id", async function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM contact_a WHERE id = ?";
    var data = await exe(sql, [id]);
    var obj = { "cdet": data }; // Use data[0] to get the single contact object
    res.render("admin/contact/edit_contact.ejs",obj);
});

// Update Contact
router.post("/contact/update_contact",async function(req,res) {
    // res.send(req.body)
    var d = req.body;
    var sql = "UPDATE contact_a SET phone = ?, email = ?, address = ?,location = ?, office_hour = ?, facebook = ?, twitter = ? WHERE id = ?";
    var data = await exe(sql, [d.phone, d.email, d.address, d.location,d.office_hour, d.facebook, d.twitter, d.id]); // Ensure d.id is passed
    // res.send(data)
    res.redirect("/admin/contact");
});

// Delete Contact
router.get("/contact/delete_contact/:id", async function(req, res) {
    var id = req.params.id;
    var sql = "DELETE FROM contact_a WHERE id = ?";
    var data = await exe(sql, [id]);
    res.redirect("/admin/contact");
});




router.get("/login",function(req,res){
    res.render("admin/login.ejs");
})
router.get("/register",function(req,res){
    res.render("admin/register.ejs");
})



module.exports = router;