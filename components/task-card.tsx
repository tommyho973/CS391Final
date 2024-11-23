//Made by Camille Christie
'use client';
import {PostProps} from "@/types";
import { useState } from "react";
import updateTask from "@/lib/updateTask";
import styled from 'styled-components';

export default function TaskCard({task}: {task: PostProps}) {
    const [isFinished, setIsFinished] = useState(task.isfinished);
    const handleCheckboxChange = async () => {
        setIsFinished(!isFinished);
        await updateTask(task.id);
    };
    return (
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