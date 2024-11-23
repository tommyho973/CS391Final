// Made by Camille Christie

"use server";
import getCollection, { POSTS_COLLECTION } from "@/db";
import { PostProps } from "@/types";
import { ObjectId } from "mongodb"; 

export default async function updateTask(
  id: string,
): Promise<PostProps | null> {
  const postsCollection = await getCollection(POSTS_COLLECTION);
  const objectId = new ObjectId(id); // mongodb id

  // match id & update 
  const res = await postsCollection.updateOne(
    { _id: objectId }, 
    { $set: {isfinished: true}}  
  );

  if (res.modifiedCount === 0) {
    return null; 
  }

  const updatedTask = await postsCollection.findOne({ _id: objectId });
  if (updatedTask == null) {
    return null;
  } else {
    const updatedTask1: PostProps = {
        id: updatedTask._id.toHexString(), 
        task: updatedTask.task,
        isfinished: updatedTask.isfinished,
        deadline: updatedTask.deadline,
    };
    return updatedTask1;
  }
}
