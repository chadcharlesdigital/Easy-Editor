import React from 'react';
import ReplaceHtmlEllipsis from '../lib/ReplaceHtmlEllipsis';

function Task({ task }) {

    return (
        <li class='ee-task'>
            {ReplaceHtmlEllipsis( task.title.rendered )}

            
        </li>
    );
}

export default Task;