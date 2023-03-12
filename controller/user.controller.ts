import { Context, helpers, ObjectId } from '../deps.ts'
import { User } from '../models/user.model.ts'
import { userModel } from '../server.ts'

export const getUsers = async (ctx:Context) => {
  try {
    const res = await userModel.find().toArray()
    ctx.response.status = 200
    ctx.response.body = res
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = { error, detail: 'Error while retrieving data' }
  }
}

export const getUserById = async (ctx:Context) => {
  const { userId } = helpers.getQuery(ctx, {mergeParams: true})
  try {
    const res = await userModel.find({_id: new ObjectId(userId)})
    ctx.response.status = 200
    ctx.response.body = res
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = { error, detail: 'Error while retrieving data' }
  }
}

export const postUser = async (ctx: Context) => {
  const {name, age} = await ctx.request.body().value
  try {
    const newUserId: User = await userModel.insertOne({name, age})
    ctx.response.status = 200
    ctx.response.body = { status: 'User created successfully', newUserId }
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = { error, detail: 'Error while posting data' }
  }
}

export const deleteUser = async (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, {mergeParams: true})
  try {
    const match = await userModel.deleteOne({_id: new ObjectId(userId)})
    ctx.response.status = 200
    ctx.response.body = { status: `User with id ${userId} has been deleted successfully` }
    if (match == 0) ctx.response.body = { status: 'User not found. Check Id' }
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = { error, detail: 'Error while deleting data' }
  }
}

export const updateUser = async (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, {mergeParams: true})
  const {name, age} = await ctx.request.body().value
  try {
    const res = await userModel.updateOne({_id: new ObjectId(userId)}, {$set: {name, age}})
    ctx.response.status = 200
    ctx.response.body = { status: `User with id ${userId} has been updated successfully`, res }
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = { error, detail: 'Error while updating data' }
  }
}