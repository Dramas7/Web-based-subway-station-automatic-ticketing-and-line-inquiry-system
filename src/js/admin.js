window.addEventListener('load', function() {
    Vue.config.productionTip = false

		const vm = new Vue({
			el: '#root',
            data: {
                prices: {
                    pricesFirst: 2,
                    pricesSecond: 4,
                    pricesThird: 6,
                    pricesFourth: 8
                },
                n: 1
            }
		})
})