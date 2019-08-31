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
    },
    {
        name: 'パソコン',
        price: 200000,
        quantity: 0
    }
]

var BALANCE = 3000

Vue.component('page-header', {
    template: `
    <div style="color: gray;">
      <slot name="header"></slot>
    </div>
    `
})

Vue.component('site-title', {
    template: '<h2>こちらはショッピングサイトです</h2>'
})

Vue.component('site-title-full', {
    props: {
        userName: {
            type: String
        },
        balance: {
            type: Number
        }
    },
    template: `
    <div>
        <h3>ようこそ 「{{ userName }}」 さん (残高：{{ balance }}円)</h3>
        <site-title></site-title>
    </div>
    `
})

var vm3 = new Vue({
    el: '#title-component',
    data: {
        userName: 'user1',
        balance: BALANCE
    }
})

var vm = new Vue({
    el: '#app',
    data: {
        items: items,
        error: true
    },
    filters: {
        numberWithDelimeter: function (value) {
            if (!value) {
                return '0';
            } else {
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
        totalPrice: function () {
            return this.items.reduce(
                function (sum, item) {
                    return sum + (item.price * item.quantity)
                }, 0
            )
        },
        totalPriceWithTax: function () {
            return Math.floor(this.totalPrice * 1.08)
        },
        errorMessageClass: function () {
            return {
                errorMsg: true
            }
        },
        checkBalance: function () {
            return this.totalPrice >= BALANCE
        }
    },
    components: {
        'coupon': {
            template: '<p>※現在クーポンは配布しておりません</p>'
        }
    }
});

var buyClearButton = Vue.extend({
    template: `
    <div>
        <button @click="buy">購入</button>
        <button @click="clear" style="margin-left: 10px">クリア</button>
    </div>`,
    methods: {
        buy: function () {
            if (vm.checkBalance) {
                alert('残高が不足しているため購入できません')
                return
            }
            alert('購入しました')
            items.forEach(function (item) {
                item.quantity = 0
            })
            vm.error = false
            this.$emit('buy-shohin')
        },
        clear: function () {
            items.forEach(function (item) {
                item.quantity = 0
            })
            vm.error = false
            this.$emit('clear-shohin')
        }
    }
})

var vm2 = new Vue({
    el: '#buttons',
    components: {
        'buttons': buyClearButton
    },
    methods: {
        buyShohin: function () {
            console.log('buy button clicked')
        },
        clearShohin: function () {
            console.log('clear button clicked')
        }
    }
});