import FridgeService, { FridgeIngredient } from "@/services/fridgeService";
import { useEffect, useState } from "react";

export function useFridgeIngredientList(): [FridgeIngredient[], boolean, boolean, string] {
  const [fridgeIngredients, setFridgeIngredients] = useState<FridgeIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('')


  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    FridgeService
      .listIngredients()
      .then(data => {
        setFridgeIngredients(data.ingredients)
      })
      .catch(error => {
        setFridgeIngredients([])
        setIsError(true)
        setError(error.toString())
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return [fridgeIngredients, isLoading, isError, error]
}