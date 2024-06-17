'use client'

import FridgeService from "@/services/fridgeService";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Home() {
  const list = () => {
    FridgeService.listIngredients().then(data => {
      console.log('Fridge ingredients list :')
      console.log(data)
      console.log('-------------------------')
      console.log('')
    })
  }

  const add = () => {
    FridgeService.addIngredient(25, 200, 49).then(data => {
      console.log('Added fridge ingredient :')
      console.log(data)
      console.log('-------------------------')
      console.log('')
    })
  }

  const update = () => {
    FridgeService.updateIngredient(25, 300, 78).then(data => {
      console.log('Updated fridge ingredient :')
      console.log(data)
      console.log('-------------------------')
      console.log('')
    })
  }

  const remove = () => {
    FridgeService.removeIngredient(25).then(() => {
      console.log('Removed fridge ingredient !')
      FridgeService.listIngredients().then(data => {
        console.log('Fridge ingredients list :')
        console.log(data)
      })
      console.log('-------------------------')
      console.log('')
    })
  }

  return (
    <>
      <Button onClick={list}>List</Button>
      <Button onClick={add}>Add</Button>
      <Button onClick={update}>Update</Button>
      <Button onClick={remove}>Remove</Button>
    </>
  );
}
