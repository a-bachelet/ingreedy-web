export enum RecipeBudget {
  cheap = 'cheap',
  affordable = 'affordable',
  medium = 'medium',
  high = 'high',
  very_high = 'very_high',
  luxurious = 'luxurious'
}

export enum RecipeDifficulty {
  very_easy = 'very_easy',
  easy = 'easy',
  medium = 'medium',
  difficult = 'difficult'
}

export interface RecipeAuthor {
  name: string;
  tip: string;
}

export interface RecipeTimes {
  preparation: number;
  cooking: number;
  total: number;
}

export interface RecipeIngredient {
  names: { singular: string; plural: string };
  quantity: number;
  unit_names: { singular: string; plural: string };
}

export interface Recipe {
  id: number;
  name: string;
  rate: number;
  budget: RecipeBudget;
  people_quantity: number;
  difficulty: RecipeDifficulty;
  image_url: string;
  author: RecipeAuthor;
  times: RecipeTimes;
}

export interface RecipeList {
  recipes: Recipe[];
  pagination : {
    count: number;
    total_count: number;
    page: number;
    prev_page: number;
    next_page: number;
  }
}

export interface RecipeSuggestionIngredient {
  id: number;
  unit_id: number;
  quantity: number;
}

export interface RecipeSuggestionRecipe {
  id: number;
  name: string;
  score: number;
  perfect: boolean
}

export interface RecipeSuggestion {
  suggestion: {
    id: number;
    ingredients: RecipeSuggestionIngredient[];
    recipes: RecipeSuggestionRecipe[];
  }
}

export default class RecipesService {
  public static listRecipes(page: number = 1): Promise<RecipeList> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = new URLSearchParams({ page: page.toString() })
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes?${params.toString()}`);

        if (!response.ok) {
          console.error(`Error ${response.status}`)
          reject(`Error ${response.status}`)
        }

        const data = await response.json()

        resolve(data)
      } catch(error) {
        console.error(error);
        reject(error)
      }
    });
  }

  public static searchRecipes(search: string = '', page: number = 1): Promise<RecipeList> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = new URLSearchParams({ search, page: page.toString() })
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/search?${params.toString()}`);

        if (!response.ok) {
          console.error(`Error ${response.status}`)
          reject(`Error ${response.status}`)
        }

        const data = await response.json()

        resolve(data)
      } catch(error) {
        console.error(error);
        reject(error)
      }
    });
  }

  public static suggestRecipes(perfectMatchOnly: boolean = false): Promise<RecipeSuggestion> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/suggest`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({suggestion: { perfect_match_only: perfectMatchOnly }})
        });

        if (!response.ok) {
          console.error(`Error ${response.status}`)
          reject(`Error ${response.status}`)
        }

        const data = await response.json()

        resolve(data)
      } catch(error) {
        console.error(error);
        reject(error)
      }
    });
  }
}
