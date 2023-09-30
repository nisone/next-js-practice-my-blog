'use server'

import { Product } from "@/typings"
import { revalidateTag } from "next/cache"

export const addToDatabase = async (e: FormData) => {
  'use server'

  const name = e.get('name')?.toString()
  const price = e.get('price')?.toString()

  if (!name || !price) {
    return;
  }

  const product: Product = {
    name,
    price,
  }

  console.log(product)

  const res = await fetch('https://64fe2561596493f7af7ef302.mockapi.io/api/v1/products', {
    method: 'POST',
    body: JSON.stringify(product)
  })

  revalidateTag('products')
}

export const removeFromDatabase = async (e: FormData) => {
  'use server'

  const id = e.get('id')?.toString()

  const res = await fetch('https://64fe2561596493f7af7ef302.mockapi.io/api/v1/products/' + id, {
    method: 'DELETE',
  })

  revalidateTag('products')
}