// import "./App.css";
// import RecipeCard from "./components/RecipeCard";
// import { AiOutlineSearch } from "react-icons/ai";
// import { useRef, useState, FormEvent, useEffect } from "react";
// import { searchRecipes, getFavoriteRecipes, addFavoriteRecipe, removeFavoriteRecipe } from "./API";
// import { Recipe } from './types';
// import RecipeModal from "./components/RecipeModal";


//  type Tabs = "search" | "favorites";

// const App = () => {
//   const [selectedTab, setSelectedTab] = useState<Tabs>("search");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [recipes, setRecipes] = useState<Recipe[]>([]); // Adicionando o tipo 'Recipe[]'
//   const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
//   const [favoriteRecipes, setFavoriteRecipes] = useState<{ id: number; }[]>([]);

//   const handleSearchSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     pageNumber.current = 1;

//     try {
//       const { results } = await searchRecipes(searchTerm, 1);
//       setRecipes(results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const pageNumber = useRef(1);

//   const handleViewMoreClick = async () => {
//     try {
//       const nextPage = pageNumber.current + 1
//       const nextRecipes = await searchRecipes(searchTerm, nextPage);
//       setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes.results]);
//       pageNumber.current = nextPage;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCardClick = (recipe: Recipe) => {
//     setSelectedRecipe(recipe);
//   };

//   // {selectedTab === 'search' && (
//   //   // search component code...
//   // )}
//   // {selectedTab === 'favorites' && (
//   //   <div>
//   //     {favoriteRecipes.map(_recipe => (
//   //       // Render each favorite recipe card...
//   //     ))}
//   //   </div>
//   // )}
  

//   useEffect(() => {
//     const fetchFavoriteRecipes = async () => {
//       try {
//         const favouriteRecipes = await getFavoriteRecipes();
//         setFavoriteRecipes(favouriteRecipes.results);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchFavoriteRecipes();
//   }, []);


  

//   const addfavoriteRecipe = async (recipe: { id: any; }) => {
//     try {
//       await addFavoriteRecipe(recipe);
//       setFavoriteRecipes([...favoriteRecipes, recipe]);
//     } catch (error) {
//       console.log(error);
//     }
    
//   };

//   const removeFavoriteRecipe = async (recipe: { id: any; }) => {
//     try {
//       await removeFavoriteRecipe(recipe);
//       const updatedRecipes = favoriteRecipes.filter(
//         (favRecipe) => favRecipe.id !== recipe.id
//       );
//       setFavoriteRecipes(updatedRecipes);
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (

//     <div className="app-container">
//       <div className="header">
//         <img src="/hero-image.jpg"></img>
//         <div className="title">My Recipe App</div>
//       </div>
//       <div className="tabs">
//         <h1 onClick={() => setSelectedTab("search")}>Recipe Search</h1>
//         <h1 onClick={() => setSelectedTab("favorites")}>Favorites</h1>
//       </div>
//       <div>
//         <form onSubmit={handleSearchSubmit}>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" className="view-more-button">Search
//             <AiOutlineSearch size={40} /></button>

//         </form>


//         <div className="recipe-grid">
//           {recipes.map((recipe) => (
//             <RecipeCard
//               key={recipe.id}
//               recipe={recipe}
//               onCardClick={() => handleCardClick(recipe)}
//               onFavoriteButtonClick={addfavoriteRecipe}
//               // onFavoriteButtonClick={isFavorite ? removeFavoriteRecipe : addfavoriteRecipe}
              
//             />
//           ))}

//           {selectedRecipe && (
//             <RecipeModal
//               recipeId={selectedRecipe.id.toString()}
//               onClose={() => setSelectedRecipe(undefined)}
//             />
//           )}

//           <button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import "./App.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import * as api from "./API";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";


type Tabs = "search" | "favourites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavoriteRecipes();
        setFavouriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteRecipes();
  }, []);
  

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavoriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavoriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
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
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        <h1
          className={selectedTab === "favourites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favourites")}
        >
          Favourites
        </h1>
      </div>

      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter a search term ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            ></input>
            <button type="submit">
              <AiOutlineSearch size={40} />
            </button>
          </form>

          <div className="recipe-grid">
          {recipes.map((recipe) => {
            const isFavourite = favouriteRecipes.some(
              (favRecipe) => recipe.id === favRecipe.id
            );

              return (
                <RecipeCard
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onFavouriteButtonClick={
                  isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
                }
                isFavourite={isFavourite}
              />
            );
          })}
          </div>

          <button className="view-more-button" onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}

      {selectedTab === "favourites" && (
        <div className="recipe-grid">
          {favouriteRecipes && favouriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={removeFavouriteRecipe}
              isFavourite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;