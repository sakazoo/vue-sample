Vue.component('user-login', {
    template: '#login-x-template',
    date: function () {
        return {
            userId: '',
            password: ''
        }
    },
    methods: {
        login: function () {
            auth.login(this.userId, this.password);
        }
    }
})

var auth = {
    login: function (id, pass) {
        alert("userId: " + id + "\n" + "password: " + pass);
    }
}

var vm = new Vue({
    el: "#app"
})
