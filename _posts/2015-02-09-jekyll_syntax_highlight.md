---
title: Jekyll 系列（五）：Syntax Highlight
category: 随笔
tags: [Jekyll]
create_time: 2015-02-09
update_time: 2021-08-04
---

技术类型的博客自然少不了示例代码，不仅如此，为了优化阅读体验，还需要对示例代码进行语法高亮展示。

本文在 Jekyll 的基础上会逐步给大家介绍：如何让自建博客中的示例代码拥有语法高亮效果，自己总结的经验，避免大家踩同样的坑。

## 1. Markdown 处理器

Markdown - 技术人员编写文档利器，简洁的语法立即就能输出格式良好的文档，而且跨平台通用，还不会影响结果格式，很好的诠释了它「易读易写」的宗旨。除了图片不能和文档一起离线同步外，再也找不到其他缺点。🚀

因此本博客的文章也都是使用 Markdown 文档编写的，对于格式排版非常方便。

说到这里可能会有人提出疑惑：「 Markdown 并不是 HTML 文件，没法被浏览器直接解析，那如何才能在浏览器中看到 Markdown 文档中的内容呢？」

其实 Jekyll 很重要的一个功能就是将 Markdown 转化为 HTML 文件，执行过 `jekyll build` 命令的小伙伴，可以查看一下生成的 `_site` 目录，里面就包含了最终转化后的 HTML 文件。

转化过程中能够正确识别 Markdown 语法，并转化为对应样式的 HTML 标签，这都得依赖于 Markdown 处理器。

由于 Markdown 标准语法支持的样式不多，逐渐地就出现了很多扩展语法（例如 GFM 等），并且标准不统一，因此 Markdown 处理器也有很多：kramdown、maruku、rdiscount、redcarpet 等。

