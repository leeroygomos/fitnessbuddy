function tdee(weight, height, age, gender, activity){
    var ree = 0;
    if (gender == 'male'){
        ree = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    else if (gender == 'female'){
        ree = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    else {
        ree = 1;
    }

    var tdee = 0;

    if (activity == 'Sedentary'){
        tdee = ree * 1.2;
    }
    else if (activity == 'Lightly Active'){
        tdee = ree * 1.375;
    }
    else if (activity == 'Active'){
        tdee = ree * 1.55;
    }
    else if (activity == 'Very Active'){
        tdee = ree * 1.725;
    }
    else {
        tdee = 1;
    }

    return tdee;
}
