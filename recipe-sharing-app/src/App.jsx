import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 rounded-lg shadow-md bg-white text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Recipe Sharing App</h1>
        </div>
        <div className="mb-4">
          <RecipeList />
          <AddRecipeForm />
        </div>
      </div>
    </div>
  );
};

export default App;
