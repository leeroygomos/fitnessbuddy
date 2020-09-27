$("#submit-button1").on('click', e => {
  var exercise = $("#exercisin").val();
  var reps = $("#reps").val();
  var sets = $("#sets").val();

  var workouts = exercise + " (Reps: " + reps + "), (Sets: " + sets + ")";
  	$.ajax({
		type:'put',
		url: '/logWorkout',
		data: {workouts:workouts},
		async: false,
		success: function(response){
			alert("Exercise logged!");
			location.reload();
		}
	});
})
