function FormatURL(url) {
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

export default FormatURL;