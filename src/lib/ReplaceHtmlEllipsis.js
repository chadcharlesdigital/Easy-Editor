function ReplaceHtmlEllipsis(inputString) {
    return inputString.replace(/&#8230;/g, '...');
}

export default ReplaceHtmlEllipsis;