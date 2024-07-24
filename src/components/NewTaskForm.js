import React, { useState, useEffect, useCallback } from 'react';

function NewTaskForm({ sidebarState }) {
    const [taskDescription, setTaskDescription] = useState('');
    const [targetElement, setTargetElement] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const targetElementUniquePath = (element) => {
        // let element = targetElement;
        if (!element === '' && element.tagName.toLowerCase() === 'html') {
            return 'html';
        }

        let path = [];
        while (element.parentElement) {
            let tagName = element.tagName.toLowerCase();
            let siblings = Array.from(element.parentElement.children).filter(el => el.tagName === element.tagName);
            if (siblings.length > 1) {
                let index = siblings.indexOf(element) + 1;
                tagName += `:nth-of-type(${index})`;
            }
            path.unshift(tagName);
            element = element.parentElement;
        }
        return path.join(' > ');
    }

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
        // alert('click');
        if (newElementIsValid(e.target) && sidebarState === 'open') {
            e.preventDefault();
            document.querySelectorAll('.ee-selected').forEach((el) => {
                el.classList.remove('ee-selected');
            });
            e.target.classList.add('ee-selected');

            setTargetElement(e.target);
            setTaskDescription('');
            setFormErrors({});
            document.querySelector('#task-description').focus();
        }
    }

    useEffect(() => {
        // console.log("task form effect is running");
        //add event listener listening for a click on any element
        document.addEventListener('mousemove', debouncedMouseMoveListener);
        document.addEventListener('click', clickListener);

        return () => {
            // console.log("task form is Cleaning up");
            //remove event listener
            document.removeEventListener('mousemove', debouncedMouseMoveListener);
            document.removeEventListener('click', clickListener);
        }
    }, [sidebarState]);


    const handleForm = (e) => {
        e.preventDefault();
        const formData = {};
        formData.description = e.target[0].value;
        formData.fileUpload = e.target[1].value;
        formData.targetElement = e.target[2].value;
        formData.screenSize = e.target[3].value;
        formData.url = e.target[4].value;
        formData.userAgent = e.target[5].value;
        // console.log(description, fileUpload, targetElement, screenSize, url, userAgent);

        //validate on front end
        const errors = {};
        if (formData.description.trim() === '') {
            errors.description = 'Please enter a description';
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        //send data to server

        formData.nonce = easy_editor_data.nonce;
        formData.action = "easy_editor_create_new_task"

        const url = easy_editor_data.ajax_url; // Replace with your server endpoint
        console.log('sending to the server ', url);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-WP-Nonce': formData.nonce
            },
            body: new URLSearchParams(formData)
        })
            .then(response => response.json())
            .then(formData => {
                // Handle the response from the server
                console.log(formData);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }

    return (
        <div className="form-wrapper">
            <form className='new-task-form' onSubmit={handleForm}>
                <label htmlFor="task-description">New Task</label>
                <textarea
                    id="task-description"
                    name="task-description"
                    value={taskDescription}
                    placeholder={targetElement ? `What would you like changed?` : 'Click something you want changed'}
                    disabled={!targetElement}
                    onChange={(e) => { setTaskDescription(e.target.value) }}>
                    {taskDescription}
                </textarea>
                <span className='input-description error'>{formErrors.description ? formErrors.description : ""}</span>
                <label className='inline' htmlFor="file-upload"><i className="fa-solid fa-paperclip"></i>Attachments</label>
                <input
                    type="file"
                    id="file-upload"
                    name="file-upload"
                />
                <span className='input-description'>Upload files (optional)</span>
                <input type="hidden" name="target_element" value={targetElementUniquePath(targetElement)} />
                <input type="hidden" name="screen-size" value={window.innerWidth + 'x' + window.innerHeight} />
                <input type="hidden" name="url" value={window.location.href} />
                <input type="hidden" name="user-agent" value={navigator.userAgent} />
                <input className='submit-button' type="submit" value="Submit" />

            </form>
        </div>
    );
}

export default NewTaskForm;