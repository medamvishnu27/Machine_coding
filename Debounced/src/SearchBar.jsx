import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ query, setQuery, recipes, setSelectedRecipe }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setQuery(recipe.name); // Optionally set the query to the selected recipe name
    setDropdownOpen(false);
  };

  return (
    <>
      <h1 className="text-center mt-5 fw-bold">Recipe Details</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setDropdownOpen(e.target.value.length > 0); // Open dropdown if there's a query
          }}
          placeholder="Search for recipes..."
        />
        {isDropdownOpen && recipes.length > 0 && (
          <ul className="suggestions" ref={dropdownRef}>
            {recipes.map((recipe) => (
              <li key={recipe.id} onClick={() => handleRecipeSelect(recipe)}>
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