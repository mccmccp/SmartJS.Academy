function backpack(v, goods) {
    if (v <= 0 || goods.length === 0) {
        return 0;
    }
    var bestPrice = 0;
    goods.forEach(function (good, i) {
        var availebleGoods = [].concat(goods);
        availebleGoods.splice(i, 1);
        var newPrice = backpack(v - good.v, availebleGoods);
        if (good.v <= v && bestPrice < good.p + newPrice) {
            bestPrice = good.p + newPrice;
        }
    });
    return bestPrice;
};
console.log(backpack(120, [{v: 100, p: 110}, {v: 70, p: 70}, {v: 50, p: 65}]))