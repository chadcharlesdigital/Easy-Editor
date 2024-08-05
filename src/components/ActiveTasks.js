import React, { useEffect, useState } from 'react'
import FormatURL from '../lib/FormatURL'
import PageTasks from './PageTasks'

// import SortTasks from '../lib/SortTasks'

function ActiveTasks({ tasks }) {

    //takes tasks sorts them and saves that in state
    const [sortedTasks, setSortedTasks] = React.useState();
    const [tasksForThisURL, setTasksForThisURL] = React.useState();

    //every time the tasks change sort and save them in state
    useEffect(() => {
        if (tasks && tasks.status === 'success') {
            const sortedTasksToBeReturned = {};
            tasks.body.forEach((task) => {
                if (typeof (sortedTasksToBeReturned[task['ee-data'].URL]) !== 'object') {
                    sortedTasksToBeReturned[task['ee-data'].URL] = [];
                }
                sortedTasksToBeReturned[task['ee-data'].URL].push(task);
            });
            setSortedTasks(sortedTasksToBeReturned);

            const currentURL = FormatURL(window.location.href);
            if (sortedTasksToBeReturned[currentURL]) {
                setTasksForThisURL(sortedTasksToBeReturned[currentURL]);
            }
        }
    }, [tasks])

        const fetchTasksSuccess = ()=>{
        if(tasks.body.length === 0){
            return "No Tasks Found";
        } else {
            return "Active Tasks";
        }
    }


    return (
        <div className="ee-active-tasks">

            <div class="active-tasks-header">
                {tasks.status === 'success' ? fetchTasksSuccess() : ""}
                {tasks.status === 'loading' ? "Tasks Are Loading..." : ""}
                {tasks.status === 'error' ? tasks.body : ""}

            </div>

            {/* if there are no tasks then output the no tasks message */}

            {/* if there are tasks for this page output them first */}
            {tasksForThisURL ? <PageTasks tasks={tasksForThisURL} />: ''}  

            {/* output the rest of the pages */}
            {sortedTasks ? Object.keys(sortedTasks).map((key, index) => {
                if (key !== FormatURL(window.location.href)) {
                    return <PageTasks tasks={sortedTasks[key]} />
                }
            }) : ''}
        </div>
    )
}

export default ActiveTasks