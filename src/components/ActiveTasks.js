import React from 'react'
import Task from './task'

function ActiveTasks({ tasks }) {

    const sortTasks = () => {
        const sortedTasksToBeReturned = {};
        tasks.body.forEach((task) => {
            if (typeof (sortedTasksToBeReturned[task['ee-data'].URL]) !== 'object') {
                sortedTasksToBeReturned[task['ee-data'].URL] = [];
            }
            sortedTasksToBeReturned[task['ee-data'].URL].push(task);
        });
        return sortedTasksToBeReturned;
    }

    const sortedTasks = tasks.status === 'success' ? sortTasks() : "";
    console.log('sortedTasks', sortedTasks);

    const putTasks = () => {
        if ( tasks.status === "success" ) {
            if (tasks.body.length === 0 ){
                return "No open tasks."
            }
            return tasks.body.map(task => (
                <Task key={task.id} task={task} />
            ))
        }
    }
    return (
        <div className="ee-active-tasks">

            <span>
                {tasks.status === 'success' ? "Current Tasks" : ""}
                {tasks.status === 'loading' ? "Tasks Are Loading..." : ""}
                {tasks.status === 'error' ? tasks.body : ""}

            </span>

            <ul>
                {putTasks()}
            </ul>
        </div>
    )
}

export default ActiveTasks