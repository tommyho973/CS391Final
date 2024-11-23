import getCollection from "@/db";
import OverdueTasksTracker from "@/components/overdue-task";
import { PostProps } from "@/types";

// Made by Michelle Sun
async function getAllTasks(): Promise<PostProps[]> {
  const collection = await getCollection("posts-collection");
  const tasks = await collection
    .find({})
    .map((doc) => ({
      id: doc._id.toHexString(), // Convert ObjectId to string
      task: doc.task,
      isfinished: doc.isfinished,
      deadline: doc.deadline,
    }))
    .toArray();
  return tasks;
}

export default async function Home() {
  const tasks = await getAllTasks(); // Fetch tasks directly in a Server Component

  return (
    <>
      <h1>Task List</h1>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.task}</strong>
              <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
              <p>Status: {task.isfinished ? "Finished" : "Pending"}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Example use of OverdueTasksTracker */}
      <OverdueTasksTracker tasks={tasks} />
    </>
  );
}