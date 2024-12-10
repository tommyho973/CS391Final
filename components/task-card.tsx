//Made by Camille Christie
// Global comment: This is code for a card to display the tasks in the database and update their completion status.
'use client';
import {PostProps} from "@/types";
import { useState } from "react";
import updateTask from "@/lib/updateTask";
import styled from 'styled-components';

export default function TaskCard({task}: {task: PostProps}) {
    const [isFinished, setIsFinished] = useState(task.isfinished); // useState to keep track of whether checkbox is checked
    const handleCheckboxChange = async () => {
        setIsFinished(!isFinished); // flip boolean var
        await updateTask(task.id);
    };
    return (
        // styling div for each card
        <div className="bg-sky-400 rounded-x1 p-4 m-2 w-96">
            <div>
                <input
                    id={`task-${task.id}`}
                    type="checkbox"
                    checked={isFinished}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor={`task-${task.id}`} className="font-bold text-3x1"> {task.task}</label> 
            </div>
            <p>Deadline: {new Date(task.deadline).toLocaleString()}</p> 
            <p>Status: {isFinished ? "Finished" : "Pending"}</p> 
        </div>
    );
}