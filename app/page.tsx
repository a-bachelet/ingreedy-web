'use client'

import { useEffect } from "react";

export default function Home() {
  const fetchIngredients = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`)
    const ingredients = await response.json()
    
    return ingredients
  }

  useEffect(() => {
    console.log('Fetching fetchIngredients...')
    fetchIngredients().then(ingredients => {
      console.log(ingredients)
    }).catch(err => {
      console.error(err)
    })
  })

  return (
    <p>Hello world !</p>
  );
}
