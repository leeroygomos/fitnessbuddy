const express = require('express');
//const router = require('./router');
const bodyParser = require('body-parser');
const path = require('path');
const formidable = require('formidable');
const PORT = process.env.PORT || 5000
const app = express();
const session = require('express-session');
const TDEE = require('./tdee.js');
const { Client } = require('pg');
const server = require('http').Server(app);
module.exports = server;

const io = require('socket.io')(server);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

//connect to database
client.connect();
let customerServie = false;
var users = [];
// User information
var loggedin = 2; //0 for admin, 1 for user, 2 for not logged in
var sessionUser = '';  //type of logged in user

// Session initialization
app.use(session({secret: 'yee'}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views','./views');
//app.use(router);
app.use(express.static('./public'));

app.get('/', async function(req, res){
  if (req.session.username == 'admin'){
    console.log("route 1");
    let users = await client.query("select * from users where username !=  'admin' ");
    res.render('admin.ejs',{users:users.rows});
  }
  else if (req.session.trainer){
    console.log('trainer route');
    console.log(req.session.username);
    var user = [req.session.username];
    var name;
    var experience;
    var company;
    var phone;
    var email;
    var dob;
    var gender;
    var pp;

    client.query('SELECT * FROM trainers WHERE username = $1', user, function(err, result){
      name = result.rows[0].name;
      console.log(name);
      experience = result.rows[0].experience;
      console.log(experience);
      company = result.rows[0].company;
      console.log(company);
      phone = result.rows[0].phone;
      console.log(phone);
      email = result.rows[0].email;
      console.log(email);
      dob = result.rows[0].dob;
      console.log(dob);
      gender = result.rows[0].gender;
      console.log(gender);
      pp = result.rows[0].pp;
      console.log(pp);
      res.render('trainer.ejs', {user: user, name: name, experience: experience, company: company, phone: phone, email: email, dob: dob, gender: gender, pp: pp});
    });
    
  }
  else if (req.session.username){
    console.log("route 2");
    var name;
    var weight;
    var height;
    var dob;
    var activity;
    var exp;
    var goal;
    var total_calories;
    var food;
    var bench;
    var deadlift;
    var squat;
    var fats;
    var carbs;
    var protein;
    var workouts;
    var user = [req.session.username];
    console.log(user);
    client.query('SELECT * FROM users WHERE username = $1', user, function(err, result){
      console.log(result.rows[0]);
      name = result.rows[0].name;
      console.log(name);
      weight = result.rows[0].weight;
      console.log(weight);
      height = result.rows[0].height;
      console.log(height);
      gender = result.rows[0].gender;
      console.log(gender);
      dob = result.rows[0].dob;
      console.log(dob);
      activity = result.rows[0].activity;
      console.log(activity);
      exp = result.rows[0].exp;
      console.log(exp);
      goal = result.rows[0].goal;
      total_calories = result.rows[0].total_calories;
      foods = result.rows[0].foods;
      workouts= result.rows[0].workouts;
      console.log(goal);
      bench = result.rows[0].bench;
      console.log(bench);
      deadlift = result.rows[0].deadlift;
      console.log(deadlift);
      squat = result.rows[0].squat;
      console.log(squat);
      fats = result.rows[0].fats;
      console.log(fats);
      carbs = result.rows[0].carbs;
      console.log(carbs);
      protein = result.rows[0].protein;
      console.log(protein);

      req.session.weight = weight;
      req.session.height = height;
      req.session.gender = gender;
      req.session.activity = activity;
      req.session.total_calories = total_calories;
      req.session.foods = foods;
      req.session.workouts= workouts;


      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
          age--;
        }
      req.session.age = age;
      var data = Math.round(TDEE.tdee(weight, height, age, gender, activity));

      res.render('welcome.ejs', {data: data, name: name, weight: weight, age: age, height: height, activity: activity, gender: gender, exp:exp, goal:goal, bench:bench, deadlift:deadlift, squat:squat, total_calories: total_calories, foods:foods, fats:fats, carbs:carbs, protein:protein, workouts:workouts});
    });
  }
  else {
    console.log("route 3");
    res.render('index.pug');
  }
});

// Sign Up
app.post('/signup', function(req,res){
  console.log("Signing up");
  console.log("Username = " + req.body.username);
  console.log("Password = " + req.body.password);
  console.log("Name = " + req.body.name);
  console.log("Weight = " + req.body.weight);
  console.log("Height = " + req.body.height);
  console.log("DoB = " + req.body.dob);
  console.log("Gender = " + req.body.gender);
  console.log("Activity = " + req.body.activity);
  console.log("Goal = " + req.body.goal);
  const values = [req.body.username, req.body.password, req.body.name, Number(req.body.weight),
                Number(req.body.height), req.body.dob, req.body.gender, req.body.activity, 0, req.body.goal];
  const createQuery = 'INSERT INTO users(username,password,name,weight,height,dob,gender,activity,exp, goal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10)';
  client.query(createQuery, values, function(err, result){
    if(err) throw err;
    console.log("Successfully added new user!");
  });
  res.redirect("/login.html");
});

// Trainer Signup
app.post('/trainer_signup', function(req,res){
  console.log("Trainer signing up");
  console.log("Username = " + req.body.username);
  console.log("Password = " + req.body.password);
  console.log("Name = " + req.body.name);
  console.log("Experience = " + req.body.experience);
  console.log("Company = " + req.body.company);
  console.log("Phone = " + req.body.phone);
  console.log("Email = " + req.body.email);
  console.log("DoB = " + req.body.dob);
  console.log("Gender = " + req.body.gender);

  var gender = req.body.gender;
  var pp= 'img/arnold.jpg';
  if (gender == 'male'){
    pp = 'img/boytrainer.jpg'
  }
  else{
    pp = 'img/girlTrainer.jpg'
  }

  const values = [req.body.username, req.body.password, req.body.name, Number(req.body.experience),
                req.body.company, req.body.phone, req.body.email, req.body.dob, req.body.gender, pp];
  const createQuery = 'INSERT INTO trainers(username,password,name,experience,company,phone,email,dob,gender, pp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
  client.query(createQuery, values, function(err, result){
    if(err) throw err;
    console.log("Successfully added new trainer!");
  });
  res.redirect("/login.html");
});

// Login
app.post('/login', async(req,res)=>{

  let users = await client.query('SELECT * FROM users');
  let trainers = await client.query('SELECT * FROM trainers');

  function checker(table){
    var i = 0;
    while (table.rows[i]){
      if (table.rows[i].username == req.body.username){
        console.log('Correct username');
        console.log(table.rows[i].username);
        if (table.rows[i].password == req.body.password){
          console.log('correct password');
         console.log(table.rows[i].password);
         loggedin = 1;
         sessionUser = req.body.username;
         req.session.username = req.body.username;
         req.session.name = req.body.name;
         return 1;
       }
       else{
         console.log('Incorrect password');
         break;
         }
      }
      else{
        console.log('Incorrect username');
        i++;
      }
    }
    return 0;
  }

  var userlogin = await checker(users);
  var trainerlogin = await checker(trainers);

  if (userlogin == 1){
    res.redirect('/');
    return;
  }
  else if (trainerlogin == 1){
    req.session.trainer = req.session.username;
    res.redirect('/');
    return;
  }
  else{
    res.redirect('/Iogin.html');
    return;
  }
});

//Signout
app.post('/signout', function(req,res){
  console.log('Signing out');
  loggedin = 2;
  sessionUser = '';
  req.session.destroy(function(err){
    if (err) {
      res.negotiate(err);
    }
    res.redirect('/');
  });
});

//List of trainers
app.post('/trainers', async function(req,res){
  console.log('list of trainers');
  let users = await client.query("select * from trainers");
  res.render('trainerlist.ejs', {users: users.rows});
});

app.post('/buddy', async function(req,res){
  console.log('buddy');
  var user = req.session.username;
  var username = [user];
  var sql = "select main_gym from users where username = $1";
  var gymID = await client.query(sql, username);
  var mainGym = gymID.rows[0].main_gym;
  console.log(mainGym);
  var sql2 = "select * from users where username != $1 and main_gym = $2";
  var data = [user, mainGym];
  let users = await client.query(sql2,data);
  //console.log(users);
  res.render('buddy.ejs', {users:users.rows, name: user, conversation_id: mainGym, chatType: 'Gym'});
});

app.post('/trainerDatabase', async function(req,res){
  console.log('trainer list');
  let users = await client.query("select * from trainers");
  res.render('trainerdatabase.ejs',{users:users.rows});
});

app.post('/ranking', async function(req,res){
  console.log('ranking');
  let users = await client.query("select name,exp,gender from users where username != 'admin' order by exp desc");
  res.render('ranking.ejs',{users:users.rows});
});

app.post('/femalerank', async function(req,res){
  console.log('female ranking');
  let users = await client.query("select name,exp,gender from users where username != 'admin' and gender!='male' order by exp desc");
  res.render('femalerank.ejs',{users:users.rows});
});

app.post('/malerank', async function(req,res){
  console.log('male ranking');
  let users = await client.query("select name,exp,gender from users where username != 'admin' and gender!='female' order by exp desc");
  res.render('malerank.ejs',{users:users.rows});
});

//TDEE
app.get('/tdee', function(req,res){
  console.log('/tdee');
  console.log(req.session.username);
  var weight = req.session.weight;
  var height = req.session.height;
  var age = req.session.age;
  var gender = req.session.gender;
  var activity = req.session.activity;
  console.log(weight);
  console.log(height);
  console.log(age);
  console.log(gender);
  console.log(activity);
  var data = Math.round(TDEE.tdee(weight, height, age, gender, activity));
  console.log(data);
  res.send({data: data});
  });


// display database
app.get('/display',async (req,res)=>{
    let users = await client.query('select * from users');
    res.render('display.pug',{users:users.rows});
});

// Delete user
app.delete('/deleteuser',async (req,res)=>{
  var sql = 'DELETE FROM users WHERE username = $1';
  console.log(req.body.username);
  var username = [req.body.username];
  await client.query(sql,username);
  res.redirect('/');
});

app.delete('/trainerDelete', async (req,res)=>{
  var sql= 'delete from trainers where username = $1';
  var username=[req.body.username];
  await client.query(sql,username);
  res.end()
});

app.delete('/deleteTrainer',async(req,res)=>{
  
  var sql= 'DELETE FROM trainers WHERE username =$1';
  var username = [req.session.username];
  await client.query(sql,username);

  req.session.destroy(function(err){
    if (err) {
      res.negotiate(err);
    }
    res.redirect('/');
  });
});

app.put('/updateuser',async (req,res)=>{
  var username = req.body.username;
  var change = req.body.change;
  var elem = req.body.elem;
  console.log(elem);
  console.log(change);
  console.log(username);
  var sql = 'update users set ' + elem + ' = $1 where username = $2';
  var data = [change, username];
  await client.query(sql,data);
  res.redirect('/');
});

app.put('/changeTrainer', async(req,res)=>{
  var username= req.body.username;
  var change= req.body.change;
  var elem = req.body.elem;
  var sql = 'update trainers set ' + elem + ' = $1 where username = $2';
  var data= [change,username];
  await client.query(sql,data);
  res.end();
})

// Update Weight
app.put('/updateWeight', async (req,res)=>{
  var user = req.session.username;
  var weight = req.body.weight;
  req.session.weight = weight;
  console.log(user);
  console.log(weight);
  var sql = 'update users set weight = $1 where username = $2';
  var data = [weight, user];
  await client.query(sql, data);
  res.end();
});

app.put('/updateCalories', async(req,res)=>{
  var user= req.session.username;
  var total_calories = req.body.total_calories;

  total_calories = Number(total_calories) + Number(req.session.total_calories);

  console.log(user);
  console.log(total_calories);

  var sql= 'update users set total_calories = $1 where username = $2';
  var data= [total_calories, user];

  await client.query(sql,data);
  res.end();
});

// Update Goal
app.put('/updateGoal', async(req,res)=>{
  var user= req.session.username;
  var goal = req.body.goal;
  console.log(user);
  console.log(goal);
  var sql = 'update users set goal = $1 where username = $2';
  var data = [goal,user];
  await client.query(sql, data);
  res.end();
});

// Gain EXP
app.put('/gainEXP', async(req,res)=>{
  var user = req.session.username;
  var exp = req.body.exp;
  console.log(user);
  console.log(exp);
  var sql = 'update users set exp = $1, goal = 0 where username= $2';
  var data= [exp,user];
  await client.query(sql,data);
  res.end();
});

app.put('/clearCal', async(req,res)=>{
  var user = req.session.username;
  var foods = '';
  var workouts = '';
  var sql = 'update users set total_calories = 0, foods= $1, workouts= $2 where username = $3';
  var data= [foods,workouts,user];
  await client.query(sql,data);
  res.end();
});

app.put('/logFood', async(req,res)=>{
  var user = req.session.username;
  var foods = req.session.foods;
  foods += "+" + req.body.foods;
  console.log(foods);
  var sql = 'update users set foods = $1 where username = $2';
  var data= [foods,user];
  await client.query(sql,data);
  res.end();
});

app.put('/logWorkout', async(req,res)=>{
  var user = req.session.username;
  var workouts = req.session.workouts;
  workouts += "+" + req.body.workouts;
  console.log(workouts);
  var sql = 'update users set workouts = $1 where username = $2';
  var data = [workouts,user];
  await client.query(sql,data);
  res.end();
});

//Update macros
app.put('/updateMacros', async(req,res)=>{
  var fats = req.body.fats;
  var carbs = req.body.carbs;
  var protein = req.body.protein;
  var user = req.session.username;
  console.log(fats);
  console.log(carbs);
  console.log(protein);
  var sql = 'update users set fats = $1, carbs = $2, protein = $3 where username = $4';
  var data= [fats,carbs,protein,user];
  await client.query(sql,data);
  res.end();
});
  
//Update record
app.put('/updateRecord', async(req,res)=>{
  var record = req.body.record;
  var user = req.session.username;
  var exercise = req.body.exercise;
  console.log(user);
  console.log(record);
  console.log(exercise);
  var sql = 'update users set ' + exercise + ' = $1 where username= $2';
  var data = [record, user];
  await client.query(sql,data);
  res.end();
});

//Main gym
app.put('/mainGym', async(req,res)=>{
  var gymID = req.body.gymID;
  var user = req.session.username;
  console.log(user);
  console.log(gymID);
  var sql = 'update users set main_gym = $1 where username= $2';
  var data = [gymID, user];
  await client.query(sql,data);
  res.end();
});

app.get('/customerService', async (req,res) => {
  // var conversation_id = req.body.conversation_id;
  // var who = req.body.who;

  if (req.session.username == 'admin'){
    res.render('chatAdmin.ejs',{name: req.session.username, conversation_id: 1, chatType: 'Public'});
  }
  else if(req.session.username){
    res.render('chat.ejs',{name: req.session.username, conversation_id: 1, chatType: 'Public'});
  }else{
    res.redirect('/login.html')
  }
})

app.post('/chat', async (req,res) => {
  var conversation_id;
  if (req.body.trainer){
    conversation_id = req.body.trainer;
  }
  else {
    conversation_id = req.session.username;
  }

  if (req.session.trainer){
    res.render('chatTrainer.ejs', {name: req.session.username, conversation_id: conversation_id, chatType: 'Private'});
  }
  else if(req.session.username){
    res.render('chat.ejs',{name: req.session.username, conversation_id: conversation_id, chatType: 'Private'});
  }

  else{
    res.redirect('/login.html')
  }
})


// customer service 
// io.on('connection', user => {
//   user.on('admin' , () => {
//     customerServie = user.id;
//   });
//   user.on('userMsg', msg => {
//     if(customerServie){
//       io.emit('userResponseMsg', msg);
//     }else{
//       io.emit('userResponseMsg', msg);
//       io.emit('adminResponseMsg', 'admin is not online, please try later');
//     }
//   });
//   user.on('adminMsg', msg => {
//     io.emit('adminResponseMsg', msg);
//   });
//   user.on('disconnect', ()=> {
//     if(user.id === customerServie){
//       customerServie = false;
//     }
//   })
// });


//Private/public chat
io.sockets.on('connection', function (socket) {

  socket.on('subscribe', function(data) {
    socket.user = data.user;
    users.push(socket.user);
    updateClients();
    console.log('joining room', data.room);
    socket.join(data.room);
    //var clients = io.sockets.adapter.rooms[data.room];
    //nicknames[data.room] = [data.user];
    //console.log(clients);
    // io.sockets.in(data.room).emit('clients',{
    //   //clients : nicknames[data.room]
    // })

  });

  socket.on('send message', function(data) {
    console.log('sending room post', data.room);
    console.log('message:' + data.message);
    console.log('sender:' + data.sender);
    io.sockets.in(data.room).emit('conversation private post', {
        message: data.message,
        sender: data.sender
    });
  });

  socket.on('disconnect', function () {
    console.log('disconnect yo');
    console.log(socket.user);
    for(var i=0; i<users.length; i++) {
        if(users[i] == socket.user) {
            users.splice(i, 1);
            console.log('deleting user');
        }
    }
    updateClients(); 
  });

  function updateClients() {
    console.log('updating clients');
    io.sockets.emit('update', users);
  }
});

// The await in a non-async fn was crashing the server
//
// app.post('/',async (req,res)=>{
//   if(req.files){
//     var file = req.files.filename,
//       filename= file.name;
//     var username= req.session.username;
//     file.mv("./public/img/" + filename, function(err){
//       if (err){
//         console.log(err);
//         res.send("error occured");
//       }else{
//         filename= 'img/' + filename;
//         var sql= 'update trainers set pp = $1 where username = $2';
//         var data = [filename,username];
//         await client.query(sql,data);
//         res.redirect('/');
//       }
//     })
//   }
// });



app.put('/updateTrainer',async (req,res)=>{
  var username = req.session.username;
  var change = req.body.change;
  var elem = req.body.elem;
  console.log(elem);
  console.log(change);
  console.log(username);

  if (elem == 'gender'){
    if (change == 'female'){
      var pp = 'img/girlTrainer.jpg'
      var sql = 'update trainers set gender = $1, pp= $2 where username = $3';
      var data = [change, pp, username];
      await client.query(sql,data);
      res.redirect('/');
    }
    else{
      var pp = 'img/boytrainer.jpg'
      var sql = 'update trainers set gender = $1, pp = $2, where username = $3';
      var data= [change,pp,username];
      await client.query(sql,data);
      res.redirect('/');
    }
  }
  else{
    var sql = 'update trainers set ' + elem + ' = $1 where username = $2';
    var data = [change, username];
    await client.query(sql,data);
    res.redirect('/');
  }
});


server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
