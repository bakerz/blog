---
title: Jekyll 系列（二）：初识模板语言 Liquid
category: 随笔
tags: [Jekyll, Liquid]
---

Liquid 是一门开源的模板语言，何为模板语言呢？

我的理解是：

在 HTML 的基础之上，通过一些逻辑语法、变量等控制页面上动态变化的部分，最终生成符合预期的静态文件。

举个例子：

模板语言就像一台甜品加工机器，每个模板语言写好的文件就像一个模子，数据就是制作甜品的原材料；注入不同的 “原材料”，再加上特定的 “模子”，最终就能得到一个特定样式、内容不同的 “甜品” 啦。🎂

接下来就大致介绍一下 Liquid。

Liquid 代码分为三类：Object、Tags、Filters。

## 1. Object

Object 就是在文档需要展示内容的位置，用双花括号 {% raw %}`{{ }}`{% endraw %} 包裹对象或变量名。

数据：

```json
{
  "post": {
    "title": "Template language: Liquid"
  }
}
```

输入：{% raw %}`{{ post.title }}`{% endraw %}

输出：`Template language: Liquid`

## 2. Tags

Tags 主要用于模板的逻辑控制，包括循环、判断等，由单括号加百分号标识：{% raw %}`{% %}`{% endraw %}。

一下列举一些常用的 Tags。

### 2.1. 控制流

控制流标记（control flow tag）能够根据编程逻辑改变 Liquid 输出的信息。

#### 2.1.1. if

只有当某个条件为 true 时才执行一段代码。

{% raw %}

```liquid
{% if post.title == 'Template language: Liquid' %}
  Template language: Liquid
{% endif %}

输出： Template language: Liquid
```

{% endraw %}

#### 2.1.2. unless

与 if 相对 – 只有当某个条件不成立时才执行一段代码。

{% raw %}

```liquid
{% unless post.title == 'Liquid' %}
  Template language: Liquid
{% endunless %}

输出： Template language: Liquid
```

和下面代码结果一致，注意判断条件：

```liquid
{% if post.title != 'Liquid' %}
  Template language: Liquid
{% endif %}

输出： Template language: Liquid
```

{% endraw %}

#### 2.1.3. elsif / else

为 if 或 unless 添加更多状态判断。

{% raw %}

```liquid
{% if post.title == 'Liquid' %}
  Liquid
{% elsif post.title == 'Template language: Liquid' %}
  Template language: Liquid
{% else %}
  Nothing
{% endif %}

输出： Template language: Liquid
```

{% endraw %}

#### 2.1.4. case / when

case / when 和 JavaScript 的 switch 语法是类似的：

{% raw %}

```liquid
{% case post.title %}
  {% when 'Liquid' %}
    Liquid
  {% when 'Template language: Liquid' %}
    Template language: Liquid
  {% else %}
    Nothing
{% endcase %}

输出： Template language: Liquid
```

{% endraw %}

### 2.2. 循环

#### 2.2.1. for

重复输出一段代码。

{% raw %}

```liquid
{% for i in (1..5) %}
  {{ i }}
{% endfor %}

输出：1 2 3 4 5
```

`break`、`continue` 关键字同样适用：

```liquid
{% for i in (1..5) %}
  {% if i == 4 %}
    {% break %}
  {% else %}
    {{ i }}
  {% endif %}
{% endfor %}

输出：1 2 3
```

```liquid
{% for i in (1..5) %}
  {% if i == 4 %}
    {% continue %}
  {% else %}
    {{ i }}
  {% endif %}
{% endfor %}

输出：1 2 3 5
```

`limit` - 限制循环次数

```liquid
{% for i in (1..5) limit:2 %}
  {{ i }}
{% endfor %}

输出：1 2
```

`offset` - 从指定索引号开始执行循环。

```liquid
{% for i in (1..5) limit:2 %}
  {{ i }}
{% endfor %}

输出：3 4 5
```

`reversed` - 反转循环的执行顺序。

```liquid
{% for i in (1..5) reversed %}
  {{ i }}
{% endfor %}

输出：5 4 3 2 1
```

{% endraw %}

