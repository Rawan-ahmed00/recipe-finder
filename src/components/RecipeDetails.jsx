function RecipeDetails({ recipe, onClose, onFavorite }) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure,
      });
    }
  }

  return (
    <section className="recipe-details">

      <button
        className="close-button"
        onClick={onClose}
      >
        ❌
      </button>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <h2>{recipe.strMeal}</h2>

      <p>Category: {recipe.strCategory}</p>

      <p>Area: {recipe.strArea}</p>

      <button
        className="details-favorite-button"
        onClick={() => onFavorite(recipe)}
      >
        ❤️ Add to Favorites
      </button>

      <h3>Ingredients</h3>

      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.measure} {item.ingredient}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>

      <p className="instructions">
        {recipe.strInstructions}
      </p>

    </section>
  );
}

export default RecipeDetails;