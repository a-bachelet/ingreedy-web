import { FridgeIngredient } from "@/services/fridgeService";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBody, DialogHeader, Select, Option, Input, DialogFooter, Button } from "@material-tailwind/react";

export default function AddFridgeIngredientDialog(
  { open, setOpen, addIngredient }:
  {
    open: boolean,
    setOpen: (open: boolean) => void,
    addIngredient: (fridgeIngredient: FridgeIngredient) => void
  }
) {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog size="xs" open={open} handler={handleOpen}>
      <DialogHeader>
        Ajouter un ingrédient
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
        <Button onClick={() => { addIngredient({ingredient_id: 365, quantity: 980, unit_id: 23} as FridgeIngredient); setOpen(false) }} variant="gradient" className="flex items-center justify-center gap-3" size="sm">
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter
        </Button>
      </DialogFooter>
      
    </Dialog>
  );
}