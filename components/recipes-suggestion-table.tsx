import { RecipeSuggestionRecipe } from "@/services/recipesService";
import { NoSymbolIcon, StarIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Nom", "Score", "Tous les ingrédients"];

export default function RecipesSuggestionTable({ suggestions }: { suggestions: RecipeSuggestionRecipe[]; }) {
    return (
      <div className="flex flex-col items-center justify-stretch">
        <table className="w-full min-w-max table-fixed text-left">
          <thead className="sticky top-0 left-0 right-0">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {suggestions.map( ({ id, name, score, perfect }, index) => {
                const isLast = index === suggestions.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal break-all">
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal break-all">
                        {score}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal break-all">
                        {perfect ? <StarIcon color="yellow" className="h-5 w-5" /> : <NoSymbolIcon color="red" className="h-5 w-5" />}
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>

        { suggestions.length === 0 && <Typography variant="h6">Aucune recette compatible...</Typography> }
      </div>
    );
}
