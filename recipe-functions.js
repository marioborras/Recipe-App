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
const recipeSummary = (recipe) => {
    let howManyTrue = 0
    recipe.ingredients.forEach((ingredient) => {
        if (ingredient.have === true) {
            howManyTrue++
        }
    })
    if (howManyTrue === 0 ) {
        return "You have none of the ingredients"
    } else if (howManyTrue === recipe.ingredients.length) {
        return "You have all of the ingredients"
    }else {
        return "You have some of the ingredients"
    }
  
    
    
}

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement("label")
    const textEl = document.createElement("a")
    const summaryText = document.createElement("span")
    recipe.title.length > 0 ? textEl.textContent = recipe.title: textEl.textContent = "unnamed recipe"
    textEl.classList.add("ingredient-link")
    textEl.setAttribute("href",`edit.html#${recipe.id}`)
    summaryText.textContent= recipeSummary(recipe)
    recipeEl.classList.add("list-item")
    recipeEl.appendChild(textEl)
    recipeEl.appendChild(summaryText)
    return recipeEl
}

const renderRecipes= (filters) => {
    const recipesEl = document.querySelector("#recipes")
    const recipes = loadRecipes()
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    recipesEl.innerHTML=""
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe)=> {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
       
    }else {
        const emptyMessage = document.createElement("p")
        emptyMessage.textContent = "No Recipes to show"
        recipesEl.appendChild(emptyMessage)
    }

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
            const ingredientLabel= document.createElement("label")
            ingredientLabel.classList.add("ingredient-item")
            const ingredientItemContainer = document.createElement("div")
            ingredientItemContainer.classList.add("ingredient-item__container")
            const checkBox = document.createElement("input")
            checkBox.checked = ingredient.have
            const ingredientText = document.createElement("span")
            ingredientText.textContent = ingredient.name
            
            checkBox.setAttribute("type","checkbox")
            checkBox.addEventListener("change", ()=> {
                toggleIngredient(ingredient.name)
            })
            ingredientItemContainer.appendChild(checkBox)
            ingredientItemContainer.appendChild(ingredientText)
        
            //setup remove link
            const remove = document.createElement("a")
            remove.textContent = "remove"
            remove.addEventListener("click",() => {
                removeIngredient(ingredient.name)
                saveRecipes()
                renderIngredients(recipe)
            })
            ingredientLabel.appendChild(ingredientItemContainer)
            ingredientLabel.appendChild(remove)
            ingredientsEl.appendChild(ingredientLabel)
    })
    
}
    

