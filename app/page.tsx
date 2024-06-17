'use client'

import { useFridgeIngredientList } from "@/hooks/useFridge";
import FridgeService from "@/services/fridgeService";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Home() {
  const [fridgeIngredients, isLoading, isError, error] = useFridgeIngredientList();

  return (
    <>
      { isLoading && 'Chargement en cours...' }
      { isError && <p className="text-red">{error}</p> }
      { fridgeIngredients.map(ing => <div key={ing.ingredient_id}>
        {ing.ingredient_id} || {JSON.stringify(ing.ingredient_names)} || {ing.quantity}
      </div>) }
    </>
  );
}
