import React from "react";
import { IoStarSharp } from "react-icons/io5";


const RecipeDetails = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="img-container">
        <img src={recipe.image} alt="recipe-image" className="recipe-image" />
      </div>
      
      <div className="details-container">
      <h2 className="title">{recipe.name}</h2>
        <div className="details">
        <span className="fw-bold">Ingredients:</span>
          <ul className="ingredients">
            
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
         
          <p className="instructions"><span className="fw-bold">Instructions:</span>{recipe.instructions}</p>
          <p className="preptime"><span className="fw-bold">Prepration Time:</span> {recipe.prepTimeMinutes} minutes</p>
          <p className="cooktime"><span className="fw-bold">Cooking Time:</span> {recipe.cookTimeMinutes} minutes</p>
        </div>
        <div className="additional-info">
          <p className="servings"><span className="fw-bold"> No of Servings: </span>  {recipe.servings}</p>
          <p className="calories"><span className="fw-bold">Calories per Serving: </span> {recipe.caloriesPerServing}</p>
          <div className="rating">
          <span className="fw-bold">Rating: </span> {'⭐'.repeat(Math.round(recipe.rating))}{'⭐'.repeat(5 - Math.round(recipe.rating))}
          </div>
          <p className="review"><span className="fw-bold">Reviews: </span>{recipe.reviewCount}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;