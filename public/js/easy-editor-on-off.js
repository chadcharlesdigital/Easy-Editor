(function ($) {

    $("#wp-admin-bar-enable-todos .ab-item, .on-off-light").click(function (e) {
        e.preventDefault();
        $('body').toggleClass('easy-editor-on')

        //if body has class easy-editor-on
        if ($('body').hasClass('easy-editor-on')) {
            //change the text of the button
            $("#wp-admin-bar-enable-todos .ab-item").text('Disable Todos');
        } else {
            $("#wp-admin-bar-enable-todos .ab-item").text('Enable Todos');
        }
    });

    function updateBodyClasses() {
        
    }


    document.addEventListener('mouseover', function (e) {
        // Check if 'easy-editor-on' class is present on the body
        if (document.body.classList.contains('easy-editor-on')) {
            // Remove existing outlines
            clearOutlines();

            // Apply outline to the current (deepest) element with color #4B5CD7
            e.target.style.outline = '2px solid #4B5CD7';
        }
    }, false);

    document.addEventListener('mouseout', function (e) {
        // Check if 'easy-editor-on' class is present on the body
        if (document.body.classList.contains('easy-editor-on')) {
            // Remove outlines when the mouse leaves an element
            clearOutlines();
        }
    }, false);

    function clearOutlines() {
        // Only clear outlines if 'easy-editor-on' class is present
        if (document.body.classList.contains('easy-editor-on')) {
            document.querySelectorAll('*').forEach(function (el) {
                el.style.outline = 'none';
            });
        }
    }

    //This function handles generating the interface for creating a new todo
    document.addEventListener('click', function (e) {
        // Check if 'easy-editor-on' class is present on the body
        if (document.body.classList.contains('easy-editor-on')) {
            e.preventDefault();
            console.log(generateUniquePathId(e.target));
            //code for activing sidebar
            
        }
    });

    function generateUniquePathId(element) {
        let path = [];
        let currentElement = element;

        while (currentElement.parentNode) {
            let name = currentElement.tagName;
            let siblingIndex = Array.prototype.indexOf.call(currentElement.parentNode.children, currentElement);
            let identifier = `${name}:nth-child(${siblingIndex + 1})`;
            path.unshift(identifier); // Add to the beginning of the path array
            currentElement = currentElement.parentNode;
        }

        // Join the path parts with " > " to create a unique, queryable path string
        return path.join(" > ");
    }

    console.log('Current Page ID is: ' + pageData.pageId);

    

})(jQuery);
