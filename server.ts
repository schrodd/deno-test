import { Application, Context, MongoClient, config } from './deps.ts'
import { userRouter } from './routes/user.routes.ts'
const { MONGOURL } = config()

// Connect to DB
const client = new MongoClient()
await client.connect(MONGOURL)
export const db = client.database("deno")
export const userModel = db.collection("users")

const app = new Application() 

/* app.use((ctx:Context) => {
  ctx.response.status = 200
  ctx.response.body = "Hello World!"
}) */
app.use(userRouter.routes())

// Default response to '/'
app.use((ctx:Context) => {
  ctx.response.body = 'Hola mundo'
})

console.log('Servidor escuchando en el puerto 8080')

await app.listen({ port: 8080 })