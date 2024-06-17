import { FridgeIngredient } from "@/services/fridgeService";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBody, DialogHeader, Select, Option, Input, DialogFooter, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function UpdateFridgeIngredientDialog(
  { open, setOpen, updateIngredient, fridgeIngredient }:
  {
    open: boolean,
    setOpen: (open: boolean) => void,
    updateIngredient: (fridgeIngredient: FridgeIngredient) => void,
    fridgeIngredient: FridgeIngredient
  }
) {
  const [ingredientId, setIngredientId] = useState<number|null>(fridgeIngredient.ingredient_id)
  const [quantity, setQuantity] = useState<number|null>(fridgeIngredient.quantity)
  const [unitId, setUnitId] = useState<number|null>(fridgeIngredient.unit_id)

  useEffect(() => {
    console.log(fridgeIngredient)
    setIngredientId(fridgeIngredient.ingredient_id)
    setQuantity(fridgeIngredient.quantity)
    setUnitId(fridgeIngredient.unit_id)
  }, [fridgeIngredient])

  const handleOpen = () => setOpen(!open);

  return (
    <Dialog size="xs" open={open} handler={handleOpen}>
      <DialogHeader>
        Éditer un ingrédient
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col items-center justify-center gap-4">
          <Select disabled label="Ingrédient (Données en dur)" value={ingredientId?.toString() || ''} onChange={(evt) => setIngredientId(parseInt(evt || ''))}>
            <Option value={fridgeIngredient.ingredient_id?.toString()}>{fridgeIngredient.ingredient_names?.singular}</Option>
            <Option value="182">Poivre moulu</Option>
            <Option value="207">Maïzena</Option>
            <Option value="222">Vinaigre de vin</Option>
            <Option value="348">Ail</Option>
            <Option value="378">Farine</Option>
          </Select>

          <Input variant="outlined" label="Quantité" type="number" value={quantity?.toString() || ''} onChange={(evt) => setQuantity(parseInt(evt.target.value))}/>

          <Select label="Unité (Données en dur)" value={unitId?.toString() || ''} onChange={(evt) => setUnitId(parseInt(evt || ''))}>
            <Option value={fridgeIngredient.unit_id?.toString()}>{fridgeIngredient.unit_names?.singular}</Option>
            <Option value="7">Gramme(s)</Option>
            <Option value="10">Centilitre(s)</Option>
            <Option value="9">Verre(s)</Option>
            <Option value="3">Cuillère(s) à café</Option>
            <Option value="4">Cuillère(s) à soupe</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button 
          onClick={() => {
            updateIngredient({ingredient_id: ingredientId, quantity, unit_id: unitId} as FridgeIngredient);
            setOpen(false)
          }}
          variant="gradient"
          className="flex items-center justify-center gap-3"
          size="sm"
        >
          <PencilIcon strokeWidth={2} className="h-4 w-4" /> Éditer
        </Button>
      </DialogFooter>
      
    </Dialog>
  );
}