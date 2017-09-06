function addRecipe(){
    var recipeTitle = document.getElementById("recipeTitle").value;
    var recipeContent = document.getElementById("recipeContent").value;
    alert("Chcesz dodać przepis na " + recipeTitle + " o treści: " + recipeContent);
    document.getElementById("newRecipes").innerHTML=recipeTitle;
    location.href='index.html#myRecipes';
} /*function that adds new user recipe to local database*/

