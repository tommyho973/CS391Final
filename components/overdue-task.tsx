import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { PostProps } from '../types';

const TrackerContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 24rem;
  z-index: 50;
`;

const ScrollContainer = styled.div`
  max-height: 24rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const Alert = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AlertTitle = styled.h4`
  color: #991b1b;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const TaskText = styled.p`
  color: #7f1d1d;
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.25rem;
`;

const DueDate = styled.p`
  color: #991b1b;
  font-size: 0.875rem;
  margin: 0;
`;

const WarningIcon = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  color: #991b1b;
`;

const OverdueTasksTracker = ({ tasks }: { tasks: PostProps[] }) => {
  const [overdueTasks, setOverdueTasks] = useState<PostProps[]>([]);

  useEffect(() => {
    const checkOverdueTasks = () => {
      const currentDate = new Date();
      const overdueItems = tasks.filter(task => {
        if (task.isfinished) return false;
        
        const deadlineDate = new Date(task.deadline);
        return deadlineDate < currentDate;
      });
      
      setOverdueTasks(overdueItems);
    };

    // Initial check
    checkOverdueTasks();

    // Set up interval to check every minute
    const interval = setInterval(checkOverdueTasks, 60000);

    // Cleanup
    return () => clearInterval(interval);
  }, [tasks]);

  if (overdueTasks.length === 0) return null;

  return (
    <TrackerContainer>
      <ScrollContainer>
        {overdueTasks.map((task) => (
          <Alert key={task.id}>
            <AlertTitle>
              <WarningIcon>⚠️</WarningIcon>
              Overdue Task
            </AlertTitle>
            <TaskText>{task.task}</TaskText>
            <DueDate>
              Was due on: {new Date(task.deadline).toLocaleString()}
            </DueDate>
          </Alert>
        ))}
      </ScrollContainer>
    </TrackerContainer>
  );
};

export default OverdueTasksTracker;