import create from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),
  // ... other actions
}));
