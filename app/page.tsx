'use client'

import AddFridgeIngredientDialog from "@/components/add-fridge-ingredient-dialog";
import FridgeIngredientsTable from "@/components/fridge-ingredients-table";
import RecipeSuggestionDialog from "@/components/recipes-suggestion-dialog";
import UpdateFridgeIngredientDialog from "@/components/update-fridge-ingredient-dialog";
import { useFridgeIngredientList } from "@/hooks/useFridge";
import { FridgeIngredient } from "@/services/fridgeService";
import { ArrowPathIcon, DocumentMagnifyingGlassIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react";
import { useRef, useState } from "react";

function HomeHeader({ onAddClick, onSuggestionsClick }: {
  onAddClick: () => void ,
  onSuggestionsClick: () => void 
}) {
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none overflow-visible">
      <div className="mb-8 flex items-start justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Mon frigo
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            By Ingreedy...
          </Typography>
        </div>
        <div className="w-full md:w-72 flex flex-col items-stretch gap-2">
          <Button onClick={onAddClick} className="flex items-center justify-center gap-3" size="sm">
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter un ingrédient
          </Button>
          <Button onClick={onSuggestionsClick} className="flex items-center justify-center gap-3" size="sm">
            <DocumentMagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" /> Suggérrer des recettes
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}

export default function Home() {
  const [fridgeIngredients, addIngredientToFridge, updateFridgeIngredient, removeIngredientFromFridge, isLoading, isError, error] = useFridgeIngredientList();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [sugegstionsDialogOpen, setSuggestionsDialogOpen] = useState(false);

  const updateRef = useRef<FridgeIngredient>({} as FridgeIngredient);

  return (
    <>
      <HomeHeader
        onAddClick={() => setAddDialogOpen(true)}
        onSuggestionsClick={() => setSuggestionsDialogOpen(true)}
      />
      <AddFridgeIngredientDialog open={addDialogOpen} setOpen={setAddDialogOpen} addIngredient={addIngredientToFridge} />
      <UpdateFridgeIngredientDialog fridgeIngredient={updateRef.current} open={updateDialogOpen} setOpen={setUpdateDialogOpen} updateIngredient={updateFridgeIngredient} />
      <RecipeSuggestionDialog open={sugegstionsDialogOpen} setOpen={setSuggestionsDialogOpen} />
      <CardBody className="p-0 px-0 max-h-full h-full overflow-y-auto overflow-x-none">
        <FridgeIngredientsTable fridgeIngredients={fridgeIngredients} updateIngredient={(fridgeIngredient) => {updateRef.current = fridgeIngredient; setUpdateDialogOpen(true)}} removeIngredient={removeIngredientFromFridge} />
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        { isError && error && <Typography variant="small" color="red" className="font-normal">
          Une erreur est survenue.
        </Typography> }
        { isLoading && <div className="flex flex-row gap-2 items-center"><ArrowPathIcon className="h-5 w-5 animate-spin" /> Chargement des ingrédients...</div> }
      </CardFooter>
    </>
  );
}
