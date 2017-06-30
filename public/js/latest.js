(function() {
  'use strict';
  var app = {
    spinner: document.querySelector('.loader')
  };
  var container = document.querySelector('.container');
  var commitContainer = ['.first', '.second', '.third', '.fourth', '.fifth'];
  var posData = ['first', 'second', 'third', 'fourth', 'fifth'];

  // 从Github API获取commit数据
  function fetchCommits() {
    var url = 'https://api.github.com/repos/vuejs/vue-router/commits';
    fetch(url).then(fetchResponse => fetchResponse.json())
    .then(response => {
      var commitData = {};
      for (var i = 0; i < posData.length; i++) {
        commitData[posData[i]] = {
          message: response[i].commit.message,
          author: response[i].commit.author.name,
          time: response[i].commit.author.date,
          link: response[i].html_url,
          avatar_url: response[i].author.avatar_url
        };
      }
      // 填充数据
      for (var i = 0; i < commitContainer.length; i++) {
        container.querySelector(commitContainer[i]).innerHTML =
        "<p>Message: " + response[i].commit.message + "</p>" +
        "<div class='committer'>" +
        "<div class='avatar'>" +
        "<img src='" + response[i].author.avatar_url + "'/>" +
        "</div>" +
        "<div class='commit__info'>" +
        "<span class='author'>" + response[i].commit.author.name + "</span>" +
        "<span class='date'>" + (new Date(response[i].commit.author.date)).toLocaleString() + "</span>" +
        "</div></div>" ;
      }
      // 隐藏loading动画
      app.spinner.setAttribute('hidden', true);
    })
    .catch(error => console.error(error));
  };
  fetchCommits();
})();