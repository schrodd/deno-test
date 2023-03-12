import { Router } from '../deps.ts'
import { getUsers, getUserById, postUser, deleteUser, updateUser } from '../controller/user.controller.ts'

export const userRouter = new Router()

/* router.get("/", (ctx, next) => {
// handle the GET endpoint here
});
router.all("/item/:item", (ctx, next) => {
// called for all HTTP verbs/requests
ctx.params.item; // contains the value of `:item` from the parsed URL
}); */

userRouter.get('/users', getUsers)

userRouter.get('/users/:userId', getUserById)

userRouter.post('/users', postUser)

userRouter.delete('/users/:userId', deleteUser)

userRouter.put('/users/:userId', updateUser)