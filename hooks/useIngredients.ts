import IngredientsService, { Ingredient } from "@/services/ingredientsService";
import { useEffect, useState } from "react";

export function useIngredientList(): [
  Ingredient[], boolean, boolean, string, boolean, boolean,
  () => void, () => void
] {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [prevPage, setPrevPage] = useState<number | null>(null)
  const [nextPage, setNextPage] = useState<number | null>(null)
  const [hasPrevPage, setHasPrevPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)

  const loadPrevPage = () => {
    if (prevPage) {
      setCurrentPage(prevPage)
    }
  }

  const loadNextPage = () => {
    if (nextPage) {
      setCurrentPage(nextPage)
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    IngredientsService
      .listIngredients(currentPage)
      .then(data => {
        setIngredients(data.ingredients)
        setPrevPage(data.pagination.prev_page)
        setNextPage(data.pagination.next_page)
      })
      .catch(error => {
        setIngredients([])
        setIsError(true)
        setError(error.toString())
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [currentPage])

  useEffect(() => setHasPrevPage(!!prevPage), [prevPage])
  useEffect(() => setHasNextPage(!!nextPage), [nextPage])

  return [
    ingredients, isLoading, isError, error, hasPrevPage, hasNextPage,
    loadPrevPage, loadNextPage
  ]
}

export function useIngredientSearch() {}