还有一部分不常用的循环标记，例如：`cycle`、`tablerow` 等，可点击 [此处](https://shopify.github.io/liquid/tags/iteration/) 查看。

### 2.3. 变量

顾名思义，用于创建新的 Liquid 变量。

#### 2.3.1. assign

创建一个新的变量。

{% raw %}

```liquid
{% assign title = 'Template language: Liquid' %}
{{ title }}

输出：Template language: Liquid
```

{% endraw %}

#### 2.3.2. capture

capture 开始与结束标记之间的所有字符串赋值给一个新的变量。

{% raw %}

```liquid
{% capture title %}
  Template language: Liquid
{% endcapture %}

{{ title }}

输出：Template language: Liquid
```

字符串可以包含变量拼接而成：

```liquid
{% assign value = 'Liquid' %}

{% capture title %}
  Template language: {{ value }}
{% endcapture %}

{{ title }}

输出：Template language: Liquid
```

{% endraw %}

### 2.4. 模板

模板标记用来处理不需要解析的文档内容，以及使用特定的逻辑处理内容。

#### 2.4.1. comment

`comment` - 注释标记，通过 {% raw %}`{% comment %} {% endcomment %}`{% endraw %} 包裹需要注释的内容，包括 Liquid 代码：

{% raw %}

```liquid
{% comment %}
  {% assign title = 'test' %}
  {{ title }}
{% endcomment %}
```

{% endraw %}

#### 2.4.2. raw

`raw` - 原始内容标记，与 comment 相同的是 raw 也不会解析包裹的 Liqudi 代码；不同的是，包裹的内容会原封不动地在文档中展示出来，而不是被隐藏。

这在本文中展示 Liquid 标记起到了重要的作用，因为本文是基于 Liquid 解析的，因此当示例中包含 Liquid 代码时将会被自动解析，这显然不在预期结果之内。

使用 `raw` 标记便能禁止解析其包裹的代码，并将其包裹的原始内容直接输出。

用法，和其他 Tags 用法一样：

使用 {% raw %}`{% %}`{% endraw %} 包裹 `raw` 为开始标签；{% raw %}`{% %}`{% endraw %} 包裹 `endraw` 为结束标签。

❗**注：但经过实际验证 raw 标签不能嵌套，否则会报出语法错误**

## 3. Filters

| 过滤器         | 描述                                                                                                                                                     |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| abs            | 返回一个数字的绝对值                                                                                                                                     |
| append         | 返回两个字符串拼接之后的值                                                                                                                               |
| at_least       | 将数字限制在最小值                                                                                                                                       |
| at_most        | 将数字限制在最大值                                                                                                                                       |
| capitalize     | 将字符串首字母转为大写                                                                                                                                   |
| ceil           | 将一个浮点数向上取整并返回一个最接近的整数                                                                                                               |
| compact        | 删除数组中的所有空值                                                                                                                                     |
| concat         | 返回两个数组合并后的值                                                                                                                                   |
| date           | 将时间戳转换为指定的日期格式                                                                                                                             |
| default        | 设定默认值                                                                                                                                               |
| divided_by     | 返回两个数相除后的结果                                                                                                                                   |
| downcase       | 返回一个字符串，字符串中的所有字符转为小写形式                                                                                                           |
| escape         | 返回一个由十六进制转义序列替换的字符串（字符的 16 进制格式值,当该值小于等于 0xFF 时,用一个 2 位转移序列: %xx 表示. 大于的话则使用 4 位序列:%uxxxx 表示） |
| escape_once    | 转义一个字符串并且不修改已经转义过的实体                                                                                                                 |
| first          | 返回数组的第一项                                                                                                                                         |
| floor          | 将一个浮点数通过舍弃小数部分得到最近的整数                                                                                                               |
| join           | 将数组中的各个字符串合并为一个字符串，并将 split 参数作为字符串之间的分隔符                                                                              |
| last           | 返回数组中的最后一项                                                                                                                                     |
| lstrip         | 删除字符串左侧的所有空白符（制表符、空格和换行符）                                                                                                       |
| map            | 从对象中提取指定名称的属性的值，并用这些值构建一个数组                                                                                                   |
| minus          | 返回两个数相减后的结果                                                                                                                                   |
| modulo         | 返回除法运算的余数                                                                                                                                       |
| newline_to_br  | 将所有换行符(\n) 替换为 HTML 的 `<br>` 标签                                                                                                              |
| plus           | 返回两个数相加后的结果                                                                                                                                   |
| prepend        | 在一个字符串前面附加另一个字符串                                                                                                                         |
| remove         | 从一个字符串中删除所有出现的另一个子字符串                                                                                                               |
| remove_first   | 从一个字符串中仅仅删除第一次出现的另一个子字符串                                                                                                         |
| replace        | 将参数中给出的第一个参数全部替换为第二个参数                                                                                                             |
| replace_first  | 将字符串中出现的第一个参数替换为第二个参数                                                                                                               |
| reverse        | 将数组中的所有项的顺序反转。reverse 不能操作字符串                                                                                                       |
| round          | 将浮点数舍入到最近的整数，或者，如果传入的参数是一个数值的话，将浮点数舍入到参数指定的小数位                                                             |
| rstrip         | 将字符串右侧的所有空白字符（制表符 - tab、空格符 - space 和 回车符 - newline）删除                                                                       |
| size           | 返回字符串中所包含的字符数或者数组中所包含的条目数量                                                                                                     |
| slice          | 只传入一个参数时将返回此参数作为下标所对应的单个字符。第二个参数是可选的，用于指定返回的子字符串的长度                                                   |
| sort           | 对数组中的所有进行排序。排序后的数组是按照区分大小写的顺序排列的                                                                                         |
| sort_natural   | 对数组进行排序，并且大小写无关                                                                                                                           |
| split          | 根据参数传入的分隔符将字符串分解为数组                                                                                                                   |
| strip          | 删除字符串左右两侧的所有空白符号（包括制表符、空格、换行符）                                                                                             |
| strip_html     | 从字符串中删除所有 HTML 标签                                                                                                                             |
| strip_newlines | 从字符串中删除所有换行字符                                                                                                                               |
| times          | 返回两个数相乘后的结果                                                                                                                                   |
| truncate       | 将字符串截短为指定的字符个数。如果指定的字符数量小于字符串的长度，则会在字符串末尾添加一个省略号(…) 并将此省略号计入字符个数中                           |
| truncatewords  | 将字符串截短为指定的单词个数。如果指定的单词数量小于字符串中包含的单词个数，则会在字符串末尾添加一个省略号(…)                                            |
| uniq           | 删除数组中的所有冗余项                                                                                                                                   |
| upcase         | 返回一个字符串，字符串中的所有字符转为大写形式                                                                                                           |
| url_decode     | 将字符串中被 url_encode 编码的字符进行解码                                                                                                               |
| url_encode     | 将字符串中非 URL 安全的字符转换为百分号编码                                                                                                              |

## 4. Jekyll 增加的标签和过滤器

Jekyll 默认使用 Liquid 模板语言，支持所有标准的 Liquid 标签和过滤器。Jekyll 甚至增加了几个过滤器和标签，方便使用。

### 4.1. Jekyll Tags

#### 4.1.1. highlight

`highlight` - 用于高亮代码块

代码示例：

{% raw %}

```liquid
{% highlight ruby linenos %}
def foo
puts 'foo'
end
{% endhighlight %}
```

{% endraw %}

效果：

{% highlight ruby linenos %}
def foo
puts 'foo'
end
{% endhighlight %}

#### 4.1.2. link

`link` - 可以正确生成指定路径的永久链接，可以在 Markdown 的链接中使用 `link`。

代码示例：

{% raw %}

```liquid
{% link _drafts/2015-02-06-jekyll_liquid.md %}

[本文链接]({% link _drafts/2015-02-06-jekyll_liquid.md %})
```

{% endraw %}

效果：

- {% link _posts/2015-02-06-jekyll_liquid.md %}

- [本文链接]({% link _posts/2015-02-06-jekyll_liquid.md %})

#### 4.1.3. post_url

`post_url` - 指定已发布的一篇文章生成对应的链接，同样可以在 Markdown 的链接中使用 `post_url`。

代码示例：

{% raw %}

```liquid
{% post_url 2015-02-06-jekyll_liquid %}

[本文链接]({% post_url 2015-02-06-jekyll_liquid %})
```

{% endraw %}

效果：

- {% post_url 2015-02-06-jekyll_liquid %}

- [本文链接]({% post_url 2015-02-06-jekyll_liquid %})

### 4.2. Jekyll Filter

| 描述                                                     |                过滤器                |                                 输出                                 |
| :------------------------------------------------------- | :----------------------------------: | :------------------------------------------------------------------: | --------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 将日期转化为 XML 模式 (ISO 8601) 的格式                  |        {% raw %}`{{ site.time        |                  date_to_xmlschema }}`{% endraw %}                   | `2008-11-17T13:07:54-08:00`                                           |
| 将日期转化为 RFC-822 格式                                |        {% raw %}`{{ site.time        |                    date_to_rfc822 }}`{% endraw %}                    | `Mon, 17 Nov 2008 13:07:54 -0800`                                     |
| 将日期转化为短格式                                       |        {% raw %}`{{ site.time        |                    date_to_string }}`{% endraw %}                    | `17 Nov 2008`                                                         |
| 将日期转化为长格式                                       |        {% raw %}`{{ site.time        |                 date_to_long_string }}`{% endraw %}                  | `17 November 2008`                                                    |
| 选取键值对应的所有对象，返回一个数组                     |      {% raw %}`{{ site.members       |            where:"graduation_year","2014" }}`{% endraw %}            |                                                                       |
| 选取表达式正确的所有对象，返回一个数组                   |      {% raw %}`{{ site.members       | where_exp:"item","item.graduation_year == 2014" }}`/`{{ site.members | where_exp:"item","item.projects contains 'foo'" }}`{% endraw %}       |                                                |
| 根据所给属性将对象分组，返回一个数组                     |      {% raw %}`{{ site.members       |              group_by:"graduation_year" }}`{% endraw %}              | `[{"name"=>"2013", "items"=>[...]},{"name"=>"2014", "items"=>[...]}]` |
| 对一些字符串转码，已方便显示在 XML                       |      {% raw %}`{{ page.content       |                      xml_escape }}`{% endraw %}                      |                                                                       |
| CGI 转码，用于 URL 中，将所有的特殊字符转化为 %XX 的形式 |     {% raw %}`{{ “foo,bar;baz?”      |                      cgi_escape }}`{% endraw %}                      | `foo%2Cbar%3Bbaz%3F`                                                  |
| URI 转码                                                 |   {% raw %}`{{ “'foo, bar \\baz?'”   |                      uri_escape }}`{% endraw %}                      | `foo,%20bar%20%5Cbaz?`                                                |
| 统计文章中的字数                                         |      {% raw %}`{{ page.content       |                   number_of_words }}`{% endraw %}                    | `1337`                                                                |
| 将数组转换为句子，列举标签时尤其有用                     |        {% raw %}`{{ page.tags        |               array_to_sentence_string }}`{% endraw %}               | `foo, bar, and baz`                                                   |
| 将 Markdown 格式的字符串转换为 HTML                      |      {% raw %}`{{ page.excerpt       |                     markdownify }}`{% endraw %}                      |                                                                       |
| 将 Sass / SCSS 格式的字符串转换为 CSS                    |        {% raw %}`{{ some_scss        |                      scssify }}`/`{{ some_sass                       | sassify }}`{% endraw %}                                               |                                                |
| 将字符串转换为小写字母 URL “slug”                        | {% raw %}`{{ "The \_config.yml file" |               slugify }}`/`{{ "The \_config.yml file"                | slugify: 'pretty' }}`{% endraw %}                                     | `the-config-yml-file` / `the-_config.yml-file` |
| 将 Hash / 数组 格式的字符串转换为 JSON                   |   {% raw %}`{{ site.data.projects    |                       jsonify }}`{% endraw %}                        |                                                                       |
| 对数组排序，可选参数为：1.排序属性；2.顺序（正序或倒序） |        {% raw %}`{{ page.tags        |                       sort }}`/`{{ site.posts                        | sort: 'author' }}`/`{{ site.pages                                     | sort: 'title', 'last' }}`{% endraw %}          |                                    |
| 从数组中选取一个随意值。可选参数为：选取个数             |       {% raw %}`{{ site.pages        |                      sample }}`/`{{ site.pages                       | sample:2 }}`{% endraw %}                                              |                                                |
| 从一个数组中 Push, pop, shift, and unshift 元素          |        {% raw %}`{{ page.tags        |                  push: 'Spokane' }}`/`{{ page.tags                   | pop }}`/`{{ page.tags                                                 | shift }}`/`{{ page.tags                        | unshift: "Olympia" }}`{% endraw %} | `['Seattle', 'Tacoma', 'Spokane']` / `['Seattle']` / `['Tacoma']` / `['Olympia', 'Seattle', 'Tacoma']` |
| 将对象转换为其字符串表示形式，用于调试                   |        {% raw %}`{{ some_var         |                       inspect }}`{% endraw %}                        |                                                                       |

## 5. 参考

- [Liquid docs](https://shopify.github.io/liquid/)
- [Liquid 中文网](https://liquid.bootcss.com/)
- ...

{% comment %}

- [liquid 用法笔记](http://blog.csdn.net/dont27/article/details/38097581)

- [JavaScript Liquid 模板引擎 Tinyliquid](http://www.oschina.net/p/tinyliquid)

{% endcomment %}
