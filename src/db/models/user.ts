import { ObjectId } from "mongodb";

export enum Permissions {
  createPost = "create:post",
  editOwnPost = "edit-own:post",
  editPosts = "edit:post",
  deletePosts = "delete:post",
  deleteOwnPost = "delete-own:post"
}

export const BasePermissions = [
  Permissions.createPost,
  Permissions.editOwnPost,
  Permissions.deleteOwnPost
]

export const AdminPermissions = [
  ...BasePermissions,
  Permissions.deletePosts,
  Permissions.editPosts
]

export type User = {
  _id?: ObjectId,
  username: string,
  password: string,
  permissions: String[]
}
