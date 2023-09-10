import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Milo Adam" },
        password: { label: "password", type: "password" }
      },

      async authorize(credentials, req) {
        const result = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          })
        })

        const user = await result.json();

        if (user) {
          return user
        } else {
          return null
        }
      },
    })
  ]
});

export { handler as GET, handler as POST };
