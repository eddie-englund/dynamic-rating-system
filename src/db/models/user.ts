import { ObjectId } from 'mongodb';

export enum Permissions {
  readPost = 'read:post',
  likePost = 'like:post',
  createPost = 'create:post',
  editOwnPost = 'edit-own:post',
  editPosts = 'edit:post',
  deletePosts = 'delete:post',
  deleteOwnPost = 'delete-own:post'
}

export const BasePermissions: string[] = [
  Permissions.readPost,
  Permissions.likePost,
];

export const CreatorPermissions: string[] = [
  ...BasePermissions,
  Permissions.createPost,
  Permissions.editOwnPost,
  Permissions.deleteOwnPost
];

export const AdminPermissions: string[] = [
  ...CreatorPermissions,
  Permissions.deletePosts,
  Permissions.editPosts
];

export interface User {
  _id?: ObjectId;
  username: string;
  password: string;
  permissions: string[];
}
