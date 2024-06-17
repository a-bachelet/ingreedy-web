import FridgeService, { FridgeIngredient } from "@/services/fridgeService";
import { useEffect, useState } from "react";

export function useFridgeIngredientList(): [
  FridgeIngredient[],
  (fridgeIngredient: FridgeIngredient) => void,
  (fridgeIngredient: FridgeIngredient) => void,
  (fridgeIngredient: FridgeIngredient) => void,
  boolean,
  boolean,
  string
] {
  const [fridgeIngredients, setFridgeIngredients] = useState<FridgeIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('')


  const addIngredientToFridge = (fridgeIngredient: FridgeIngredient) => {
    setIsLoading(true);

    FridgeService
      .addIngredient(fridgeIngredient.ingredient_id, fridgeIngredient.quantity, fridgeIngredient.unit_id)
      .then((data) => setFridgeIngredients([...fridgeIngredients, data.fridge_ingredient]))
      .catch(error => {
        setIsError(true);
        setError(error.toString())
      })
      .finally(() => setIsLoading(false))
  }

  const updateFridgeIngredient = (fridgeIngredient: FridgeIngredient) => {
    setIsLoading(true);

    FridgeService
      .updateIngredient(fridgeIngredient.ingredient_id, fridgeIngredient.quantity, fridgeIngredient.unit_id)
      .then((data) => setFridgeIngredients([...fridgeIngredients.filter(fring => fring.ingredient_id != fridgeIngredient.ingredient_id), data.fridge_ingredient]))
      .catch(error => {
        setIsError(true);
        setError(error.toString())
      })
      .finally(() => setIsLoading(false))
  }

  const removeIngredientFromFridge = (fridgeIngredient: FridgeIngredient) => {
    setIsLoading(true);

    FridgeService
      .removeIngredient(fridgeIngredient.ingredient_id)
      .then(() => setFridgeIngredients([...fridgeIngredients.filter(fring => fring.ingredient_id != fridgeIngredient.ingredient_id)]))
      .catch()
      .finally(() => setIsLoading(false))
  }

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

  return [
    fridgeIngredients,
    addIngredientToFridge,
    updateFridgeIngredient,
    removeIngredientFromFridge,
    isLoading,
    isError,
    error
  ]
}