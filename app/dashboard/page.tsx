import { profile } from "console";
import { revalidatePath, revalidateTag } from "next/cache";
import { json } from "stream/consumers";

export interface Product {
  id?: string;
  name?: String;
  price?: String;
}

export default async function Dashboard() {

  const res = await fetch('https://64fe2561596493f7af7ef302.mockapi.io/api/v1/products', {
    method: 'GET',
    cache: 'no-cache',
    next: {
      tags: ["products"]
    }
  })

  const products: Product[] = await res.json()

  const addToDatabase = async (e: FormData) => {
    'use server'

    const name = e.get('name')?.toString()
    const price = e.get('price')?.toString()

    const product: Product = {
      name,
      price
    }

    console.log(product)

    const res = await fetch('https://64fe2561596493f7af7ef302.mockapi.io/api/v1/products', {
      method: 'POST',
      body: JSON.stringify(product)
    })

    // revalidateTag('products')
    revalidatePath('/dashboard')
  }

  const removeFromDatabase = async (e: FormData) => {
    'use server'

    const id = e.get('id')?.toString()

    const res = await fetch('https://64fe2561596493f7af7ef302.mockapi.io/api/v1/products/' + id, {
      method: 'DELETE',
    })

    revalidateTag('products')
  }

  return (
    <main>
      <form action={addToDatabase} className="flex flex-col gap-5 max-w-sm mx-auto">
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="price" placeholder="price" />
        <button type="submit">Add product</button>
      </form>

      <h1> Protected Page</h1>
      {
        products.map((e) => (
          <div key={e?.id} className="flex flex-wrap gap-5 mx-auto py- 5">
            <div className="flex flex-col gap-2">
              <h1>{e.name}</h1>
              <h1>{e.price}</h1>
              <form action={removeFromDatabase}>
                <input type="hidden" name="id" value={e?.id} />
                <button type="submit" className="btn bg-red-600 p-1 mx-auto">Delete</button>
              </form>

            </div>

          </div>
        ))
      }
    </main>
  );
};