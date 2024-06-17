'use client'

import { useIngredientList } from "@/hooks/useIngredients";
import { Button } from "@material-tailwind/react";

export default function Ingredients() {
  const [ingredients, isLoading, isError, error, hasPrevPage, hasNextPage, loadPrevPage, loadNextPage] = useIngredientList();

  return (
    <>
      { isLoading && 'Chargement en cours...' }
      { isError && <p className="text-red">{error}</p> }
      { ingredients.map(ing => <div key={ing.id}>{ing.id}</div>) }
      { hasPrevPage && <Button onClick={loadPrevPage}>
        Page Précédente
      </Button> }
      { hasNextPage && <Button onClick={loadNextPage}>
        Page Suivante
      </Button> }
    </>
  );
}
