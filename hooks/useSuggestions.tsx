import RecipesService, { RecipeSuggestion, RecipeSuggestionRecipe } from "@/services/recipesService";
import { useEffect, useState } from "react";

export default function useSuggestions(providedPerfectMatchOnly: boolean): [
  perfectMatchOnly: boolean,
  setPerfectMatchOnly: (providedPerfectMatchOnly: boolean) => void,
  suggestions: RecipeSuggestionRecipe[],
  isLoading: boolean,
  isError: boolean,
  error: string
] {
  const [perfectMatchOnly, setPerfectMatchOnly] = useState(providedPerfectMatchOnly);
  const [suggestions, setSuggestions] = useState<RecipeSuggestionRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError('');

    RecipesService
      .suggestRecipes(perfectMatchOnly)
      .then(data => { setSuggestions(data.suggestion.recipes) })
      .catch(error => { setIsError(true); setError(error.toString()) })
      .finally(() => setIsLoading(false))
  }, [perfectMatchOnly])

  return [perfectMatchOnly, setPerfectMatchOnly, suggestions, isLoading, isError, error];
}