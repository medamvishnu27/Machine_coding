# Recipe Finder Documentation

## Introduction
The Recipe Finder is a React-based web application that allows users to search for recipes and view detailed information about them. This documentation provides a comprehensive guide to the project's structure, implementation, and usage.

## Project Summary
The Recipe Finder application is built using:
- React.js for the frontend
- Vite as the build tool
- Bootstrap for styling
- React Icons for visual elements

Key features include:
- Search functionality with auto-suggestions
- Recipe details display
- Responsive design
- Background image for visual appeal

## Project Aim
The main objectives of this project are:
1. To create an intuitive interface for recipe searching
2. To demonstrate React component-based architecture
3. To implement efficient state management
4. To showcase modern web development practices

## Project Structure
```bash
RecipeFinder/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and icons
│   ├── App.jsx          # Main application component
│   ├── SearchBar.jsx    # Search functionality
│   ├── RecipeDetails.jsx # Recipe display component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## Implementation with Code Explanations

### 1. Main Application (App.jsx)
```jsx
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import RecipeDetails from "./RecipeDetails";

const App = () => {
  // State management for search query and recipes
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch recipes when query changes
  useEffect(() => {
    if (query) {
      fetchRecipes(query);
    }
  }, [query]);

  // Main component structure
  return (
    <div className="container">
      <SearchBar 
        query={query}
        setQuery={setQuery}
        recipes={recipes}
        setSelectedRecipe={setSelectedRecipe}
      />
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
    </div>
  );
};
```
**Explanation:**
- Uses React hooks (useState, useEffect) for state management
- Manages three main states: search query, recipes list, and selected recipe
- useEffect hook triggers recipe fetching when query changes
- Renders SearchBar and RecipeDetails components conditionally

### 2. Search Component (SearchBar.jsx)
```jsx
import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ query, setQuery, recipes, setSelectedRecipe }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setDropdownOpen(true);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search recipes..."
      />
      {isDropdownOpen && recipes.length > 0 && (
        <div className="dropdown">
          {recipes.map(recipe => (
            <div key={recipe.id} onClick={() => {
              setSelectedRecipe(recipe);
              setDropdownOpen(false);
            }}>
              {recipe.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```
**Explanation:**
- Receives props from parent component for state management
- Manages dropdown visibility state
- Handles input changes and updates query state
- Renders dropdown with recipe suggestions
- Implements recipe selection functionality

### 3. Recipe Details Component (RecipeDetails.jsx)
```jsx
import React from "react";
import { IoStarSharp } from "react-icons/io5";

const RecipeDetails = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="img-container">
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <div className="recipe-info">
        <h2>{recipe.name}</h2>
        <p>{recipe.description}</p>
        <div className="rating">
          {[...Array(recipe.rating)].map((_, i) => (
            <IoStarSharp key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
```
**Explanation:**
- Receives selected recipe as prop
- Displays recipe image, name, description, and rating
- Uses React Icons for star rating display
- Implements responsive card layout

## Expected Output
![Recipe Finder Screenshot](public/vite.svg)
1. Search bar with dropdown suggestions
2. Recipe cards with detailed information
3. Responsive layout for different screen sizes

## Conclusion
The Recipe Finder application demonstrates modern web development practices using React and Vite. It showcases component-based architecture, state management, and responsive design. This project serves as a foundation for building more complex recipe-related applications.
