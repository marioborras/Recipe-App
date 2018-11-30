let recipes = loadRecipes()

const filters = {
   searchText: ""
}

renderRecipes(filters)

document.querySelector("#create-recipe").addEventListener("click", (e) =>{
    // const id = createRecipe()
    createRecipe()
    // location.assign(`/edit.html#${id}`)
    renderRecipes(filters)

})

document.querySelector("#search-text").addEventListener("input", (e)=> {
    filters.searchText = e.target.value
    renderRecipes(filters)
})

