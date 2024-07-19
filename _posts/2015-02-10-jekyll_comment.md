---
title: Jekyll 系列（六）：添加评论功能
category: 随笔
tags: [Jekyll]
create_time: 2015-02-10
update_time: 2021-08-06
---

刚开始完成博客部署时，并没有考虑到需要添加评论功能。原因大致有三：

- 各方面符合心理预期的评论服务太少，且不稳定；
- 自己不打算主动推广，估计没太多人能看到；
- 主要还是觉得自己输出的内容很一般。。。

但是随着文章数量的逐渐累积，以及心态的变化，没有评论的博客给人的感觉像是把网游完成了单机。缺少人与人之间的交流，永远都是故步自封，没有成长。

决定了就要马上执行，开始为博客添加评论功能！🚀

## 1. 工具选型

在添加评论功能之前先确定一下选型的需求：

- 服务足够稳定；
- 评论数据可以备份（避免停止服务后丢失评论数据）；
- 访问速度不能太慢；
- 交互方便易用；
- 支持 Markdown；
- 样式简洁美观；
- 最好能够不收费、无广告。🌚

评论服务属于第三方服务，评论数据都存在服务提供方的服务器上，当其服务停止时，博客中的评论功能也都失效了，因此刚开始就选到合适评论服务还是能给日后省心不少。

当然如果你有充沛的时间、精力，完全可以按照自己的意愿搭建一套评论服务。

带着这些需求，最终我找到以下三个开源库：

- [gitalk](https://github.com/gitalk/gitalk)

  完全符合预期。

- [gitment](https://github.com/imsun/gitment)

  和 gitalk 相比，其分页样式还需要优化以下。

- [utterances](https://github.com/utterance/utterances)

  与前两个相比，虽然比较 “年轻”，但也完全符合预期。

同时三者都有一个共同点：都是借助于 GitHub Issues 来实现评论功能。

这个有优点也有缺点，优点就是可以确保服务稳定，对于评论服务来说，这是天然的优势；缺点也很明显：游客不能评论（需要使用 GitHub 账号登录）、访问速度可能不稳定。

作为部署到 GitHub Pages 上的博客，其实已经对访问速度的性能有所妥协了，但如今的技术人员谁还不备把梯子呢。🚀

针对游客不能评论这个问题，如果从其他方面思考，其实也未尝不是优点：限制了一部分无意义评论。

GitHub Pages 赋予博客技术属性，面向的读者自然就是技术人员（GitHub 账号拥有者大多为技术人员），这样不仅能确保评论更有价值，防止恶意灌水，也能让整个评论氛围更和谐、友好。

综上，最后我选择了使用 gitalk 搭建我的评论服务，大家可以参考我的总结选择自己最喜欢的工具来搭建评论服务。

## 2. 接入评论服务

如何使用 gitalk 搭建评论服务，其 [README](https://github.com/gitalk/gitalk/blob/master/readme.md) 中已经有详细的描述，并且还有 [中文版说明](https://github.com/gitalk/gitalk/blob/master/readme-cn.md)，我这就针对每个步骤简单说明一下。

### 2.1. 安装

- 直接引入

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css" />
  <script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>

  <!-- or -->

  <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css" />
  <script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
  ```

- npm 安装

  ```javascript
  npm i --save gitalk
  ```

  ```javascript
  import 'gitalk/dist/gitalk.css';
  import Gitalk from 'gitalk';
  ```

### 2.2. 使用

这一步需要一个公开的 GitHub 仓库，评论数据就存储在这个仓库的 Issues 中。

然后还需要创建 OAuth Application，点击 [此处](https://github.com/settings/applications/new) 创建。

![创建 OAuth Application 界面](https://i.loli.net/2021/08/05/sbDxMnPEQ52eqpw.png)

点击 “Register application” 就能得到之后需要用到的 `Client ID` 以及 `Client secrets`。

❗ **注：刚生成的 Client secrets 需要马上记录下来，因为属于重要信息，页面刷新后数据就会被隐藏。只不过忘记了也可以生成一个新的 Client secrets。**

![OAuth Application 信息](https://i.loli.net/2021/08/05/VX8KxSFWkQnDAMw.png)

之后的步骤就比较简单了：

在界面合适的位置添加评论容器，用于展示评论服务的相关内容：

```html
<div id="gitalk-container"></div>
```

配置并实例化 gitalk：

其中的 `clientID`、`clientSecret` 就是刚刚注册 OAuth Application 时得到的 `Client ID`、`Client secrets`。

```javascript
var gitalk = new Gitalk({
  clientID: 'Oauth Application Client ID',
  clientSecret: 'Oauth Application Client Secret',
  repo: 'zyuandong.github.io', // 存储评论数据的仓库名
  owner: 'zyuandong', // 仓库的拥有者
  admin: ['zyuandong'], // 仓库的拥有者
  id: location.pathname, // 用于标记需要评论的页面
});

gitalk.render('gitalk-container');
```

更多详细配置请查看：[README](https://github.com/gitalk/gitalk/blob/master/readme.md)。

最终效果，为了适配不同主题，改了一点样式：

![明亮主题](https://i.loli.net/2021/08/05/TnySBPkImFLztdH.png)

![暗黑主题](https://i.loli.net/2021/08/05/DzavpgOEjC9Xyhf.png)

## 3. 参考

- [gitalk](https://github.com/gitalk/gitalk)
- [gitment](https://github.com/imsun/gitment)
- [utterances](https://github.com/utterance/utterances)
- ...

{% comment %}

- [Gitalk 评论插件使用教程](https://segmentfault.com/a/1190000018072952)

{% endcomment %}
