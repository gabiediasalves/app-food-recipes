
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import { AiOutlineSearch } from "react-icons/ai";
import { useRef, useState, FormEvent, useEffect } from "react";
import { searchRecipes, getFavoriteRecipes, addFavoriteRecipe, removeFavoriteRecipe } from "./API";
import { Recipe } from './types';
import RecipeModal from "./components/RecipeModal";


 type Tabs = "search" | "favorites";

const App = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Adicionando o tipo 'Recipe[]'
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [favoriteRecipes, setFavoriteRecipes] = useState<{ id: number; }[]>([]);
  

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    pageNumber.current = 1;

    try {
      const { results } = await searchRecipes(searchTerm, 1);
      setRecipes(results);
    } catch (error) {
      console.error(error);
    }
  };

  const pageNumber = useRef(1);

  const handleViewMoreClick = async () => {
    try {
      const nextPage = pageNumber.current + 1
      const nextRecipes = await searchRecipes(searchTerm, nextPage);
      setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  // {selectedTab === 'search' && (
  //   // search component code...
  // )}
  // {selectedTab === 'favorites' && (
  //   <div>
  //     {favoriteRecipes.map(recipe => (
  //       // Render each favorite recipe card...
  //     ))}
  //   </div>
  // )}

  const addOrRemoveFavoriteRecipe = async (recipe: any) => {
    // Determine a ação com base na existência da receita nos favoritos
    const isRecipeFavorite = favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);

    if (isRecipeFavorite) {
      await removeFavoriteRecipe(recipe);
    } else {
      await addfavoriteRecipe(recipe);
    }

    // Atualiza a lista de receitas favoritas
    const updatedFavoriteRecipes = isRecipeFavorite
      ? favoriteRecipes.filter((favRecipe) => favRecipe.id !== recipe.id)
      : [...favoriteRecipes, recipe];

    setFavoriteRecipes(updatedFavoriteRecipes);
  };


  

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favouriteRecipes = await getFavoriteRecipes();
        setFavoriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteRecipes();
  }, []);


  

  const addfavoriteRecipe = async (recipe: { id: any; }) => {
    try {
      await addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
    
  };

  const removeFavoriteRecipe = async (recipe: { id: any; }) => {
    try {
      await removeFavoriteRecipe(recipe);
      const updatedRecipes = favoriteRecipes.filter(
        (favRecipe) => favRecipe.id !== recipe.id
      );
      setFavoriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="app-container">
      <div className="header">
        <img src="/hero-image.jpg"></img>
        <div className="title">My Recipe App</div>
      </div>
      <div className="tabs">
        <h1 onClick={() => setSelectedTab("search")}>Recipe Search</h1>
        <h1 onClick={() => setSelectedTab("favorites")}>Favorites</h1>
      </div>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="view-more-button">Search
            <AiOutlineSearch size={40} /></button>

        </form>


        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onCardClick={() => handleCardClick(recipe)}
              //onFavoriteButtonClick={addfavoriteRecipe}
              onFavoriteButtonClick={addOrRemoveFavoriteRecipe}
              isFavorite={favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id)}
              
            />
          ))}

          {selectedRecipe && (
            <RecipeModal
              recipeId={selectedRecipe.id.toString()}
              onClose={() => setSelectedRecipe(undefined)}
            />
          )}

          <button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
        </div>
      </div>
    </div>
  );
};

export default App;

