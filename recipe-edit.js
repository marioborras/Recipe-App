const titleElement = document.querySelector("#recipe-title")
const bodyElement = document.querySelector("#recipe-body")
const recipeID = location.hash.substring(1)
let recipes = loadRecipes()
let recipe = recipes.find((recipe) => recipe.id === recipeID)
titleElement.value = recipe.title
bodyElement.value =recipe.body

renderIngredients(recipe)

titleElement.addEventListener("input", (e)=> {
    recipe.title = e.target.value
    saveRecipes()
})

bodyElement.addEventListener("input", (e)=> {
    recipe.body = e.target.value
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


