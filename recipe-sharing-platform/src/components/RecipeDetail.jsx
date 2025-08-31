import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setRecipe(found);
      })
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  if (!recipe) {
    return <p className="text-center text-gray-600 mt-10">Loading recipe...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-block mb-6 text-blue-500 hover:underline"
      >
        Back to Recipes
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-700 text-lg mb-6">{recipe.summary}</p>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Ingredient 1</li>
                <li>Ingredient 2</li>
                <li>Ingredient 3</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Instructions</h2>
              <p className="text-gray-600 mt-2">
                Step 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />
                Step 2: Donec vehicula urna non neque ultricies, nec hendrerit
                sapien feugiat.
                <br />
                Step 3: Serve and enjoy!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
