/**
 * Main Task List Page
 * Displays all active tasks and incorporates the overdue task notification system.
 * Handles data fetching and task filtering.
 */

import getCollection from "@/db";
import OverdueTasksTracker from "@/components/overdue-task";
import { PostProps } from "@/types";
import TaskCard from "@/components/task-card";

// Made by Michelle Sun (Pulling objects from mongodb)
// Fetch all tasks from MongoDB and format them for frontend use
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

// Main page component - handles task display and filtering
export default async function Home() {
  // Fetch tasks server-side for better performance
  const tasks = await getAllTasks();

  return (
    <>
      <h1>Task List</h1>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {/* Only show unfinished tasks */}
          {tasks
          .filter((task) => !task.isfinished)
          .map((task) => (
                <TaskCard key={task.id} task={task}/>
            ))}
        </ul>
      )}

      {/* Add overdue task notifications */}
      <OverdueTasksTracker tasks={tasks} />
    </>
  );
}