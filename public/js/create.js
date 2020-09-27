;(function(){
    $('#username').onblur = function(){
        checkName($('#username').value);
    }
    $('#submit').onclick = function(){
        let s = {
            username:$('#username').value,

        }
        checkUser(s.username)
        if($('#error').innerText == ''){
            $.ajax({
                // method:'POST',
                url:'/signup',
                data:s,
                success:function(res){
                    if(res.code == 0){
                        alert('successssss')
                        location.href = '/signup'
                    }
                }
            })
        }else{
            return;
        }
    }
    function errhandle(text){
        $('#error').innerText = text;
        setTimeout(()=>{
            $('#error').innerText = '';
        },3000)
    }


    function checkUser(un){
        if(un >= 1.0 ){
            $('#gpashow').innerText = gpa;
        }else{
            errhandle('** gpa should be 1.0-4.0');
        }
    }

})()
