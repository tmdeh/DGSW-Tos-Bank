


exports.createAccount = () => {
    const rand_0_1000_1 = Math.floor(Math.random() * 1001);
    const rand_0_1000_2 = Math.floor(Math.random() * 1001);
    const result =  "666"  + pad(rand_0_1000_1, 4) + pad(rand_0_1000_2, 4);
    return Number(result)
}


function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

