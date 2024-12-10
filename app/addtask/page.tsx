//Made by Tommy Ho
"use client";
//This is the addtask page, which I use to add tasks to the database using my new-task component
import NewTask from "@/components/new-task";
import createNewTask from "@/lib/createNewTask";
export default function AddTaskPage() {
  async function AddNewTask(task: string, deadline: string) {
    const p = await createNewTask(task, deadline);
    if (p === null) {
      return false;
    }
    return true;
  }
  return <NewTask createFunc={AddNewTask} />;
}
