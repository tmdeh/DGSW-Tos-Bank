


exports.createAccount = () => {
    const rand_0_1000 = Math.floor(Math.random() * 1001);
    const rand_0_100 = Math.floor(Math.random() * 101);
    const result =  "666" + "-" + pad(rand_0_100, 3) + "-" + pad(rand_0_1000, 4);
    return result
}


function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

