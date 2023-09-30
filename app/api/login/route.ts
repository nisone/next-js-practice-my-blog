

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  const user = {
    name: 'someone',
    id: 1234567890,
    email: body.username,
  }

  if (user) {
    return new Response(JSON.stringify(user))
  } else {
    return new Response(JSON.stringify(null))
  }
}