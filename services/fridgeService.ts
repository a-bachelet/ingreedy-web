export interface FridgeIngredient {
  ingredient_id: number;
  quantity: number;
  unit_id: number;
  ingredient_names: { singular: string; plural: string; };
  unit_names: { singular: string; plural: string; };
}

export interface FridgeIngredientList {
  ingredients: FridgeIngredient[]
}

export default class FridgeService {
  public static listIngredients(): Promise<FridgeIngredientList> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fridge`);

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

  public static addIngredient(id: number, quantity: number, unit_id: number|null): Promise<{ fridge_ingredient: FridgeIngredient }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fridge/add_ingredient`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ingredient: { id, quantity, unit_id }})
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

  public static updateIngredient(id: number, quantity: number, unit_id: number): Promise<{ fridge_ingredient: FridgeIngredient }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fridge/update_ingredient`, {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ingredient: { id, quantity, unit_id }})
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

  public static removeIngredient(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fridge/remove_ingredient`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ingredient: { id }})
        });

        if (!response.ok) {
          console.error(`Error ${response.status}`)
          reject(`Error ${response.status}`)
        }

        resolve()
      } catch(error) {
        console.error(error);
        reject(error)
      }
    });
  }
}
