//Made by Camille Christie (added styled-components - Michelle Sun)
'use client';
import {PostProps} from "@/types";
import { useState } from "react";
import updateTask from "@/lib/updateTask";
import styled from 'styled-components';

// interface for displaying green
interface StatusTextProps {
    isFinished: boolean;
}

const CardContainer = styled.div`
  background-color: #38bdf8;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem;
  width: 24rem; 
`;

const TaskLabel = styled.label`
  font-weight: bold;
  font-size: 1.875rem; 
  margin-left: 0.5rem;
`;

const DeadlineText = styled.p`
  margin-top: 0.5rem;
  color: #1e293b; 
`;

const StatusText = styled.p<StatusTextProps>`
  margin-top: 0.25rem;
  font-weight: 500;
  color: ${({ isFinished }) => (isFinished ? "#10b981" : "#ef4444")};
`;

export default function TaskCard({ task }: { task: PostProps }) {
  const [isFinished, setIsFinished] = useState(task.isfinished);

  const handleCheckboxChange = async () => {
    setIsFinished(!isFinished);
    await updateTask(task.id);
  };

  return (
    <CardContainer>
      <div>
        <input
          id={`task-${task.id}`}
          type="checkbox"
          checked={isFinished}
          onChange={handleCheckboxChange}
        />
        <TaskLabel htmlFor={`task-${task.id}`}>{task.task}</TaskLabel>
      </div>
      <DeadlineText>Deadline: {new Date(task.deadline).toLocaleString()}</DeadlineText>
      <StatusText isFinished={isFinished}>
        Status: {isFinished ? "Finished" : "Pending"}
      </StatusText>
    </CardContainer>
  );
}
