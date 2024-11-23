import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
export default function NewTask({
  createFunc,
}: {
  createFunc: (task: string, deadline: string) => Promise<boolean>;
}) {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");

  async function submitNewTask() {
    if (await createFunc(task, deadline)) {
      setTask("");
      setDeadline("");
    }
  }
  return (
    <form
      className="w-96 rounded-xl p-4 bg-sky-300"
      onSubmit={(e) => {
        e.preventDefault();
        submitNewTask();
      }}
    >
      <TextField
        variant="filled"
        sx={{ backgroundColor: "white", width: "100%" }}
        label="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <TextField
        type="datetime-local"
        variant="filled"
        sx={{ backgroundColor: "white", width: "100%" }}
        label="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <FormHelperText>What&apos;s on your mind?</FormHelperText>
      <div className="w-full flex justify-content">
        <Button
          sx={{ width: "80px" }}
          variant="contained"
          type="submit"
          disabled={task.length === 0 || deadline.length === 0}
        >
          Create
        </Button>
      </div>
    </form>
  );
}
