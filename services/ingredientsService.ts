export interface Ingredient {
  id: number;
  names: string;
}

export interface IngredientList {
  ingredients: Ingredient[];
  pagination : {
    count: number;
    total_count: number;
    page: number;
    prev_page: number;
    next_page: number;
  }
}

export default class IngredientsService {
  public static listIngredients(page: number = 1): Promise<IngredientList> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = new URLSearchParams({ page: page.toString() })
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients?${params.toString()}`);

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

  public static searchIngredients(search: string = '', page: number = 1): Promise<IngredientList> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = new URLSearchParams({ search, page: page.toString() })
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients/search?${params.toString()}`);

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