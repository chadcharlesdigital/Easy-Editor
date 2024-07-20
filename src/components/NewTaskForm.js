import React, { useState, useEffect, useCallback } from 'react';

function NewTaskForm({ sidebarState }) {
    const [taskDescription, setTaskDescription] = useState('');
    const [targetElement, setTargetElement] = useState('');

    const debounce = (func, delay) => {
        let inDebounce;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(context, args), delay);
        };
    };

    let currentHoveredElement = null;

    const newElementIsValid = (element) => {
        // Check if the element is a child of #easy-editor-sidebar or #wpadminbar
        return !element.closest('#easy-editor-sidebar') && !element.closest('#wpadminbar');
    }

    const mouseMoveListener = (e) => {
        const newHoveredElement = document.elementFromPoint(e.clientX, e.clientY);

        if (newHoveredElement !== currentHoveredElement && newElementIsValid(newHoveredElement)) {
            if (currentHoveredElement) {
                // Optionally, you can do something when the mouse leaves the old element
                // console.log('Mouse left:', currentHoveredElement);
            }
            if (newHoveredElement) {
                // Optionally, you can do something when the mouse enters the new element
                // console.log('Mouse entered:', newHoveredElement);
                document.querySelectorAll('.ee-highlighted').forEach((el) => {
                    el.classList.remove('ee-highlighted');
                });
                newHoveredElement.classList.add('ee-highlighted');
            }

            currentHoveredElement = newHoveredElement;
        }
    }

    const debouncedMouseMoveListener = useCallback(debounce(mouseMoveListener, 5), []);

    const clickListener = (e) => {
        if (newElementIsValid(e.target) && sidebarState === 'open') {
            e.preventDefault();
            document.querySelectorAll('.ee-selected').forEach((el) => {
                el.classList.remove('ee-selected');
            });
            e.target.classList.add('ee-selected');

            setTargetElement(e.target);
            setTaskDescription('');
        }
    }

    useEffect(() => {
        // console.log("task form effect is running");
        //add event listener listening for a click on any element
        window.addEventListener('mousemove', debouncedMouseMoveListener);
        window.addEventListener('click', clickListener);

        return () => {
            // console.log("task form is Cleaning up");
            //remove event listener
            window.removeEventListener('mousemove', debouncedMouseMoveListener);
            window.removeEventListener('click', clickListener);
        }
    }, [sidebarState]);


    return (
        <form>
            <h3>Create Task</h3>
            <label htmlFor="task-description">Instructions for developer:</label>
            <textarea
                id="task-description"
                name="task-description"
                value={taskDescription}
                onChange={(e) => { setTaskDescription(e.target.value) }}>
                {taskDescription}
            </textarea>

            <input type="text" name="target_element" value={targetElement} />
            <input type="text" name="screen-size" value={window.innerWidth + 'x' + window.innerHeight} />
            <input type="text" name="url" value={window.location.href} />
            <input type="text" name="user-agent" value={navigator.userAgent} />

            <input type="submit" value="Submit" />
            
        </form>
    );
}

export default NewTaskForm;