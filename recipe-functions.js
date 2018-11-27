const loadRecipes = () => {
    const recipeJSON = localStorage.getItem("recipes")
    try {
        return recipeJSON ? JSON.parse(recipeJSON) : []
    } catch (e) {
        return []
    }
}

const saveRecipes = ()=> {
localStorage.setItem("recipes",JSON.stringify(recipes))
}
const createRecipe = () => {
    const id =uuidv4()
    recipes.push({
        id: id,
        title: "",
        body: "",
        ingredients: []

    })
    saveRecipes()
    return id
}

const renderRecipes= () => {
    const recipesEl = document.querySelector("#recipes")
    const recipes = loadRecipes()
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    recipesEl.innerHTML=""
    recipeEl.appendChild(filteredRecipes)

}

const toggleIngredient = (name) => {
    const ingredient = recipe.ingredients.find(ingredient => ingredient.name === name)
    if (ingredient) {
        ingredient.have = !ingredient.have
    }
    saveRecipes()
}
const removeIngredient = (name) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient)=> ingredient.name === name)
    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex,1)
    }
    saveRecipes()
}

const renderIngredients = (recipe) => {
        const ingredientsEl = document.querySelector("#ingredients")
        ingredientsEl.innerHTML = ""
        recipe.ingredients.forEach((ingredient)=> {
            const ingredientDiv = document.createElement("div")
            const checkBox = document.createElement("input")
            checkBox.checked = ingredient.have
            const ingredientText = document.createElement("span")
            ingredientText.textContent = ingredient.name
            
            const removeButton = document.createElement("button")
            checkBox.setAttribute("type","checkbox")
            checkBox.addEventListener("change", ()=> {
                toggleIngredient(ingredient.name)
            })
            ingredientDiv.appendChild(checkBox)
            ingredientDiv.appendChild(ingredientText)
        
            //setup remove button
            removeButton.textContent = "remove"
            removeButton.addEventListener("click",() => {
                removeIngredient(ingredient.name)
                saveRecipes()
                renderIngredients(recipe)
            })
            ingredientDiv.appendChild(removeButton)
            ingredientsEl.appendChild(ingredientDiv)
    })
    
}
    

