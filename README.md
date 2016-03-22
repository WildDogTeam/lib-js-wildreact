quick start
----------------------

## WildReact

`ReactJS` 是一个用于构建大型、复杂用户界面的框架。Wilddog 开发的插件可以为 React 组件的状态迁移提供一个完美易用而且实时的数据源。
使用 WildReact 仅需数行 JavaScript 代码便可将 Wilddog 集成到 React 应用中。

## 第一步 创建账号和应用

参见 [JavaScript SDK 快速入门](https://z.wilddog.com/web/quickstart) 应用创建一节。

## 第二步 引入 Wilddog JavaScript SDK 和 WildReact

为了在我们的应用当中使用 WildReact，需要加入一些别的依赖到 `<head>` 中，我们建议你直接使用 Wilddog 所提供的CDN：

```html
<!-- React JS -->
<script src="https://fb.me/react-0.13.3.js"></script>
<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>

<!-- Wilddog JavaScript SDK -->
<script src = "https://cdn.wilddog.com/sdk/js/current/wilddog.js" ></script>

<!-- WildReact -->
<script src = "https://cdn.wilddog.com/libs/js/wildreact/0.1.0/wildreact.js" ></script>  
```

> 你也可以使用 `npm install wildreact` 来安装 WildReact 和它的所有依赖


## 第三步 使用 WildReact

使用 WildReact 与普通的 React mixin 组件没有什么不同，不过，我们为它添加了几个使用 Wilddog 所需要的特殊方法。
这些方法使得我们能够让 Wilddog 中的数据与 React 组件的 `this.state` 变量之间建立绑定关系。
添加 `WildReact` 到我们组件的 `mixins` 列表中：

```js
var ExampleComponent = React.createClass({
  mixins: [WildReactMixin],
  ...
});

```

## 第四步 绑定到 Wilddog

由于 WildReactMixin 所提供的数据绑定功能，远端数据库中的任何变化都会被实时反映到 `this.state` 中。反过来的话这种绑定关系是无效的——直接对`this.state` 所做的修改并不会反映到远端数据库中。
我们想对 `this.state` 做任何修改时都应该通过调用 Wilddog 客户端的 API 来完成，WildReactMixin 会察觉到远端数据库的变化并更新 `this.state`。  

> WildReactMixin建立的是一种从远端数据库到我们组件的单向数据绑定关系

拿上面的 `ExampleComponent` 举例来说，我们可以通过在组件的 `componentWillMount()` 方法中使用 WildReactMixin 使得远端的数据库某个 `items` 节点的任何改变与我们组件的 `this.state.items` 保持同步：

```js
componentWillMount: function() {
  var ref = new Wilddog("https://<YOUR-Wilddog-APP>.wilddogio.com/items");
  this.bindAsArray(ref, "items");
}

```

现在，如果我们在远端数据库向 `items` 节点下添加一个新数据，那么这个变化会被自动反映到 `this.state.items` 中。我们可以选择将远端数据同步为 JavaScript 数组（使用 `bindAsArray()`）或是对象（使用 `bindAsObject()`） 。


## 第五步 取消对 Wilddog 的绑定

当我们的 React 组件将超出范围或被卸载时，WildReactMixin 将会自动取消对于所有处于打开状态的 Wilddog 连接的绑定。如果我们想更早一些手动执行这个操作（即在组件仍处于挂载状态时），WildReactMixin 提供了一个 `unbind()` 方法。例如，当我们不再想要 `this.state.items` 被绑定到远端数据节点，我们可以在组件中的任何地方调用 `this.unbind("items")`。

## 下一步

**开发向导**

[开发向导](https://github.com/WildDogTeam/lib-js-wildreact/blob/develop/GUIDE.md)


**API文档**

[API文档](https://github.com/WildDogTeam/lib-js-wildreact/blob/develop/API.md)