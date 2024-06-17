'use client'

import RecipesService from "@/services/recipesService";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Recipes() {
  useEffect(() => {
    RecipesService.listRecipes().then(data => console.log(data))
    RecipesService.searchRecipes('poire').then(data => console.log(data))
  })

  return (
    <Button>
      Hello world Recipes !
    </Button>
  );
}
