import { useState } from "react";
import { useRecipeStore } from "../recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (!title || !ingredients || !instructions) {
      setErrors("All fields are required!");
      return;
    }

    const ingredientsArray = ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);

    const instructionsArray = instructions
      .split("\n")
      .map((steps) => steps.trim())
      .filter((steps) => steps);

    if (ingredientsArray.length < 2) {
      setErrors("Please provide at least two ingredients.");
      return;
    }

    // Add new recipe
    addRecipe({
      id: Date.now(), // unique ID
      title,
      summary: `A new recipe: ${title}`, 
      image: "https://source.unsplash.com/400x300/?food",
      ingredients: ingredientsArray,
      instructions: instructionsArray,
    });

    // Reset form
    setTitle("");
    setIngredients("");
    setInstructions("");
    setErrors("");
    alert("Recipe added successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Recipe</h2>

      {errors && (
        <p className="text-red-500 text-sm mb-4 text-center">{errors}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">
            Recipe Title
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium">
            Ingredients (one per line)
          </label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700 font-medium">
            Instructions (one step per line)
          </label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            rows="4"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
