function EndOfString(string) {
    if (string.length <= 30) {
        return string;
    }
    return '...' + string.slice(-27);
}

export default EndOfString;