let recipes = loadRecipes()

const filters = {
   searchText: ""
}

renderRecipes(filters)

document.querySelector("#create-recipe").addEventListener("click", (e) =>{
    createRecipe()
    renderRecipes(filters)

})

document.querySelector("#search-text").addEventListener("input", (e)=> {
    filters.searchText = e.target.value
    renderRecipes(filters)
})

