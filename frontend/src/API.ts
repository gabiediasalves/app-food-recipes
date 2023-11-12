const searchRecipes = async (searchTerm: string, page: number) => {
    const baseURL = new URL("http://localhost:5000/api/recipes/search");
    baseURL.searchParams.append("searchTerm", searchTerm);
    baseURL.searchParams.append("page", page.toString());
  
    const response = await fetch(baseURL.toString());
  
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  
    return response.json();
  };
  
  export { searchRecipes };  
 

  const getRecipeSummary = async (recipeId: string) => {
    const baseURL = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`); 
  
    const response = await fetch(baseURL.toString());
  
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  
    return response.json();
  };
  
  export { getRecipeSummary };


  export const getFavoriteRecipes = async () => {
    const url = new URL("http://localhost:5000/api/recipes/favorite");
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };
  
  export const addFavoriteRecipe = async (recipe: { id: any; }) => {
    const body = {
      recipeId: recipe.id,
    };
    const response = await fetch("http://localhost:5000/api/recipes/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to save favorite");
    }
  };

  export const removeFavoriteRecipe = async (recipe: { id: any; }) => {
    const body = {
      recipeID: recipe.id,
    };
    const response = await fetch("http://localhost:5000/api/recipes/favorite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to remove favorite");
    }
  };