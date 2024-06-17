import RecipesService, { Recipe } from "@/services/recipesService";
import { useEffect, useState } from "react";

export function useRecipeList(): [
  Recipe[], boolean, boolean, string, boolean, boolean,
  () => void, () => void
] {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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
    RecipesService
      .listRecipes(currentPage)
      .then(data => {
        setRecipes(data.recipes)
        setPrevPage(data.pagination.prev_page)
        setNextPage(data.pagination.next_page)
      })
      .catch(error => {
        setRecipes([])
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
    recipes, isLoading, isError, error, hasPrevPage, hasNextPage,
    loadPrevPage, loadNextPage
  ]
}

export function useRecipeSearch() {}