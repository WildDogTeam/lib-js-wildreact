
WildReact
------

## ReactJS 是什么

[ReactJS](http://facebook.github.io/react/) 是Facebook和Instagram开发并开源的前端框架，目标是使构建复杂的UI变得简单。
React的作者把React定位为MVC中的V。它并不是要取代Angular或者Ember，而是提供一种使用JavaScript更新视图的高效方式。
React的独到之处就是使用虚拟DOM的diff算法，使得HTML的渲染速度非常高效。
React的数据绑定是单向的，比起传统的双向数据绑定来说简单不少。

组件-构成React App的基本组成部分。组件被组织到一个树形结构中。在这个树形结构中，上级组件通过`props`变量向下级组件传递数据。每一个组件都有个`state`变量。这个变量决定当前view所对应的数据。
当state发生变化，这个组件的`render()`方法会被调用，React会决定如何去使用最高效的方法渲染这个组件。

 因为React的主要聚焦于UI层，所以React APP需要一些别的组件来作为它的后端。Wilddog可以作为一个很好的实时后端。

## 在React应用中使用Wilddog

首先看一下[react首页](http://facebook.github.io/react/)中的Todo App。在这个例子中`this.state`用来保持跟踪输入框中的文本和tod中的列表。
当React保证DOM和`this.state`保持同步时，页面上的任何变化都不会被持久化。如果你添加了一些项目后刷新页面，你添加的所有内容都会不见，因为React没有持久化保存数据的机制。
需要有另一个框架来完成数据持久化的工作。

**Wilddog 可以自然地为React提供实时后端和数据存储。** 首先，你需要把Wilddog加入到你的项目中。

```html
<!-- React JS -->
<script src="https://fb.me/react-0.13.3.js"></script>
<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>
<!-- Wilddog -->
<script src="https://cdn.wilddog.com/sdk/js/current/wilddog.js"></script>

``` 

现在我们已经把Wilddog引入到了这个 Todo App中。我们可以从Wilddog数据库中把项目读出并加到列表中。
我们使用`componentWillMount` 这个hook，在React组件中`componentWillMount`的作用是在当前组件初始化的时候执行一次。

```js
componentWillMount: function() {
  this.wilddogRef = new Wilddog("https://WildReactTodoApp.wilddogio.com/items");
  this.wilddogRef.on("child_added", function(dataSnapshot) {
    this.items.push(dataSnapshot.val());
    this.setState({
      items: this.items
    });
  }.bind(this));
}
```
这部分代码的作用是首先`new` 一个 item列表的引用。每当一个新的item被添加，`on()` 中传入的函数都会被执行一次。
注意：每一个存在的item都会触发这个函数的执行，而不只是在调用`on()`之后新增的item。这意味着你能够更方便的遍历数据，不需要区分数据是已有的还是新增加的。
所以，上面的代码在初始化的时候被执行，所有已经存在的item都会通过触发这个回调函数被添加到`this.state`中。

如何添加新的item呢？非常简单

```js
handleSubmit: function(e) {
  e.preventDefault();
  this.wilddogRef.push({
    text: this.state.text
  });
  this.setState({text: ""});
}
```
在`handleSubmit()` 中，一个新的item会被添加到Wilddog数据库中。
调用 `setState()`更新 this.state.text，但并不需要更新this.state.items,因为在原始的React代码中已经存在这个逻辑了。

最后一件需要做的事情是在React 组件生命周期结束的时候做清理工作了。

```js
componentWillUnmount: function() {
  this.wilddogRef.off();
}
```

仅仅这几行代码，就可以给一个React应用添加Wilddog 实时后端。所有的数据都是实时更新的。而且页面刷新之后数据还依然存在。
你甚至可以同时打开多个相同的页面，你会发现所有页面的内容都是实时同步的。

## WildReactMixin

尽管将Wilddog集成进React App 已经足够简单了，我们还是希望能够让开发者使用起来更加简单。为了让`this.state`与Wilddog中的一个节点保持同步，我们开发了WildReactMixin

首先，我们将WildReact引入页面。


```html
<!-- React JS -->
<script src="https://fb.me/react-0.13.3.js"></script>
<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>
<!-- Wilddog -->
<script src="https://cdn.wilddog.com/sdk/js/current/wilddog.js"></script>
<script src="https://cdn.wilddog.com/libs/wildreact/0.1.0/wildreact.min.js"></script>
``` 

> 你也可以通过 `npm install wildreact` 或 `bower install wildreact` 安装 WildReact 和相关依赖。

将`WildReactMixin` 放到`TodoApp` 组件的`mixin`属性中，你就可以在这个组件中使用了。

```js
var TodoApp = React.createClass({
  mixins: [WildReactMixin],
  ...
});

```

`WildReactMixin`的作用是扩展`TodoAPP`的功能，提供几个Wilddog相关的方法。现在我们把 `componentWillMount()`的代码做如下修改就可以保证`this.state.items`与数据库保持同步了。

```js
componentWillMount: function() {
  var ref = new Wilddog("https://WildReactTodoApp.wilddogio.com/items");
  this.bindAsArray(ref, "items");
}

```
我们只是简单的将一个特定的Wilddog 引用绑定到 `this.state.items` 上，就可以实现从Wilddog到 `this.state.items`的单向数据绑定。你可以绑定一个数组或简单的javascript对象。
当Wilddog数据库中相应的数据发生了任何变化都会被同步到`this.state.items`。
但是这个绑定只是单向的数据绑定，意味着`this.state.items`上做的任何修改都不会被同步到Wilddog。所以，修改应该直接写入Wilddog而不是改变`this.state.items`。

```js
handleSubmit: function(e) {
  e.preventDefault();
  this.firebaseRefs.items.push({
    text: this.state.text
  });
  this.setState({ text: "" });
}

```

## 下一步

ReactJS是创建用户UI的强大框架，如果要选一个工具来用作其后端的话，Wilddog无疑是最简单而且最强大的。仅仅几行代码就可以展示实时数据同步结合ReactAPP的强大。

下一步你可以对照 [WildReact文档](https://github.com/WildDogTeam/lib-js-wildreact/blob/master/API.md)，并且开始构建自己的APP了！