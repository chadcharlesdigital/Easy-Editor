import React, { useState, useEffect } from 'react';
import FormatURL from '../lib/FormatURL';
import ReplaceHtmlEllipsis from '../lib/ReplaceHtmlEllipsis';
import EndOfString from '../lib/EndOfString';
import Task from './Task';
import eeHelpers, { getCurrentProtocol } from '../lib/eeHelpers';

function PageTasks({ tasks }) {

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        console.log("pagetasks mountain");
        if (tasks[0]['ee-data'].URL === FormatURL(window.location.href)) {
            setExpanded(true);
        }

        return () => {
            console.log('pagetasks unmounting')
        }
    }, []);

    return (
        <div className='ee-page-tasks'>
            <div className='ee-page-tasks-header' onClick={(e) => { setExpanded(!expanded) }}>
                <h3 className='task-page-url'>
                    {tasks[0]['ee-data'].URL === FormatURL(window.location.href) ? "Tasks On This Page:" : EndOfString(tasks[0]['ee-data'].URL)}
                    {tasks[0]['ee-data'].URL !== FormatURL(window.location.href) ? <a href={getCurrentProtocol() + tasks[0]['ee-data'].URL}><i className='color-grey link-icon fa-solid fa-up-right-from-square'></i></a> : ''}
                </h3>
                <div className="expand-icon">
                    <span className="task-count">({tasks.length})</span>
                    <i className={expanded ? "fa-sharp fa-solid fa-caret-down expanded" : "fa-sharp fa-solid fa-caret-down"}></i>
                </div>
            </div>
            <ul className={expanded ? "ee-task-list expanded" : "ee-task-list"} >
                {tasks.map((task, index) => {
                    return <Task key={task.id} task={task} />
                })}
            </ul>
        </div>
    )
}

export default PageTasks;