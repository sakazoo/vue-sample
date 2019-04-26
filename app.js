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
