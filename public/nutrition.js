
var globalvar= "";
function showItems(dataFromApi) {

	$("#accordion").children().remove()
	let html = ""
	
	dataFromApi.hits.forEach( item_hash => {

		html += `<div class="card">`
		html += `<div class="card-header" role="tab" id="heading${item_hash.fields.item_id}">`
		html += `<h5 class="mb-0">`
		html += `<a data-toggle="collapse" data-parent="#accordion" href="I ate this!" aria-expanded="true" data-item-id="${item_hash.fields.item_id}" onclick="getNutritionData(this, logCalory); logFood('${item_hash.fields.item_name}')" class="log">I ate this!</a>`
		html += `<a data-toggle="collapse" style="float: right;" data-parent="#accordion" href="#collapse${item_hash.fields.item_id}" aria-expanded="true" aria-controls="collapse${item_hash.fields.item_id}" data-item-id="${item_hash.fields.item_id}" onclick="getNutritionData(this, showNutrition)" class="details-button">${item_hash.fields.item_name} (${item_hash.fields.brand_name})</a><br><br>`
		
		html += `</h5>`
		html += `</div>`
		html += `</div>`


	})

	$("#accordion").append(html)
}

$("#submit-button").on('click', e => {
  let searchTerm = $("#searchTerm").val()
  getItemData(searchTerm, showItems);

  globalvar= searchTerm;
})

function showNutrition(dataFromApi, element) {
	let parent = $(element).closest(".card")
	if (parent.find(".card-block").length === 0) {

		let html = ""
		html += `<div id="collapse${dataFromApi.item_id}" class="collapse in" role="tabpanel" aria-labelledby="heading${dataFromApi.item_id}">`
		html += `<div class="card-block">`
		html += `Serving Size: ${dataFromApi.nf_serving_size_qty} ${dataFromApi.nf_serving_size_unit}<br>`
		html += `Calories: ${dataFromApi.nf_calories}<br>`
		html += `Fat (g): ${dataFromApi.nf_total_fat}<br>`
		html += `Carbs (g): ${dataFromApi.nf_total_carbohydrate}<br>`
		html += `Protein (g): ${dataFromApi.nf_protein}`
		html += `</div>`
		html += `</div>`

		$(parent).append(html)
	}
}


function logFood(foodname){
	var foods = foodname;
	$.ajax({
		type:'put',
		url: '/logFood',
		data: {foods:foods},
		async: false,
		success: function(response){
			alert("Food added!");
		}
	});
}

function logCalory(dataFromApi, element){
	let parent = $(element).closest(".card")
	if (parent.find(".card-block").length === 0){
		var total_calories= `${dataFromApi.nf_calories}`;

		$.ajax({
                    type: 'put',
                    url: '/updateCalories',
                    data: {total_calories: total_calories},
                    async: false,
                    success:function(response){
                    	// alert("Food logged!");
                    }
                });
	}
}