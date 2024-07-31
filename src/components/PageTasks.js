import React, {useState, useEffect} from 'react';
import FormatURL from '../lib/FormatURL';
import ReplaceHtmlEllipsis from '../lib/ReplaceHtmlEllipsis';
import EndOfString from '../lib/EndOfString';

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
            <div className='ee-page-tasks-header' onClick={(e)=>{setExpanded(!expanded)}}>
                <h3 className='task-page-url'>{EndOfString(tasks[0]['ee-data'].URL)}</h3>
                <div className="expand-icon">
                    <span className="task-count">({tasks.length})</span>
                    <i className={expanded ? "fa-sharp fa-solid fa-caret-down expanded" : "fa-sharp fa-solid fa-caret-down"}></i>
                </div>
            </div>
            <ul className={expanded ? "ee-task-list expanded" : "ee-task-list"} >
                {tasks.map((task, index) => {
                    return <li>{ReplaceHtmlEllipsis(task.title.rendered)}</li>
                })}
            </ul>
        </div>
    )
}

export default PageTasks;