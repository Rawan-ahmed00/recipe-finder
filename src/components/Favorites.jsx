function Favorites({ favorites, onRemoveFavorite }) {
  return (
    <section className="favorites-section" id="favorites">

      <h2>My Favorites ❤️</h2>

      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="favorites-container">

          {favorites.map((recipe) => (
            <div className="favorite-card" key={recipe.id}>

              <img
                src={recipe.image}
                alt={recipe.name}
              />

              <div className="favorite-info">

                <h3>{recipe.name}</h3>

                <p>{recipe.category}</p>

                <span>⏱️ {recipe.time}</span>

                <button
                  onClick={() => onRemoveFavorite(recipe.id)}
                >
                  Remove ❤️
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default Favorites;