<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="css/trainerhome.css" rel="stylesheet" type = "text/css">
    <script src= "https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>Trainer Homepage</title>

        <script>
        function lettersOnly(txt){ 
            if (/^[A-Za-z]+$/.test(txt)){
            
                return true;
            }
            else{
                return false;
            }
        }

         function editingT(){
            var elem = prompt("What element would you like to change?");
            var change;

            if (elem == 'name'){
                change = prompt("Please enter your new name.");
                if (!lettersOnly(change)){
                    alert("Name should be in letters only.");
                    return;
                }
            }
            else if (elem == 'experience'){
                change = prompt("Please enter your new experience years.");
                if (isNaN(change)){
                    alert("Experience years should be numeric.");
                    return;
                }
            }
            else if (elem == 'company'){
                change = prompt("Please enter your new company name.");
            }

            else if (elem == 'phone'){
                change = prompt("Please enter your new phone number in numbers only.");
                if (isNaN(change)){
                    alert("Phone number should be numeric.");
                    return;
                }
            }
            else if (elem == 'email'){
                change = prompt("Please enter your new email");
            }
            else if (elem == 'username'){
                change = prompt("Please enter the new username");
            }
            else if (elem == 'password'){
                change = prompt("Please enter the new password");
            }
            else if (elem == 'dob'){
                change = prompt("Please enter the new dob in yyyy-mm-dd format");
                if (isNan(Date.parse(change))){
                    alert("Invalid element, please try again");
                    return;
                }
            }
            else if (elem == 'gender'){
                change = prompt("Please enter your new gender: female or male.");
                if (change != 'female' || change != 'male'){
                    alert("Gender should either be male or female");
                    return;
                }
            }
            else{
                alert("Invalid element, please try again");
                return;
            }

            $.ajax({
                type:'put',
                url:'/updateTrainer',
                data:{elem:elem,change:change},
                async: false,
                success:function(){
                    console.log("Your personal info has been changed!");
                }
            });
            alert("Your personal info has been changed!");
            location.reload();
        }

        function deleteT(){
            var check = confirm("Are you sure you want to delete your account?");
            if (check == true){
                $.ajax({
                    type:'delete',
                    url:'/deleteTrainer',
                    async: false,
                    success:function(){
                        console.log("Trainer account deleted");
                    }
                });
            }
            location.reload();
            
        }
    </script>

</head>
<body>
        <ul class="topnav">
        <li> <a class="active" href="/">Home</a> </li>
        <li> <a href= "workouts.html"> Workouts </a> </li>
        <li> <a href="nutrition.html">Nutrition</a> </li>
        <li> <a href="gyms.html">Find Gyms</a> </li>
        <li class= "rankinglist">
            <form action="/ranking" method= "post">
                <button type = "submit" id = "signout_button" style= "background-color: transparent; margin-bottom:5px;">
                <span>
                <a> Leaderboards </a> </span></button></form></li>
        <li class= "rankinglist">
            <form action="/chat" method= "post">
                <button type = "submit" id = "signout_button" style= "background-color: transparent; margin-bottom:5px;">
                <span>
                <a> Chat with Clients </a> </span></button></form></li>
        <li> <a href="client.html">See your clients</a> </li>
        <li class= "right"> 
            <form action="/signout" method="post">
                <button type="submit" id="signout_button" style="
                  background-color: transparent;
                  margin-bottom: 5px;"><span>
                <a>Sign Out</a></span></button>
            </form></li>   
    </ul>
    
    <h3 style="margin-left:10%; margin-top:17%; margin-right:0%; float:left;">Hello, <%= user %>!<br><br> This is what your profile card looks like: </h3>

    <div class="card">
        <img src= <%= pp %> style= "width:100%;">
        <h3><%= name %></h3>
        <p class>Experience: <%= experience %> years</p>
        <p class>Company: <%= company %></p>
        <p>Date of Birth: <%= dob %></p>
        <p>Email: <%= email %></p>
        <p>Phone: <%= phone %></p>
        <p>Gender: <%= gender %></p>
    </div>

    <button type="button" class="edit" onclick= "editingT()" > Edit Your Info </button>
    <button type="button" class="delete" onclick= "deleteT()" > Delete Your Account </button>

    
    <form method="post" enctype="multipart/form-data"  action="upload.php">
      
      <input type="file" name="file" id="file" accept='image/png, image/jpeg' required >
      <button type="submit" id="btn"> Change Profile Picture</button>
    </form>

    

    <footer>
        <p>Group Pineapple | copyright 2019</p>
    </footer>

</body>
</html>