const bodyParser = require('body-parser');
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

function loginValidator(){
    client.query('SELECT * FROM users', function(err, result){
        if (result.rows[0].username == document.username){
          if (result.rows[0].password == document.password){
            //loggedin = 0;
            //sessionUser = req.body.username;
            return true;
          }
        }
        else{
          var i = 1;
          while (result.rows[i]){
            if (result.rows[i].username == document.username){
              console.log('Correct username');
              console.log(result.rows[i].username);
              if (result.rows[i].password == document.password){
                console.log('correct password');
                console.log(result.rows[i].password);
                // loggedin = 1;
                // sessionUser = req.body.username;
                return true;
              }
              else{
                console.log('Incorrect password');
                // res.redirect('/');
                return false;
              }
            }
            else{
              console.log('Incorrect username');
              i++;
            }
          }
          console.log("Incorrect login");
          return false;
        }
      });
}