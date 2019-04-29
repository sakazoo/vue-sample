var app = new Vue({
  el: "#app",
  data: {
    message: "Hello world"
  }
});

var template = new Vue({
  el: "#template",
  data: {
    messages: {
      count: 1
    },
    user: {
      gender: "male"
    },
    currentTab: 1,
    frameworks: [
      { name: "Vue", creator: "Evan You", stars: 79760 },
      { name: "React", creator: "Facebook", stars: 85623 },
      { name: "Angular", creator: "Google", stars: 31976 }
    ]
  },
  methods: {
    toggle: function(tab) {
      this.currentTab = tab;
    }
  }
});

var style = new Vue({
  el: "#style",
  data: {
    messages: [
      { text: "This is normal message.", error: false },
      { text: "This is ERROR message!", error: true }
    ],
    progress: 10
  }
});

var binding = new Vue({
  el: "#binding",
  data: {
    message: "",
    description: "This is textarea.",
    framework: "vue"
  }
});

var event = new Vue({
  el: "#event",
  data: {
    rating: 3,
    comment: "",
    error: "",
    submitted: false,
    previewUrl: ""
  },
  methods: {
    onSubmit: function() {
      // Web APIをたたく処理など

      // dataの内容はthisからアクセスできる
      this.error = "";
      if (this.comment === "") {
        this.error = "コメントは必須です。";
        return false;
      }

      // フォームの内容を表示
      this.submitted = true;
    },
    clearForm: function() {
      this.submitted = false;
      this.rating = 3;
      this.comment = "";
    },
    onFileChange: function(event) {
      const file = event.target.files[0];
      if (!file) {
        return false;
      }
      if (!file.type.match("image.*")) {
        return false;
      }
      const reader = new FileReader();
      const that = this;
      reader.onload = function(e) {
        that.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
});

var computed = new Vue({
  el: "#computed",
  data: {
    birthday: "",
    isComputedCalled: false,
    left: 0,
    right: 0
  },
  methods: {
    // この関数が呼び出されたタイミングがわかるように
    // メッセージを表示させる
    setMessage: function() {
      this.isComputedCalled = true;
      const that = this;
      setTimeout(function() {
        that.isComputedCalled = false;
      }, 1000);
    },
    getAge: function(year, month, day) {
      //誕生年月日
      var birthday = new Date(year, month - 1, day);

      //今日
      var today = new Date();

      //今年の誕生日
      var thisYearBirthday = new Date(
        today.getFullYear(),
        birthday.getMonth(),
        birthday.getDate()
      );

      //今年-誕生年
      var age = today.getFullYear() - birthday.getFullYear();

      //今年の誕生日を迎えていなければage-1を返す
      return today < thisYearBirthday ? age - 1 : age;
    }
  },
  computed: {
    age: function() {
      this.setMessage();

      // 誕生日の値が入っていなければマイナスの値を返却する
      // マイナスの場合の表示はテンプレート側で制御する
      if (!this.birthday) {
        return -1;
      }

      // 日付の計算
      const bd = this.birthday.split("-");
      if (bd.length < 3) {
        return -1;
      }

      return this.getAge(bd[0], bd[1], bd[2]);
    },
    total: function() {
      this.setMessage();

      return this.left + this.right;
    }
  }
});

var watch = new Vue({
  el: "#watch",
  data: {
    email: "",
    username: "",
    error: {}
  },
  watch: {
    email: function(value) {
      if (value === "") {
        this.error.email = "メールアドレスは必須です。";
      } else {
        this.error.email = "";
      }
    },
    username: function(value) {
      if (value === "") {
        this.error.username = "ユーザー名は必須です。";
      } else if (!/[a-zA-Z0-9]+/.test(value)) {
        this.error.username = "ユーザー名は半角英数のみです。";
      } else {
        this.error.username = "";
      }
    }
  }
});
