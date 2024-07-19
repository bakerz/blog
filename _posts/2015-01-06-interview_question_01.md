---
title: JavaScript 基础练习（一）
category: 技术
tags: [JavaScript]
create_time: 2015-01-06
---

本文记录了我刚学习 JavaScript 时遇到的一些练习题，刚看到时可能会感觉很简单，但其中包含了一些容易被忽视的知识点，也从另一个方面体现了基础对于程序员是多么重要。

练习题的解答大多是我自己的理解，可能会存在思考不足的情况，或许有其他更优的解答，热烈欢迎大家拍砖指教。

因为练习题数量较多，篇幅太长不方便阅读，所以我分成了几个部分，跳转链接放在本文最后。

## 1. 实现 Array.indexOf() 方法

一个数组，输入数组元素，可以得到对应下标，若没有检索到字符，则返回-1，即实现 indexOf()方法。

> string.indexOf(str,start);

- str：要检索的字符串。
- start：可选，检索的起始下标位置。范围 [0, length-1]。

实现：

```javascript
var arr = [12, 43, 5, 67, 323, 224, 434, 434];

Array.prototype.myindexOf = function (num, start) {
  if (!start) start = 0;
  var len = this.length;
  for (var i = start; i < len; i++) {
    if (this[i] == num) return i;
  }
  if (i == len) return -1;
};

console.log(arr.myindexOf(434)); // >> 6
```

## 2. 实现 String.indexOf() 方法

```javascript
// TODO
```

## 3. 字符串解码

字母与数字混排的字符串，如“ad2ff3”，编写算法将两个数字之间的字符串以后一个数字的次数重复排列，若开头没有数字，则将第一个数字前的字符串按该数字重复排列。

示例：

- 输入：`ad2ff3`
- 输出：`adadffffff`

实现：

```javascript
var str = '1faAdB2ff3';

function getCode(str) {
  var num_arr = str.match(/\d+/g);
  var str_arr = str.match(/[A-z]+/g);
  var str_res = '';
  if (str.indexOf(num_arr[0]) === 0) {
    //按题意是否需要删除以数字开头的部分
    for (var i = 0, len = num_arr.length; i < len - 1; i++) {
      num_arr[i] = num_arr[i + 1];
    }
    num_arr.pop();
  }
  for (var j = 0, str_len = str_arr.length; j < str_len; j++) {
    if (num_arr[j]) {
      for (var n = 1; n <= num_arr[j]; n++) {
        str_res += str_arr[j];
      }
    } else {
      str_res += str_arr[j];
    }
  }
  return str_res;
}

console.log(getCode(str)); // >> faAdBfaAdBffffff
```

## 4. 文件名后缀

设计算法，获取文件名后缀。

示例：

- 输入：`test.txt`
- 输出：`.txt`

实现：

```javascript
var str = 'test.txt';

function getFileType(str) {
  var index = str.lastIndexOf('.');
  var str_res = str.substr(index);
  return str_res;
}

console.log(getFileType(str)); // >> .txt
```

扩展：

- `slice(start,end)` - 按下标取子字符串`[start,end)`，参数都可以为负数，但必须保证`start`对应的下标位置在`end`对应下标位置的左边，否则，返回“”。

- `substr(start,length)` - 按长度取子字符串，`start`可为负数。

- `substring(start,end)` - 按下标取子字符串`[start,end)`，参数为负数便会转换为 0，若`start > end`则先调换参数位置，若`start = end`，返回“”。

## 5. 解析数据生成 HTML 片段

遍历数组数据，并将其包裹上 HTML 标签。

示例：

- 输入：`[{'children':[{'name':'xx','age':12},{'child':[{'name':'gg','age':11}]}]}]`
- 输出：

```html
<ul>
  <li>name</li>
  <li>age</li>
</ul>
<ul>
  <li>
    <ul>
      <li>name</li>
      <li>age</li>
    </ul>
  </li>
</ul>
```

实现：

