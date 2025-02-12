import React from "react";


const SearchBar = ({ query, setQuery, recipes, setSelectedRecipe }) => {
  return (
    <>
    <h1 className="text-center mt-5 fw-bold">Recipe Details</h1>
    <div className="search-bar">
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      {recipes.length > 0 && (
        <ul className="suggestions">
          {recipes.map((recipe) => (
            <li key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
              {recipe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default SearchBar;