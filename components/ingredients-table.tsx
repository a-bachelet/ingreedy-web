import { Ingredient } from "@/services/ingredientsService";
import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Nom singulier", "Nom pluriel"];

export default function IngredientsTable({ ingredients }: { ingredients: Ingredient[]; }) {
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
          {ingredients.map( ({ id, names }, index) => {
              const isLast = index === ingredients.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              const singularName = typeof names === 'string' ? (names ||  '*Inconnu*') : (names.singular || '*Inconnu*')
              const pluralName = typeof names === 'string' ? '*Inconnu*' : (names.plural || '*Inconnu*')

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {singularName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {pluralName}
                    </Typography>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    );
}
