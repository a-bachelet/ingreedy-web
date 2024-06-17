'use client'

import { useRecipeList } from "@/hooks/useRecipes";
import RecipesService from "@/services/recipesService";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Recipes() {
  const [recipes, isLoading, isError, error, hasPrevPage, hasNextPage, loadPrevPage, loadNextPage] = useRecipeList();

  return (
    <>
      { isLoading && 'Chargement en cours...' }
      { isError && <p className="text-red">{error}</p> }
      { recipes.map(rec => <div key={rec.id}>{rec.name}</div>) }
      { hasPrevPage && <Button onClick={loadPrevPage}>
        Page Précédente
      </Button> }
      { hasNextPage && <Button onClick={loadNextPage}>
        Page Suivante
      </Button> }
    </>
  );
}