```javascript
var item = [{ children: [{ name: 'xx', age: 12 }, { child: [{ name: 'gg', age: 11 }] }] }];

function getJsonHTML(item) {
  var str = '';
  for (var i = 0, len1 = item.length; i < len1; i++) {
    if (item[i].children) {
      for (var j = 0, len2 = item[i].children.length; j < len2; j++) {
        str += '<ul>';
        if (item[i].children[j].child) {
          str += '<li><ul>';
          for (var k = 0, len3 = item[i].children[j].child.length; k < len3; k++) {
            str +=
              '<li>' +
              item[i].children[j].child[k].name +
              '</li>' +
              '<li>' +
              item[i].children[j].child[k].age +
              '</li>';
          }
          str += '</ul></li>';
        } else {
          str +=
            '<li>' +
            item[i].children[j].name +
            '</li>' +
            '<li>' +
            item[i].children[j].age +
            '</li>';
        }
        str += '</ul>';
      }
    }
  }
  return str;
}

console.log(getJsonHTML(item));
```

## 6. 数组提重

取出 js 数组中重复的元素。

示例：

- 输入：`[3,'hello',5,6,4,3,'hello']`
- 输出：`[3,'hello']`

实现一：

```javascript
var a = [3, 'hello', 5, 6, 4, 3, 'hello'];
Array.prototype.duplicate = function () {
  var tmp = [];
  this.concat()
    .sort()
    .sort(function (a, b) {
      if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
    });
  return tmp;
};
console.log(a.duplicate());
```

实现二：

```javascript
//适用基础数据类型（空间换时间的方案）
function duplicates(list) {
  var cache = {},
    own = Object.prototype.hasOwnProperty,
    r = [];
  for (var i = list.length; --i >= 0; ) {
    var item = list[i],
      key = item.toString();
    if (!own.call(cache, key)) {
      cache[key] = 1;
    } else {
      r.push(item);
    }
  }
  return r;
}
```

实现三：

```javascript
var a = [3, 'hello', 5, 6, 4, 3, 'hello'];

function duplicate(source) {
  var ret = [],
    cache = [];
  source
    .concat()
    .sort()
    .sort(function (a, b) {
      if (a == b) {
        var key = typeof a + ':' + a;
        if (!cache[key]) {
          cache[key] = true;
          ret.push(a);
        }
      }
    });
  return ret;
}

// test
console.log(duplicate(a));
```

## 7. 字符串提重

给定一个字符串，请写一段代码找出这个字符中首先出现两次的那个字符。

示例：

- 输入：`qywyer23tdd`
- 输出：`y`

实现：

```javascript
var str = 'qywyer23tdd';

function getKey(str) {
  var str_arr = str.split('');
  for (var i = 0, len = str_arr.length; i < len; i++) {
    if (str.indexOf(str_arr[i], i + 1) !== -1) {
      return str_arr[i];
    }
  }
}

console.log(getKey(str)); // >> 'y'
```

## 8. 数组拼接得最小数

给定一个整型数组，对这个整数数组排序，使得按序拼接数组各元素得到的值最小。示例：[3,83,8,13,1]，被排序后的数组为[1,13,3,83,8]，依次拼接得到的最小数 1133838

```javascript
// TODO
```

## 9. 变量式函数与定义式函数

判断一下代码的输出结果

```javascript
var x = 0;

var f = function () {
  x = 1;
};

f();

console.log(x);

function f() {
  x = 2;
}

f();

console.log(x);
```

输出：

- 第一个 console.log(x): 1
- 第二个 console.log(x): 1

解答：

第一个为“变量式”函数，第二个函数为“定义式”函数，其实 JavaScript 执行引擎并非一行一行地分析和执行程序，而是一段一段地分析和执行的。而且，在同一段程序的分析执行中，定义式的函数会被提取出来优先执行。函数定义执行完之后，才会按顺序执行其他语句代码。

## 10. 判断 this 指向

判断以下代码的输出

```javascript
function say() {
  console.log(this.name);
}

var name = 'name1';

var person = {
  name: 'name2',
  say: say,
};

person.say();

say();
```

输出：

- `name2`
- `name1`

## 文章链接

- [JavaScript 基础练习（一）]({% link _posts/2015-01-06-interview_question_01.md %})
- [JavaScript 基础练习（二）]({% link _posts/2015-01-07-interview_question_02.md %})
