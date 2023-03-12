import { Application, Context, MongoClient, config } from './deps.ts'
const { MONGOURL } = config()


// Connect to DB
const client = new MongoClient()
await client.connect(MONGOURL)
const db = client.database("deno")
const userModel = db.collection("users")

const app = new Application()

app.use((ctx:Context) => {
  ctx.response.status = 200
  ctx.response.body = "Hello World!"
});

await app.listen({ port: 8080 })