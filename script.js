// const url = 'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2/%7Bid%7D?type=public&field%5B0%5D=uri&beta=true';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'Accept-Language': 'en',
// 		'X-RapidAPI-Key': 'df04c0c3e6mshe64ccb6aa49f000p1ae751jsn3e242baa2eed',
// 		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
var EdamamAPIKey = "df04c0c3e6mshe64ccb6aa49f000p1ae751jsn3e242baa2eed";
var recipeInput = document.getElementById("recipe-search");
var searchButton = document.getElementById("submitBtn");
var filterIngredientInput = document.getElementById("filter-ingredient");
var filterMealSelect = document.getElementById("filter-meal");
var filterButton = document.getElementById("filterBtn");
console.log("hi");

const options = {
	method: 'GET',
	headers: {
		'Accept-Language': 'en',
		'X-RapidAPI-Key': EdamamAPIKey,
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
	}
}; // get input to display on UI

function getSelectedMealFilter() {
    return filterMealSelect.value;
}

function getIngredientFilter() {
    return filterIngredientInput.value.trim();
}

var getRecipeData = function (event) {
    event.preventDefault();

    var recipeName = recipeInput.value.trim(); //Gets entered recipe name and trims any whitespace
    var ingredientFilter = getIngredientFilter();
    var selectedMeal = getSelectedMealFilter();
    console.log(recipeName);
    console.log(selectedMeal);
    console.log(ingredientFilter);

    var url = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=${recipeName}&beta=true`;

    if (selectedMeal) {
        url += `&mealType=${selectedMeal}`;
    }

    if (ingredientFilter) {
        url += `&ingredients=${ingredientFilter}`;
    }
    
    

    var resultsContainer = document.querySelector(".results");
    resultsContainer.innerHTML = '';

    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var { hits } = data;
            console.log(hits)
            for (var i = 0; i <hits.length; i++) {
    console.log(hits[i])
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var image = document.createElement("img");
    image.setAttribute("src", hits[i].recipe.images.SMALL.url);
    card.append(image);
    var aTag = document.createElement("a");
    aTag.setAttribute("href", hits[i]._links.self.href);
    aTag.setAttribute("target", "_blank");
    var title = document.createElement("h3").textContent= " " + hits[i].recipe.label + " ";
    aTag.append(title);
    card.append(aTag);
    resultsContainer.appendChild(card);
}
})
};



var getYoutubeData = function() {
    var youtubeURL = ""
    
    fetch(youtubeURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}


searchButton.addEventListener("click", getRecipeData);
filterButton.addEventListener("click", getRecipeData);