
export async function GET(req: Request) {
  const products =
  {
    "name": "Modern Soft Chair",
    "price": "46.00",
    "id": "61"
  }
  return new Response(JSON.stringify(products))
}