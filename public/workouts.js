function createNode(el) {
  return document.createElement(el); 
}

function append(par, el) {
  return par.appendChild(el); 
}  

const set1 = [91,94,92,125,126,93,95],
      set2 = [88,74,81,80,129,82,83,87,85,84,86,138,89,90,139],
      set3 = [109,110,105,128,143,144,141,107,140,142,108,106],
      set4 = [104,103,102],
      set5 = [97,98,99,100,101,122,145,146],
      set6 = [112,113,116,154,117,118,115,114,130,111],
      set7 = [124,148,149,119,123,152,155,150,151,147,127];

queryAPI = function() {
    let x = document.getElementById("ex_cat").value; //get selected category
    console.log(x);
    const url1 = 'https://wger.de/api/v2/exercise/?format=json&license_author=wger.de&language=2&category=' + x;
    const urls = checkCtg(url1, x); //generate image urls
    const list2 = document.getElementById('exercises2'); //get div box
    list2.innerHTML = ""; //clear div box

    //fetch each url async
    Promise.all(urls.map(url =>
    fetch(url)                
        .then(response => response.json())
        .catch(function (err) {
            console.log(err);
        })
    )) 
    .then(function(data) {
        var exercises = data[0].results; //now a numbered list of elements: 0,1,2,...
        var images = [];
        for (let i = 1; i < data.length; i++) {
            if(data[i].results[0] == null){
                images.push(null);
                images.push(null);
            } else {
                images.push(data[i].results[0].image);
                images.push(data[i].results[1].image);
            }
        } 
        list2.innerHTML = `<h3> Results: </h3>`;

        let i = 0;
        exercises.map(function(exercise) {  //iterate over results
            //console.log(exercise.id);
            let li = createNode('li'), 
                img = createNode('img'),
                img2 = createNode('img'),
                span = createNode('span'),
                span2 = createNode('span'),
                tr = createNode('tr'),
                td = createNode('td');

            if(images[i] == null) {
                img.src = "";
                img2.src = "";
                span.innerHTML = `
                >>&nbsp;&nbsp;&nbsp;<b>${exercise.name}</b>:
                `;
            } else {
                img.src = images[i];
                img2.src = images[i+1];
                img.style = "height:15%";
                img2.style = "height:15%";
                span.innerHTML = `
                >>&nbsp;&nbsp;&nbsp;<b>${exercise.name}</b>:<br><br>
            `;
            }
            if(exercise.description == "<p>.</p>" || exercise.description == "") {
                exercise.description = "<p><i>No description available.</i></p>";
            }
            span2.innerHTML = `
                ${exercise.description}<br>
            `;
            append(td, span);
            append(td, img);
            append(td, img2);
            append(td, span2);
            append(tr, td);
            append(list2, tr);
            i = i + 2;
        })
    })
    .catch(function (err) {
        console.log(err);
    })
}

queryAPI2 = function() {
    let x = document.getElementById("ex_eq").value; //get selected equipment type
    console.log(x);
    const url = 'https://wger.de/api/v2/exercise/?format=json&license_author=wger.de&language=2&equipment=' + x;
    const list2 = document.getElementById('exercises2'); //get div box
    list2.innerHTML = ""; //clear div box

    fetch(url)                
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Error, status code: ' + response.status);
            }
            return response.json();
        })       
        .then(function(data) {
            var exercises = data.results; //now a numbered list of elements: 0,1,2,...
            // list2.innerHTML = `Number of results: ${exercises.length}<br><br><br>`;
            list2.innerHTML = `<h3> Results: </h3>`;

            exercises.map(function(exercise) {  //iterate over results
                //console.log(exercise.id);
                let span = createNode('span'),
                    span2 = createNode('span'),
                    tr = createNode('tr'),
                    td = createNode('td');

                span.innerHTML = `
                    >>&nbsp;&nbsp;&nbsp;<b>${exercise.name}</b>:
                `;
                if(exercise.description == "<p>.</p>" || exercise.description == "") {
                    exercise.description = "<p><i>No description available.</i></p>";
                }
                span2.innerHTML = `
                    ${exercise.description}<br>
                `;
                append(td, span);
                append(td, span2);
                append(tr, td);
                append(list2, tr);
            })
        })
        .catch(function (err) {
            console.log(err);
        })
}

testfn = function() {
    let x = document.getElementById("ex_cat").value;
    const url1 = 'https://wger.de/api/v2/exercise/?format=json&license_author=wger.de&language=2&category=' + x;
    // const urls = [
    //     url1,
    //     'http://wger.de/api/v2/exerciseimage/?format=json' //http://wger.de/api/v2/exerciseimage/<id>/thumbnails/?format=json
    // ];
    const urls = checkCtg(url1, x);
    const list2 = document.getElementById('exercises2');
    list2.innerHTML = ""; //clear div box

    //console.log('testfn: ', urls);
}

checkCtg = function(u, x) {
    let urls = [u];
    if (x == 10) {
        for (let i = 0; i < set1.length; i++) {
            urls.push('https://wger.de/api/v2/exerciseimage/?format=json&exercise=' + set1[i])
        }
    } else if (x == 8) {
        for (let i = 0; i < set2.length; i++) {
            urls.push('https://wger.de/api/v2/exerciseimage/?format=json&exercise=' + set2[i])
        }
    } else if (x == 12) {
        for (let i = 0; i < set3.length; i++) {
            urls.push('https://wger.de/api/v2/exerciseimage/?format=json&exercise=' + set3[i])
        }
    } else if (x == 14) {
        for (let i = 0; i < set4.length; i++) {
            urls.push('https://wger.de/api/v2/exerciseimage/?format=json&exercise=' + set4[i])
        }
    } else if (x == 11) {
        for (let i = 0; i < set5.length; i++) {
            urls.push('https://wger.de/api/v2/exerciseimage/?format=json&exercise=' + set5[i])
        }
    } else if (x == 9) {
        for (let i = 0; i < set6.length; i++) {
            urls.push('https://wger.de/api/v2/exerciseimage/?format=json&exercise=' + set6[i])
        }
    } else {
        for (let i = 0; i < set7.length; i++) {
            urls.push('https://wger.de/api/v2/exerciseimage/?format=json&exercise=' + set7[i])
        }
    }
    return urls;
}