import { FridgeIngredient } from "@/services/fridgeService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Ingrédient", "Quantité", "Unité", ""];

export default function FridgeIngredientsTable({ fridgeIngredients, removeIngredient, updateIngredient }: {
  fridgeIngredients: FridgeIngredient[];
  removeIngredient: (fridgeIngredient: FridgeIngredient) => void,
  updateIngredient: (fridgeIngredient: FridgeIngredient) => void
}) {
  return (
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
        {fridgeIngredients.map( ({ ingredient_id, ingredient_names, quantity, unit_id, unit_names }, index) => {
            const isLast = index === fridgeIngredients.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            const ingredient_name = typeof ingredient_names === 'string' ? ingredient_names : ingredient_names?.singular
            
            const unit_singular_name = typeof unit_names === 'string' ? unit_names : unit_names?.singular
            const unit_plural_name = typeof unit_names === 'string' ? unit_names : unit_names?.plural

            const unit_name = unit_plural_name ? (quantity && quantity > 1 ? unit_plural_name : unit_singular_name) : unit_singular_name

            return (
              <tr key={ingredient_id}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal break-all">
                    {ingredient_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal break-all">
                    {quantity}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal break-all">
                    {unit_name}
                  </Typography>
                </td>
                <td className={`${classes} flex flex-row items-center justify-start gap-2`}>
                <Button onClick={() => updateIngredient({ ingredient_id, quantity, unit_id } as FridgeIngredient)} color="orange" className="flex items-center justify-center gap-3" size="sm">
                    <PencilIcon strokeWidth={2} className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => removeIngredient({ ingredient_id } as FridgeIngredient)} color="red" className="flex items-center justify-center gap-3" size="sm">
                    <TrashIcon strokeWidth={2} className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
}
