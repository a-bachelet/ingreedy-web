import { Recipe } from "@/services/recipesService";
import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Nom", "Note", "Budget", "Difficulté", "Image", "Temps", "Astuce"];

export default function RecipesTable({ recipes }: { recipes: Recipe[]; }) {
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
          {recipes.map( ({ id, name, rate, budget, difficulty, image_url, author, times }, index) => {
              const isLast = index === recipes.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {rate}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {budget}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {difficulty}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                    <img
                      className="rounded-lg object-cover object-center"
                      src={image_url}
                      alt=""
                    />
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {JSON.stringify(times)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal break-all">
                      {author.tip}
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
