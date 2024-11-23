//Made by Camille Christie
import {PostProps} from "@/types";


export default function TaskPreview({task}: {task: PostProps}) {
    return (
        <div className="bg-sky-400 rounded-x1 p-4 m-2 w-96">
            <h4 className="font-bold text-3x1">{task.task}</h4>
            <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
            <p>Status: {task.isfinished ? "Finished" : "Pending"}</p>
        </div>
    );
}