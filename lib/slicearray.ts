function slicearray<T>(data: Array<T>, count: number) {
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
export { slicearray };
