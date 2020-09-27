var currentWeight = <%= weight %>;
var currentGoal = <%= goal %>;
var currentEXP= <%= exp %>;
var flag;

function init(){
    progressBar();
    rankImg();
    flag = 0 ;
}

function rankImg(){
    if (currentEXP >= 2000){
        document.getElementById("trophy").src= "img/gold.jpg";
        document.getElementById("rank").innerHTML= "Rank: Gold ";
        document.getElementById("name").style.color= "#dcc03f"

    }
    else if (currentEXP >= 1000){
        document.getElementById("trophy").src= "img/silver.jpg";
        document.getElementById("rank").innerHTML= "Rank: Silver ";
        document.getElementById("name").style.color="#a9a8a6";
    }
    else{
        document.getElementById("trophy").src= "img/bronze.jpg";
        document.getElementById("rank").innerHTML= "Rank: Bronze ";
        document.getElementById("name").style.color="#b67c23";
    }
}


function progressBar(){
    var progress;
    if (currentWeight/currentGoal > 1 ){
        // user wants to lose weight
        progress = currentGoal/ currentWeight;
    }
    else{
        // user wants to gain weight.
        progress = currentWeight/currentGoal;
    }

    progress = progress * 100;
    progress = Math.round(progress);

    if (progress > 100){
        progress = 100;
    }

    document.getElementById("progresss").value= progress;
    document.getElementById("progress_msg").innerHTML= "Progress: " + progress.toString() + "%";
}

function accomplishGoal(){
    var oldWeight= <%= weight %>;

    if (currentWeight != currentGoal){
        document.getElementById("error").innerHTML= "You have not achieved your goal weight yet!";
    }
    else {
        var gain = (oldWeight - currentWeight);
        if(flag==0){
            gain = gain * 100;
            gain = Math.abs(gain);
        } 
        else{
            gain = 0
        } 
        
        currentEXP = currentEXP + gain;
        document.getElementById("exp").innerHTML = "EXP: " + currentEXP.toString() + " pts";
        document.getElementById("gWeight").innerHTML = "Goal Weight: 0 kg";

       $.ajax({
            type: 'put',
            url: '/gainEXP',
            data: {exp: currentEXP},
            async: false,
            success:function(response){
                flag = 1;
            }
        });
        rankImg();
    }
}

function inputWeight(){
    var txt;
    var weight = prompt("Please input your current weight in kg: ");
    if (weight == "" ){
        txt= "You have entered in an empty input."
        document.getElementById("error").innerHTML = txt;
    }
    else if (isNaN(weight)){
        txt= "Weight should be numeric."  
        document.getElementById("error").innerHTML = txt;
    }
    else{
        
        document.getElementById("error").innerHTML= "";
        document.getElementById("cWeight").innerHTML= "Current Weight: " + weight.toString() + " kg";
        currentWeight= weight;
        progressBar();
        $.ajax({
            type: 'put',
            url: '/updateWeight',
            data: {weight: weight},
            async: false,
            success:function(response){
                //document.getElementById("error").innerHTML= "works";
            }
        });
        var newTDEE;
        $.ajax({
            type: 'get',
            url: '/tdee',
            data: {weight: weight},
            async: false,
            success: function(response){
                newTDEE = response.data;
                //document.getElementById("error").innerHTML= "works2";
            }
        });
        document.getElementById("tdee").innerHTML = "Your Total Daily Energy Expenditure (TDEE): " + newTDEE.toString() + " Calories";
    }
};

function inputGoal(){

    var newGoal = prompt("Please enter your goal weight in kg: ");

    if (newGoal == currentGoal){
        document.getElementById("error").innerHTML= "Your new goal is the same as your current goal.";
    }
    else if (newGoal == currentWeight){
        document.getElementById("error").innerHTML= "Your new goal is equal to your current weight!";
    }
    else if (isNaN(newGoal)){
        document.getElementById("error").innerHTML= "Your goal should be in numbers.";
    }
    else{
        currentGoal= newGoal;
        document.getElementById("error").innerHTML= "";
        document.getElementById("gWeight").innerHTML= "Goal Weight: " + newGoal.toString() + " kg"; 
        progressBar();
        $.ajax({
            type: 'put',
            url: '/updateGoal',
            data: {goal: newGoal},
            async: false,
            success:function(response){
                console.log("Goal changed");
            }
        });
    }

}

function macros(){
    var tdee = <%= data %>;
    var errormsg = "Invalid percentage";

    var fatsPercent = prompt("Enter fat percentage");
    if (isNaN(fatsPercent)){
        document.getElementById("error").innerHTML = errormsg;
        return;
    }
    var carbsPercent = prompt("Enter carbs percentage");
    if (isNaN(carbsPercent)){
        document.getElementById("error").innerHTML = errormsg;
        return;
    }
    var proteinPercent = prompt("Enter protein percentage");
    if (isNaN(proteinPercent)){
        document.getElementById("error").innerHTML = errormsg;
        return;
    }
    
    var sum = Number(fatsPercent) + Number(carbsPercent) + Number(proteinPercent);
    console.log(sum);
    if (sum != 100){
        document.getElementById("error").innerHTML = "Percentages must add up to 100";
        return;
    }

    var fats = Math.round((tdee * (fatsPercent/100))/9);
    var carbs = Math.round((tdee * (carbsPercent/100))/9);
    var protein = Math.round((tdee * (proteinPercent/100))/9);

    document.getElementById("fats").innerHTML = "Fats: " + fats.toString() + "g  ";
    document.getElementById("carbs").innerHTML = "Carbs: " + carbs.toString() + "g  ";
    document.getElementById("protein").innerHTML = "Protein: " + protein.toString() + "g  ";
}


function clearCal(){
    var check= confirm("Are you sure you want to clear your daily log?");
    if (check == true){
        document.getElementById("totalCal").innerHTML = "&nbsp; = &nbsp; 0 calories";
            $.ajax({
                type: 'put',
                url: '/clearCal',
                async: false,
                success:function(response){
                    alert("Cleared!");
                }
            });
    }
}
