"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 24rem;
  border-radius: 0.75rem;
  padding: 1rem;
  background-color: #7dd3fc;
`;
const StyledTextField = styled(TextField)`
  background-color: white;
  width: 100%;
  border-radius: 4px;
  & .MuiFilledInput-root {
    background-color: white;
  }
  & .MuiInputLabel-root {
    transform: translateY(0);
    font-size: 0.875rem;
  }

  & .Mui-focused {
    background-color: #f0f8ff; // Example of changing background on focus
  }
`;

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
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        submitNewTask();
      }}
    >
      <StyledTextField
        variant="filled"
        label="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <StyledTextField
        type="datetime-local"
        variant="filled"
        label="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
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
    </StyledForm>
  );
}
