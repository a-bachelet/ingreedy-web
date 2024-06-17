'use client'

import IngredientsService from "@/services/ingredientsService";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Ingredients() {
  useEffect(() => {
    IngredientsService.listIngredients().then(data => console.log(data))
    IngredientsService.searchIngredients('poire').then(data => console.log(data))
  })

  return (
    <Button>
      Hello world Ingredients !
    </Button>
  );
}
