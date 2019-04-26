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
