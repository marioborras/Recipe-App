const titleElement = document.querySelector("#recipe-title")
const bodyElement = document.querySelector("#recipe-body")
const recipeID = location.hash.substring(1)
let recipes = loadRecipes()
let recipe = recipes.find((recipe) => recipe.id === recipeID)

if (recipe.name || recipe.instructions){
    titleElement.value = recipe.name
    bodyElement.value =recipe.instructions
}


renderIngredients(recipe)

titleElement.addEventListener("input", (e)=> {
    recipe.name = e.target.value
    saveRecipes()
})

bodyElement.addEventListener("input", (e)=> {
    recipe.instructions = e.target.value
    saveRecipes()
})

document.querySelector("#ingredients-form").addEventListener("submit",(e)=> {
 const ingredient = e.target.elements.text.value.trim()
 e.preventDefault()
    if (ingredient.length > 0) {
        recipe.ingredients.push({
            name: ingredient,
            have: false
        })
    }
    e.target.elements.text.value = ""
    saveRecipes()
    renderIngredients(recipe)
})

document.querySelector("#remove-recipe").addEventListener("click",() => {
    removeRecipe(recipeID)
    location.assign(`/index.html`)
})

