function TargetElementUniquePath(element) {
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

export default TargetElementUniquePath;