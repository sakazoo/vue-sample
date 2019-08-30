var items = [
    {
        name: '鉛筆',
        price: 300,
        quantity: 4
    },
    {
        name: 'ノート',
        price: 400,
        quantity: 1
    },
    {
        name: '消しゴム',
        price: 500,
        quantity: 2
    }
]

var vm = new Vue({
    el: '#app',
    data: {
        items: items
    },
    filters: {
        numberWithDelimeter: function (value) {
            if(!value){
                return '0';
            }else{
                return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
            }
        },
        yen: function (value) {
            return value.toString() + '円'
        },
        total: function (value) {
            return '合計：' + value.toString()
        }
    },
    computed: {
        totalPrice: function() {
            return this.items.reduce(
                function(sum, item){
                    return sum + (item.price * item.quantity)
                }, 0
            )
        },
        totalPriceWithTax: function(){
            return Math.floor(this.totalPrice *1.08)
        },
        errorMessageClass: function(){
            return {
                errorMsg: true
            }
        }
    }
});

var vm2 = new Vue({
    el: '#b-button',
    data: {
        canBuy: function(){
            return 1000 <= vm.totalPrice
        }
    }
});