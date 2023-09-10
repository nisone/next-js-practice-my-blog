import { addToDatabase, removeFromDatabase } from "@/actions/products";
import { Product } from "@/typings";
import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {

  const res = await fetch('https://64fe2561596493f7af7ef302.mockapi.io/api/v1/products', {
    method: 'GET',
    cache: 'no-cache',
    next: {
      tags: ["products"]
    }
  })

  const products: Product[] = await res.json()

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-5">Product page</h1>
      <div className="flex md:flex-row flex-col-reverse gap-5">
        <div className="p-10 shadow-md rounded-md bg-gray-100">
          <h1 className="text-3xl font-bold text-center py-2">Product List</h1>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mx-auto py- 5">
            {
              products.map((e) => (
                <div key={e?.id} className="flex flex-col gap-2 p-2 shadow-md rounded-md bg-gray-50">
                  <Image className="object-cover h-48 w-96" src={'https://loremflickr.com/640/480/fashion'} width={100} height={100} alt='product image'></Image>
                  <h1>{e.name}</h1>
                  <h1>{e.price}</h1>
                  <div className="flex flex-row gap-2">
                    <Link href={'/dashboard/product/' + e?.id} className="btn bg-gray-600 text-white p-1 mx-auto rounded-md">Update</Link>
                    <form action={removeFromDatabase}>
                      <input type="hidden" name="id" value={e?.id} />
                      <button type="submit" className="btn bg-red-600 text-white p-1 mx-auto rounded-md">Delete</button>
                    </form>
                  </div>


                </div>

              ))
            }
          </div>
        </div>

        <div className="p-10 shadow-md rounded-md bg-gray-100">
          <h1 className="text-3xl font-bold text-center py-2">Add product</h1>
          <form action={addToDatabase} className="flex flex-col gap-5 max-w-sm mx-auto">
            <input type="text" name="name" placeholder="name" className="border border-blue-300 p-2 rounded-md" />
            <input type="text" name="price" placeholder="price" className="border border-blue-300 p-2 rounded-md" />
            <button type="submit" className="btn bg-blue-400 text-white p-1 rounded-md">Add product</button>
          </form>
        </div>

      </div>

    </div>
  );
};