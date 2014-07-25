var siteSettings = {
  title: 'Шаблонизатор Mustache',
  pages: [{
    num: 1,
    name: 'about',
    title: 'Зачем?',
    content: templates.about
  }, {
    num: 2,
    name: 'use',
    title: 'Преимущества',
    content: templates.use
  }, {
    num: 3,
    name: 'syntax',
    title: 'Работа с шаблонами',
    content: templates.syntax
  }, {
    num: 4,
    name: 'langSupport',
    title: 'Поддержка языками',
    content: templates.langSupport
  }, {
    num: 5,
    name: 'dotnet',
    title: 'Работа с mustache в .NET',
    content: templates.dotnet
  }, {
    num: 6,
    name: 'loading',
    title: 'Загрузка шаблонов',
    content: templates.loading
  }, {
    num: 7,
    name: 'lambdas',
    title: 'Лямбда функции',
    content: templates.lambdas
  }]
};

var template = templates.layout.render(siteSettings, { navigation: templates.navigation });
function init() {
  document.body.innerHTML = template;
};


var PageView = Backbone.View.extend({
  _index: 0,

  initialize: function (options) {
    this._index = options.index;
  },

  render: function () {
    var el = this.$el;
    var i = getElementIndexByAttr(siteSettings.pages, 'name', this._index)
    var html = siteSettings.pages[i].content.render(siteSettings.pages[i]);
    el.fadeOut(400, function () {
      el.html(html);
      el.fadeIn(400);
    });    
  },  
});

var Workspace = Backbone.Router.extend({
  routes: {
    "page/:page": "loadPage",
  },

  loadPage: function (page) {    
    this.pageView = new PageView({ el: $('#content'), index: page });
    this.pageView.render();
  }
});

function getElementIndexByAttr(array, key, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i][key] === value) {
      return i;
    };
  };
  return -1;
};

new Workspace;
Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;
Backbone.history.start();


