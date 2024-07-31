function SortTasks(tasks){
    const sortedTasksToBeReturned = {};
    tasks.body.forEach((task) => {
        if (typeof (sortedTasksToBeReturned[task['ee-data'].URL]) !== 'object') {
            sortedTasksToBeReturned[task['ee-data'].URL] = [];
        }
        sortedTasksToBeReturned[task['ee-data'].URL].push(task);
    });
    return sortedTasksToBeReturned;
}

export default SortTasks;