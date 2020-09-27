const apiId = "ad743460"
const apiKey = "415785c7de7ca93b3c13f22b77331956"

function getItemData(searchTerm, callback) {
  $.ajax({
    url: `https://api.nutritionix.com/v1_1/search/${searchTerm}?appId=${apiId}&appKey=${apiKey}`,
    type: 'get',
    success: function(data) {
      console.log(data);
      callback(data)
    }
  })
}


function getNutritionData(element, callback) {
	$.ajax({
    url: `https://api.nutritionix.com/v1_1/item?id=${element.dataset.itemId}&appId=${apiId}&appKey=${apiKey}`,
    type: 'get',
    success: function(data) {
      console.log(data);
      callback(data, element)
    }
  })
}
