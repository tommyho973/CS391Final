// Made by Camille Christie
// Global Comment: this is code to update the database, specifically the isfinished boolean based on the checkbox status of the task.

"use server";
import getCollection, { POSTS_COLLECTION } from "@/db";
import { PostProps } from "@/types";
import { ObjectId } from "mongodb"; 

export default async function updateTask(
  id: string, // id of the task to update
): Promise<PostProps | null> {
  // get collection of posts and create ObjectId with the given id
  const postsCollection = await getCollection(POSTS_COLLECTION);
  const objectId = new ObjectId(id); // mongodb id

  // match id & update, setting isfinished to true because checkbox was checked
  const res = await postsCollection.updateOne(
    { _id: objectId }, 
    { $set: {isfinished: true}}  
  );

  // return null if nothing was modified, likely because id did not match a task
  if (res.modifiedCount === 0) {
    return null; 
  }

  // get and return the updated task
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
