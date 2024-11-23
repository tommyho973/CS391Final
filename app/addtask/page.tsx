//Made by Tommy Ho
"use-client";
import NewTask from "@/components/new-task";
import createNewPost from "@/lib/createNewTask";
export default function AddTaskPage() {
  async function AddNewPost(task: string, deadline: string) {
    const p = await createNewPost(task, deadline);
    if (p === null) {
      return false;
    }
    return true;
  }
  return <NewTask createFunc={AddNewPost} />;
}
