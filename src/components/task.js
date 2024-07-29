import React from 'react';

function Task({ task }) {

    return (
        <li>
            {task.title.rendered}
        </li>
    );
}

export default Task;