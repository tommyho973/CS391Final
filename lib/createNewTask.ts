"use server";
import getCollection, { POSTS_COLLECTION } from "@/db";
import { PostProps } from "@/types";
export default async function createNewPost(
  task: string,
  deadline: string
): Promise<PostProps | null> {
  const p = { task: task, isfinished: false, deadline: deadline };
  const postsCollection = await getCollection(POSTS_COLLECTION);
  const res = await postsCollection.insertOne(p);

  if (!res.acknowledged) {
    return null;
  }
  return {
    ...p,
    id: res.insertedId.toHexString(),
  };
}
