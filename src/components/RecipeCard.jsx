function RecipeCard({ recipe, onClick, onFavorite }) {
  return (
    <div
      className="recipe-card"
      onClick={() => onClick(recipe)}
    >

      <div className="recipe-image">

        <img
          src={recipe.image}
          alt={recipe.name}
        />

      </div>

      <div className="recipe-info">

        <h3>{recipe.name}</h3>

        <p>{recipe.category}</p>

        <span>
          ⏱️ {recipe.time}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(recipe);
          }}
        >
          ❤️
        </button>

      </div>

    </div>
  );
}

export default RecipeCard;