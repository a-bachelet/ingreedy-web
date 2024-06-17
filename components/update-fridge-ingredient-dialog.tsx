import { FridgeIngredient } from "@/services/fridgeService";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBody, DialogHeader, Select, Option, Input, DialogFooter, Button } from "@material-tailwind/react";

export default function UpdateFridgeIngredientDialog(
  { open, setOpen, updateIngredient, fridgeIngredient }:
  {
    open: boolean,
    setOpen: (open: boolean) => void,
    updateIngredient: (fridgeIngredient: FridgeIngredient) => void,
    fridgeIngredient: FridgeIngredient
  }
) {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog size="xs" open={open} handler={handleOpen}>
      <DialogHeader>
        Éditer un ingrédient
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col items-center justify-center gap-4">
          <Select label="Ingrédient">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>

          <Input variant="outlined" label="Quantité"/>

          <Select label="Unité">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => { updateIngredient(
            {
              ingredient_id: fridgeIngredient.ingredient_id, quantity: fridgeIngredient.quantity + 1, unit_id: fridgeIngredient.unit_id
            } as FridgeIngredient); setOpen(false) }
          } variant="gradient" className="flex items-center justify-center gap-3" size="sm">
          <PencilIcon strokeWidth={2} className="h-4 w-4" /> Éditer
        </Button>
      </DialogFooter>
      
    </Dialog>
  );
}