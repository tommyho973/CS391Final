// Made by Michelle Sun
/**
 * Global Notification System for Overdue Tasks
 * Displays floating notifications for any tasks that have passed their deadline.
 * Auto-refreshes every hour and allows users to dismiss individual notifications.
 */
"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { PostProps } from '../types';

const TrackerContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 30vw;
  min-width: 20rem;
  max-width: 30rem;
  z-index: 50;
`;

const ScrollContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0.25rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.25rem;
  }
`;

const Alert = styled.div`
  background-color: #fee2e2;
  border: 0.0625rem solid #ef4444;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const AlertTitle = styled.h4`
  color: #991b1b;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
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

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #991b1b;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  line-height: 1;
  min-width: 1.5rem;
  min-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #7f1d1d;
  }
`;

 * OverdueTasksTracker Component
// Extends the base PostProps: dismisses state for overdue tasks
interface OverdueTask extends PostProps {
    dismissed?: boolean;
}

// Main tracker component - handles monitoring and displaying overdue tasks
const OverdueTasksTracker = ({ tasks }: { tasks: PostProps[] }) => {
  // Track both overdue tasks and which ones user has dismissed
  const [overdueTasks, setOverdueTasks] = useState<OverdueTask[]>([]);
  const [dismissedTasks, setDismissedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
      // Check for overdue tasks by comparing current time to deadlines
      const checkOverdueTasks = () => {
          const currentDate = new Date();
          const overdueItems = tasks.filter(task => {
              // Skip finished or dismissed tasks
              if (task.isfinished || dismissedTasks.has(task.id)) return false;
              
              const deadlineDate = new Date(task.deadline);
              return deadlineDate < currentDate;
          });
          
          setOverdueTasks(overdueItems);
      };

      // Run check immediately and set up hourly checks
      checkOverdueTasks();
      const interval = setInterval(checkOverdueTasks, 60000 * 60);
      return () => clearInterval(interval);
  }, [tasks, dismissedTasks]); 

  // Allow users to dismiss individual notifications
  const handleDismiss = (taskId: string) => {
      setDismissedTasks(prev => {
          const newDismissed = new Set(prev);
          newDismissed.add(taskId);
          return newDismissed;
      });
  };

  const visibleTasks = overdueTasks.filter(task => !dismissedTasks.has(task.id));
  if (visibleTasks.length === 0) return null;

  return (
      <TrackerContainer>
          <ScrollContainer>
              {visibleTasks.map((task) => (
                  <Alert key={task.id}>
                      <AlertHeader>
                          <AlertTitle>
                              <WarningIcon>⚠︎</WarningIcon>
                              Overdue Task
                          </AlertTitle>
                          <CloseButton 
                              onClick={() => handleDismiss(task.id)}
                              aria-label="Dismiss notification"
                          >
                              ×
                          </CloseButton>
                      </AlertHeader>
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