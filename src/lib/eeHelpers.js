export function capitalizeFirstLetter(str){
    if (typeof str !== 'string' || str.length === 0) {
        return str; // Return the input if it's not a string or if it's an empty string
    }

    // Check if the first character is a letter
    if (/^[a-zA-Z]$/.test(str.charAt(0))) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return str; // Return the original string if the first character is not a letter
}

//checks if the current url matches passed string
export function isThisPage(url){
    if( formatURL(window.location.href) === formatURL(url) ){
        return true;
    }
    return false
}

export function formatURL(url) {
    // Remove http:// or https://
    url = url.replace(/^https?:\/\//, '');

    // Remove www. if it exists
    url = url.replace(/^www\./, '');

    // Remove parameters and fragments
    url = url.split(/[?#]/)[0];

    // Remove the final slash if it exists
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    return url;
}

//function for calculating the amount of time between when a task was created and the current time
export function timeSinceCreatedAt(createdAt) {
    const createdTime = new Date(createdAt * 1000); // Convert UNIX timestamp to milliseconds
    const currentTime = new Date();
    const timeDifference = currentTime - createdTime;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
        return "just now";
    } else if (days >= 1) {
        return `${days} day${days > 1 ? 's' : ''} old`;
    } else if (hours >= 1) {
        return `${hours} hour${hours > 1 ? 's' : ''} old`;
    } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''} old`;
    }
}

export function FormatURL(url) {
    // Remove http:// or https://
    url = url.replace(/^https?:\/\//, '');

    // Remove www. if it exists
    url = url.replace(/^www\./, '');

    // Remove parameters and fragments
    url = url.split(/[?#]/)[0];

    // Remove the final slash if it exists
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    return url;
}


export function getCurrentProtocol() {
    return window.location.protocol.replace(':', '') + '://';
  }