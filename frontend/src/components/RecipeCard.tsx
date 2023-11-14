// import { AiOutlineHeart } from "react-icons/ai";
// import { Recipe } from "../types";
// import "../App.css";

// interface Props {
//   recipe: Recipe;
//   onCardClick: () => void; // Adicione esta prop para lidar com o clique no card
//   onFavoriteButtonClick: (recipe: Recipe) => Promise<void>;
// }

//   const RecipeCard: React.FC<Props> = ({recipe, onCardClick, onFavoriteButtonClick }) => {
//   const handleFavoriteClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
//       event.stopPropagation(); // Para evitar que o clique se propague para o elemento pai
//       onFavoriteButtonClick(recipe);
//     };
    

    
//   return (
// <div className="recipe-card" onClick={onCardClick}>
// <img src={recipe.image} alt={recipe.title} />
// <div className="recipe-card-title">
//   <span onClick={handleFavoriteClick}>  
//     <AiOutlineHeart size={25} />
//   </span>
//   <h3>{recipe.title}</h3>
// </div>
// </div>
//   );
// };

// export default RecipeCard;
import { Recipe } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  recipe: Recipe;
  isFavourite: boolean;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick,
  isFavourite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image}></img>
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
        >
          {isFavourite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;