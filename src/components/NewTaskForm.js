import React, { useState, useEffect, useCallback } from 'react';
import FormatURL from '../lib/FormatURL'


function NewTaskForm({ sidebarState }) {
    const [taskDescription, setTaskDescription] = useState('');
    const [fileUpload, setFileUpload] = useState('');
    const [targetElement, setTargetElement] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState();
    

    //abstract this to a utility file
    const targetElementUniquePath = (element) => {
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
            // document.querySelectorAll('.ee-selected').forEach((el) => {
            //     el.classList.remove('ee-selected');
            // });
            // e.target.classList.add('ee-selected');

            setTargetElement(e.target);
        }
    }

    //effect for putting event listeners on the document
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

    //effect for setting the focus when new elements are selected
    useEffect(() => {

        document.querySelectorAll('.ee-selected').forEach((el) => {
            el.classList.remove('ee-selected');
        });

        //this just stops the code from running on the first render when targetElement is null
        if (targetElement) {
            setTaskDescription('');
            setFormErrors({});
            setFileUpload('');
            setFormMessage('');
            targetElement.classList.add('ee-selected');


            if (targetElement && window.innerWidth > 783) {
                document.querySelector('#task-description').focus();
            }

        }
    }, [targetElement]);


    const handleForm = (e) => {
        e.preventDefault();
        setIsLoading("Loading...")
        // const formData = {};
        // formData.description = e.target[0].value;
        // formData.fileUpload = e.target[1].value;
        // formData.targetElement = e.target[2].value;
        // formData.screenSize = e.target[3].value;
        // formData.url = e.target[4].value;
        // formData.userAgent = e.target[5].value;
        // console.log(description, fileUpload, targetElement, screenSize, url, userAgent);

        const formData = new FormData(e.target);
        console.log(formData);

        //validate on front end
        const errors = {};
        if (!formData.get('task-description') || formData.get('task-description').trim() == '') {
            errors.description = 'Please enter a description';
        }

        //if there are errors, set the state and return
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            setIsLoading(false);
            return;
        }

        //send data to server

        // formData.nonce = easy_editor_data.nonce;
        // formData.action = "easy_editor_create_new_task"

        formData.append('nonce', easy_editor_data.nonce);
        formData.append('action', 'easy_editor_create_new_task');

        const url = easy_editor_data.ajax_url; // Replace with your server endpoint
        console.log('sending to the server ', url);

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(responseData => {
                // Handle the response from the server
                console.log(responseData);
                setIsLoading(false);

                if (responseData.success) {
                    //form submission successfull
                    console.log('Task created successfully');
                    setFormMessage('Task created successfully.')
                    setTargetElement('');
                    setTaskDescription('');
                } else {
                    //handle the error
                    console.log('There was an error creating the task');

                    if (responseData.errorField === 'description') {
                        errors.description = responseData.message;
                    }
                    if (responseData.errorField === 'file-upload') {
                        errors.fileUpload = responseData.message;
                    }

                    console.log(errors)
                    setFormErrors(errors);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setIsLoading(false);
            });

    }

    return (
        <div className="form-wrapper">
            <form enctype="multipart/form-data" className='new-task-form' onSubmit={handleForm}>
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
                    value={fileUpload}
                    onChange={(e) => { setFileUpload(e.target.value) }}
                    disabled={!targetElement}

                />
                <span className={formErrors.fileUpload ? 'input-description error' : 'input-description'}>{formErrors.fileUpload ? formErrors.fileUpload : 'Upload files (optional)'}</span>
                <input type="hidden" name="target-element" value={targetElementUniquePath(targetElement)} />
                <input type="hidden" name="screen-size" value={window.innerWidth + 'x' + window.innerHeight} />
                <input type="hidden" name="url" value={FormatURL(window.location.href)} />
                <input type="hidden" name="user-agent" value={navigator.userAgent} />
                <input
                    className='submit-button'
                    type="submit"
                    value={isLoading ? isLoading : "Submit"}
                    disabled={!targetElement}
                />

                <span className="form-message">{formMessage}</span>

            </form>
        </div>
    );
}

export default NewTaskForm;