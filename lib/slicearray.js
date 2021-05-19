function slicearray(data, count) {
    count = Math.max(1, count);
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
export { slicearray };
