import React, { useState, useEffect, useRef } from 'react';
import ReplaceHtmlEllipsis from '../lib/ReplaceHtmlEllipsis';
import ResponseForm from './ResponseForm';
import eeHelpers, { capitalizeFirstLetter, isThisPage, timeSinceCreatedAt } from '../lib/eeHelpers';

function Task({ task }) {

    const [expanded, setExpanded] = useState(false);
    const [targetElement, setTargetElement] = useState( document.querySelector(task['ee-data'].targetElement) );

    const deviceType = () => {
        const screenWidth = task['ee-data'].screenSize.split('x')[0];
        if (screenWidth < 768) {
            return 'mobile';
        } else if (screenWidth >= 768 && screenWidth < 1024) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    const scrollToTarget = () => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    //goes out and finds all the todos and adds a class to mark them
    useEffect(() => {

        console.log('task', task);

        if (targetElement && isThisPage(task['ee-data'].URL)) {

            targetElement.classList.add('ee-has-task');
            targetElement.innerHTML += '<div class="task-label">Task: ' + task.id + '</div>';
        }


        return () => {
        }
    }, []);


    useEffect(() => {
        const targetElement = document.querySelector(task['ee-data'].targetElement);
        if (targetElement && expanded) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }

        return () => {
        }
    }, [expanded]);

    return (
        <li class='ee-task'>
            <div className="task-header" onClick={() => setExpanded(!expanded)}>
                <div className="task-id" onClick={() => {scrollToTarget()}}>
                    <div class="id-wrapper">{task.id}</div>
                </div>
                <div className="task-title">
                    {ReplaceHtmlEllipsis(capitalizeFirstLetter(task.title.rendered))}
                </div>
                <div className={expanded ? "task-dropdown-icon expanded" : "task-dropdown-icon"}>
                <i class="fa-solid fa-angle-down"></i>
                </div>
            </div>

            <div className={expanded ? "task-content" : "task-content ee-hidden"}>
                <div className="task-meta">
                    <div className="ee-attribute">
                        <div className="device-icon"><i className={"fa-sharp fa-solid fa-" + deviceType()}></i></div>
                        <span className='meta-label'>Screen Size:</span>
                        <span>{task['ee-data'].screenSize}</span>
                    </div>
                </div>
                <div className="task-body">
                    <p>{task['ee-data'].comments[0].description}</p>
                </div>
            </div>

            <div className={expanded ? "task-content" : "task-content ee-hidden"}>
                <ResponseForm />
            </div>

            <div className="task-footer">
                <div className="task-author">
                    <span><i class="fa-sharp fa-solid fa-user"></i>{task['ee-data'].authorName}</span>
                </div>

                <div className="task-age">
                    <span><i class="fa-sharp fa-solid fa-clock"></i>{timeSinceCreatedAt(task['ee-data'].creationTimestamp)}</span>
                </div>
                <div className="complete-task">
                    <span><i class="fa-sharp fa-solid fa-check"></i>Complete</span>
                </div>
            </div>

        </li>
    );
}

export default Task;