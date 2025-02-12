import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import RecipeDetails from "./RecipeDetails";


const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  let debounceTimer;

  useEffect(() => {
    if (!query) {
      setRecipes([]);
      return;
    }
    setLoading(true);
    debounceTimer = setTimeout(() => {
      fetch(`https://dummyjson.com/recipes/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data.recipes || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="app-container">
     
      <SearchBar query={query} setQuery={setQuery} recipes={recipes} setSelectedRecipe={setSelectedRecipe} />
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
      {loading && <p></p>}
      {!loading && query && recipes.length === 0 && <p>No recipes found.</p>}
    </div>
  );
};

export default App;