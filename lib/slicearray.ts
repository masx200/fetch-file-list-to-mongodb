function slicearray<T>(data: Array<T>, count: number) {
    // 如果count=0,则死循环了
    count = Math.max(1, count);
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
export { slicearray };
