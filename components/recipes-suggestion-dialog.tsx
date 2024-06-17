'use client';

import useSuggestions from "@/hooks/useSuggestions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Switch } from "@material-tailwind/react";
import RecipesSuggestionTable from "./recipes-suggestion-table";

interface RecipesSuggestionLoaderProps {
  isLoading: boolean;
  isError: boolean;
  error: string;
}

function RecipesSuggestionLoader({ isLoading, isError, error }: RecipesSuggestionLoaderProps) {
  return (
    <>
      {
        isLoading && !isError && <div className="flex items-center justify-center gap-4">
          <Typography variant="h6">Recherche de recettes compatibles...</Typography>
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
        </div>
      }
      {
        isError && <div className="flex flex-col items-center justify-center gap-4">
          <Typography variant="h6" color="red">Une erreur est survenue...</Typography>
          {error && <Typography variant="h6" color="red">{error}</Typography>}
        </div>
      }
    </>
  )
}

interface RecipesSuggestionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void
}

export default function RecipeSuggestionDialog({ open, setOpen }: RecipesSuggestionDialogProps) {
  if (open) {
    const handleOpen = () => setOpen(!open);

    const [perfectMatchOnly, setPerfectMatchOnly, suggestions, isLoading, isError, error] = useSuggestions(false);
  
    return (
      <Dialog size="lg" open={open} handler={handleOpen} className="h-[calc(100%-4rem)] overflow-auto">
        <DialogBody className="m-4">
          <div className="flex flex-row items-center justify-between mb-4">
            <Switch label="Tous les ingrédients" onChange={() => setPerfectMatchOnly(!perfectMatchOnly)} checked={perfectMatchOnly} />
            <RecipesSuggestionLoader isLoading={isLoading} isError={isError} error={error} />
          </div>
          <div className="h-full w-full">
            { !isError && <RecipesSuggestionTable suggestions={suggestions} /> }
          </div>
        </DialogBody> 
      </Dialog>  
    );
  } else {
    return <></>
  }
}