
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Recipe } from "../types";
import "../App.css";
import { removeFavoriteRecipe, addFavoriteRecipe } from "../API";

interface Props {
  recipe: Recipe;
  onCardClick: () => void; // Adicione esta prop para lidar com o clique no card
  onFavoriteButtonClick: (recipe: Recipe) => Promise<void>;
  isFavorite:any;
}

  const RecipeCard: React.FC<Props> = ({recipe, onCardClick, onFavoriteButtonClick, isFavorite  }) => {
  const handleFavoriteClick = () => {
     // event.stopPropagation(); // Para evitar que o clique se propague para o elemento pai
      // onFavoriteButtonClick(recipe);
      const action = isFavorite ? removeFavoriteRecipe : addFavoriteRecipe;
      onFavoriteButtonClick(recipe, action);
    };
        
  return (
<div className="recipe-card" onClick={onCardClick}>
<img src={recipe.image} alt={recipe.title} />
<div className="recipe-card-title">
  <span onClick={handleFavoriteClick}>  
  {
  isFavorite ? (
    <AiFillHeart size={25} color="red" />
  ) : (
    <AiOutlineHeart size={25} />
  )
}
  </span>
  <h3>{recipe.title}</h3>
</div>
</div>
  );
};

export default RecipeCard;
