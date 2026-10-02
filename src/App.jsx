import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [error, setError] = useState("");

  // Get recipes and categories
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });

    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again.");
      });
  }, []);

  // Save Favorites in LocalStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Search
  const handleSearch = () => {
    setLoading(true);
    setError("");

    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setSearch(searchTerm);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  // Recipe Details
  const handleRecipeClick = (recipe) => {
    setDetailsLoading(true);
    setSelectedRecipe(null);
    setError("");

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedRecipe(data.meals[0]);
        setDetailsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again.");
        setDetailsLoading(false);
      });
  };

  // Categories
  const handleCategory = (categoryName) => {
    setCategory(categoryName);
    setSearch("");
    setSearchTerm("");
    setLoading(true);
    setError("");

    if (categoryName === "All") {
      fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data.meals || []);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong. Please try again.");
          setLoading(false);
        });

      return;
    }

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const meals = (data.meals || []).map((meal) => ({
          ...meal,
          strCategory: categoryName,
        }));

        setRecipes(meals);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  // Add / Remove Favorite
  const handleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      const alreadyFavorite = prevFavorites.some(
        (favorite) => favorite.id === recipe.id
      );

      if (alreadyFavorite) {
        return prevFavorites.filter(
          (favorite) => favorite.id !== recipe.id
        );
      }

      return [...prevFavorites, recipe];
    });
  };

  // Remove Favorite
  const handleRemoveFavorite = (recipeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (favorite) => favorite.id !== recipeId
      )
    );
  };

  // Filter Recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.strMeal
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || recipe.strCategory === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="hero" id="home">

        <h1>Find Your Favorite Recipe</h1>

        <p>
          Discover delicious recipes and make something amazing today.
        </p>

        {/* Search */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        {/* Categories */}
        <Categories
          categories={categories}
          handleCategory={handleCategory}
        />

      </main>

      {/* Recipes */}
      <section className="recipes-section" id="recipes">

        <h2>Popular Recipes</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="recipes-container">

            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={{
                  id: recipe.idMeal,
                  name: recipe.strMeal,
                  category: recipe.strCategory,
                  time: "30 min",
                  image: recipe.strMealThumb,
                }}
                onClick={handleRecipeClick}
                onFavorite={handleFavorite}
              />
            ))}

          </div>
        )}

      </section>

      {/* Recipe Details Loading */}
      {detailsLoading && (
        <p className="loading">
          Loading recipe details...
        </p>
      )}

      {/* Recipe Details */}
      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onFavorite={handleFavorite}
        />
      )}

      {/* Favorites */}
      <Favorites
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />

    </div>
  );
}

export default App;