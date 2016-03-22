
## API文档


## 初始化

在 React 组件中使用 WildReactMixin 首先需要把 WildReactMixin 加入到组件的 mixins 列表：

```js
var ExampleComponent = React.createClass({
  mixins: [WildReactMixin],
  ...
});
```

## API参考

#### bindAsArray(wilddogRef, bindVar, cancelCallback)


**描述：**

从 Wilddog 数据库节点到你的 React 组件中 `this.state` 创建一个单向数据绑定的数组，bindVar 变量代表你存储在 this.state 中数组的名称。


**Arguments：**

wilddogRef - Wilddog：选择与数组绑定的数据库节点引用。

bindVar - string：选择与数据库绑定的数组名称，也是 this.state 的属性名称。

cancelCallback - function：可选回调函数，当你的客户端没有权限读取这些数据（或者原来有权限，现在权限被取消）时会调用此函数，调用时会传递一个表明发生故障原因的 Error 对象。

**示例：**

下面的代码将把数据以数组的形式存储在 /items/ 节点，并且可以在你的组件中使用 this.state.items 来访问。

```js
componentWillMount: function() {
  var ref = new Wilddog("https://<YOUR-WILDDOG-APP>.wilddogio.com/items");
  this.bindAsArray(ref, "items");
}
```

绑定的数组中，每条数据都有一个 .key 属性，该属性代表数据存储的 key 值，比如，你有一条数据是在 /items/-Jtjl482BaXBCI7brMT8/，那么这条数据的 .key 属性值为 "-Jtjl482BaXBCI7brMT8"。

如果在数据库中有一条数据的值是一个基本数据类型（boolean/string/number），那么这条数据的值将会保存在 .value 属性。
如果数据的值是一个对象，那么此对象的每条属性都将以绑定数据的属性的形式存储。举例说明：我们假定绑定的 /items/ 节点包含以下数据：

```js
{
  "items": {
    "-Jtjl482BaXBCI7brMT8": 100,
    "-Jtjl6tmqjNeAnQvyD4l": {
      "first": "fred",
      "last": "Flintstone"
    },
    "-JtjlAXoQ3VAoNiJcka9": "foo"
  }
}
```

那么绑定之后被存储到 this.state.items 的结果将会是：

```js
[
  {
    ".key": "-Jtjl482BaXBCI7brMT8",
    ".value": 100
  },
  {
    ".key": "-Jtjl6tmqjNeAnQvyD4l",
    "first": "Fred"
    "last": "Flintstone"
  },
  {
    ".key": "-JtjlAXoQ3VAoNiJcka9",
    ".value": "foo"
  }
]
```


#### bindAsObject(wilddogRef, bindVar, cancelCallback)

**描述：**

从 Wilddog 数据库节点到你的 React 组件中 this.state 创建一个单向数据绑定的对象，bindVar 变量代表你存储在 this.state 中对象的名称。


**Arguments：**

wilddogRef - Wilddog：选择与对象绑定的数据库节点引用。

bindVar - string：选择与数据库绑定的对象名称，也是 this.state 的属性名称。

cancelCallback - function：可选回调函数，当你的客户端没有权限读取这些数据（或者原来有权限，现在权限被取消）时会调用此函数，调用时会传递一个表明发生故障原因的 Error 对象。


**示例：**

下面的代码将把数据以数组的形式存储在 /items/ 节点，并且可以在你的组件中使用 this.state.items 来访问。

```js
componentWillMount: function() {
  var ref = new Wilddog("https://<YOUR-WILDDOG-APP>.wilddogio.com/users/fred");
  this.bindAsObject(ref, "user");
}
```

绑定的对象将会包含一个 .key 属性，该属性指定了对象存储的 key 值，所以在上面的代码中，我们绑定的位置是 /users/fred/，那么绑定对象将会有一个 .key 属性且值为 "fred"。

如果数据库中绑定的节点值为一个基本数据类型（boolean/string/number），那么该值会被存储在 .value 属性中，如果绑定的节点值为一个对象，那么每个对象的值都是绑定对象的属性值。
举例说明，我们假设 /users/fred/ 节点数据来源如下：

```js
{
  "users": {
    "fred": true
  }
}
```

那么存储在 this.state.user 中的绑定对象的值将会是 ：

```js
{
  ".key": "fred",
  ".value": true
}
```

再举一个例子，我们假设 /users/fred/ 节点包含一个对象：

```js
{
  "users": {
    "fred": {
      "first": "Fred",
      "last": "Flintstone"
    }
  }
}
```

那么，存储在 this.state.user 中的绑定对象的值将会是：

```js
{
  ".key": "fred",
  "first": "Fred",
  "last": "Flintstone"
}
```

最后，我们假设 /users/fred/ 节点不存在（那么它将会有一个null值），那么存储于 this.state.user 的绑定对象为：

```js
{
  ".key": "fred",
  ".value": null
}
```

#### unbind(bindVar)

**描述：**

将数据库与输入绑定变量之间的绑定解绑。

**Arguments：**

bindVar - string：定义绑定是存储与 this.state 中的属性名称。

**示例：**

下面的示例将会解绑 this.state.items 并设置它的值为 undefined

```js
componentWillUnmount: function() {
  this.unbind("items");
}
```