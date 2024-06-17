'use client'

import IngredientsTable from "@/components/ingredients-table";
import { useIngredientList } from "@/hooks/useIngredients";
import { MagnifyingGlassIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react";

function IngredientsHeader({ search, setSearch }: { search: string, setSearch: (search: string) => void }) {
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none overflow-visible">
      <div className="mb-8 flex items-start justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Ingrédients
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            By Ingreedy...
          </Typography>
        </div>
        <div className="w-full md:w-72">
          <Input
            label="Rechercher"
            onChange={(event) => setSearch(event.target.value)}
            defaultValue={search}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </CardHeader>
  );
}

export default function Ingredients() {
  const [
    ingredients, search, setSearch, isLoading, isError, error,
    currentPage, lastPage, hasPrevPage, hasNextPage,
    loadPrevPage, loadNextPage
  ] = useIngredientList();

  return (
    <>
      <IngredientsHeader search={search} setSearch={setSearch} />
      <CardBody className="p-0 px-0 max-h-full h-full overflow-y-auto overflow-x-none">
        <IngredientsTable ingredients={ingredients} />
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} sur {lastPage}
        </Typography>
        { isError && error && <Typography variant="small" color="red" className="font-normal">
          Une erreur est survenue.
        </Typography> }
        { isLoading && <div className="flex flex-row gap-2 items-center"><ArrowPathIcon className="h-5 w-5 animate-spin" /> Chargement des ingrédients...</div> }
        <div className="flex gap-2">
          <Button disabled={isLoading || !hasPrevPage} onClick={loadPrevPage} variant="outlined" size="sm">
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>

          <Button disabled={isLoading || !hasNextPage} onClick={loadNextPage} variant="outlined" size="sm">
          <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
