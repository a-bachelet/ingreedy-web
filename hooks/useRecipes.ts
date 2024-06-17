import RecipesService, { Recipe } from "@/services/recipesService";
import { useEffect, useRef, useState } from "react";

export function useRecipeList(): [
  Recipe[], string, (search: string) => void, boolean, boolean, string,
  number, number, boolean, boolean, () => void, () => void
] {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [prevPage, setPrevPage] = useState<number | null>(null)
  const [nextPage, setNextPage] = useState<number | null>(null)
  const [hasPrevPage, setHasPrevPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)

  const searchRef = useRef(search)

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
    const newSearch = searchRef.current === '' && search != ''
    const newList = searchRef.current != '' && search === ''

    searchRef.current = search

    if (newSearch || newList) {
      setRecipes([])
      setCurrentPage(1)
      setPrevPage(null)
      setNextPage(null)
    }

    const dataFunc = search ?
      RecipesService.searchRecipes(search, newSearch || newList ? 1 : currentPage) :
      RecipesService.listRecipes(newSearch || newList ? 1 : currentPage)
  
    setIsLoading(true);
    setIsError(false);
    setError('');
    
    dataFunc
      .then(data => {
        setRecipes(data.recipes)
        setLastPage(Math.ceil(data.pagination.total_count / data.pagination.count))
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
  }, [currentPage, search])

  useEffect(() => setHasPrevPage(!!prevPage), [prevPage])
  useEffect(() => setHasNextPage(!!nextPage), [nextPage])

  return [
    recipes, search, setSearch, isLoading, isError, error,
    currentPage, lastPage, hasPrevPage, hasNextPage,
    loadPrevPage, loadNextPage
  ]
}