Jekyll 默认的 Markdown 处理器就是 [kramdown](https://kramdown.gettalong.org/)，并且 GitHub Pages 也支持 [kramdown](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/setting-a-markdown-processor-for-your-github-pages-site-using-jekyll)。

### 1.1. 配置

通过配置 `_config.yml` 文件，我们就可以为 Jekyll 指定 Markdown 处理器，甚至于是自己编写的处理器，这里就使用之前确定好的 kramdown：

```yaml
# _config.yml 文件

# Markdown Processors
markdown: kramdown
```

为了最终语法高亮的效果能达到心中的预期，还可以进一步对 kramdown 进行配置。相关部分的所有配置

```yaml
# _config.yml 文件

# Markdown Processors
markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    css_class: highlight
    default_lang: console
    span:
      line_numbers: false
    block:
      line_numbers: true
      start_line: 1
```

详细配置请参考：[Markdown Options](https://jekyllrb.com/docs/configuration/markdown/)

配置示例中的一些常规配置都比较好理解，例如：是否显示行号、行号开始值、默认语言等。其中有这么两项配置：

```yaml
kramdown:
  input: GFM
  syntax_highlighter: rouge
```

这两项配置相关的内容让我踩了不少坑，接下来我就扩展讲一下这个过程。

### 1.2. GFM

首先是 GFM（GitHub Flavored Markdown），这是 GitHub 在 Markdown 标准语法之上的一个扩充，扩充的语法有且不限于：删除线、TODO 列表、以及支撑语法高亮的代码块等。

方便的是 `input: GFM` 就是默认配置，意味着没有这一项，Markdown 的扩展语法也能正常解析。

但由于不熟悉官方文档的原因，我最开始的配置为 `input: Kramdown`，这就导致刚刚提到的扩展语法不能正常解析。

再去阅读文档才发现，如果配置为 `input: Kramdown` 就还需要引入其他的配置，以及为此引入其他 gem。

这个坑也算自己有意去尝试的吧，至少明白了不同配置的差异，最后还是 GFM 香。🌚

### 1.3. Rouge

[Rouge](http://rouge.jneen.net/) 是使用 Ruby 实现的语法高亮工具，支持 205 种语言，且主题已完全兼容 [Pygments](https://pygments.org/)。

📌 _Pygments 也是优秀的语法高亮工具，较早的资料中都是推荐 Pygments 来解决语法高亮。但它依赖于 Python，在整个 Jekyll 的 Ruby 生态下，显得有点格格不入，直到 Rouge 出现后，就逐渐被替代_

Rouge 已经是 Jekyll、Kramdown 的依赖之一：

![Rouge](https://i.loli.net/2021/08/02/5XYxo78wnm1MWiy.png)

Rouge 是 GitHub Pages 推荐的语法高亮工具，而在 Jekyll 文档中是推荐 coderay 做语法高亮：`syntax_highlighter: coderay`。

但因为最终是部署到 GitHub Pages 服务上，为了防止意外发生，还是建议使用 GitHub Pages 推荐的 Rouge 吧，对应的需要在 \_config.yml 文件中修改 plugins 配置项：

```yaml
# _config.yml 文件

# Plugins
plugins:
  - rouge
```

到此，我原以为已经能够看到最终语法高亮的效果，但除了代码块内容格式正常之外，并没有高亮的效果。

无论是使用 Markdown 的代码块语法，还是 Jekyll 的代码块语法：{% raw %}`{% highlight ruby linenos %}//...{% endhighlight %}`{% endraw %}，最终都没有高亮的效果。

## 2. 最终实现

其实，之所以没有高亮效果，是因为没有对应的样式文件。查阅文档后，我推荐两种获取样式文件的方式，最后都能得到代码语法高亮的效果。

### 2.1. Rouge Styles

Rouge 可以通过命令行的方式，输出指定主题的样式文件：

`rougify style monokai.sublime > syntax.css`

此条命令就是输出主题为 monokai.sublime 的样式代码，在执行命令的当前目录下生成 syntax.css 文件。

最后只需要在项目合适的位置引入此样式文件就能实现最终的语法高亮效果。

以下两条常用的命令：

- `rougify list`：查看所有支持的语言

- `rougify help style`：查看所有样式主题

### 2.2. highlight.js

除了使用 Rouge 生成的样式文件，还可以选择 [highlight.js](https://highlightjs.org/)，也是用于页面中的代码语法高亮，主题样式更丰厚，支持语言也很多，并且能与 Rouge、Pygments 完美兼容。

使用也很方便：

- 下载

  从 [highlight.js 官网](https://highlightjs.org/download/) 下载资源文件，或者使用 `npm install highlight.js` 安装 node_module 包。

  📌 _下载资源文件时，还能勾选特定支持的语言_

- 引入

  以标签方式引入为例：

  ```html
  <!-- 样式文件可以根据需求更换为其他样式文件 -->
  <link rel="stylesheet" href="/path/to/styles/default.css" />
  <script src="/path/to/highlight.min.js"></script>
  <script>
    hljs.highlightAll();
  </script>
  ```

  highlight.js 将查找并高亮显示 `<pre><code>...</code></pre>` 标签内的代码。

  完成以上就能实现代码语法高亮效果。

更多详细使用方式，请查看：[How to use highlight.js](https://highlightjs.org/usage/)。

文中有不足之处，欢迎多多拍砖。🚀

## 3. 参考

- [Markdown Syntax](https://daringfireball.net/projects/markdown/syntax)
- [Markdown 语法说明](http://www.markdown.cn/)
- [Configuration - Jekyll](https://jekyllrb.com/docs/configuration/)
- [Syntax highlighting - GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#syntax-highlighting)
- [List of supported languages and lexers](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers)
- [Rouge](http://rouge.jneen.net/)
- [highlight.js](https://highlightjs.readthedocs.io/en/latest/index.html)
- ...

{% comment %}

- [wx: 学习 jekyll 背后的技术原理（静态网站）](https://mp.weixin.qq.com/s?src=11&timestamp=1622535289&ver=3103&signature=Ugb3Nlzg*4hEd20stLGwLrQufRfwaWWBNyQftc2uWqKeP4Yxk0itXXzlum2PmnEMhkPRdfvHcUlzYv2DwKB6xQ1krLn2sRjX7qkZMqHt6WMEML2u-PQa*o3ESsQTo25K&new=1)
- [jekyll php 高亮代码,[Html]Jekyll 代码高亮的几种选择\_html/css_WEB-ITnose](https://blog.csdn.net/weixin_34434948/article/details/116058330)
- [Jekyll 使用 Rouge 主题](https://www.cnblogs.com/baiyangcao/p/jekyll_rouge.html)

{% endcomment %}
