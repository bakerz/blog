---
title: Jekyll 系列（一）：如何搭建本地环境
category: 随笔
tags: [Jekyll]
create_time: 2015-02-05
---

> Jekyll 是一个简单的博客形态的静态站点生产机器。它有一个模版目录，其中包含原始文本格式的文档，通过一个转换器（如 Markdown）和我们的 Liquid 渲染器转化成一个完整的可发布的静态网站，你可以发布在任何你喜爱的服务器上。Jekyll 也可以运行在 GitHub Page 上，也就是说，你可以使用 GitHub 的服务来搭建你的项目页面、博客或者网站，而且是完全免费的。
> ------ [Jekyll 中文网](http://jekyllcn.com/)

相信很多人使用 Jekyll，都是为了在 GitHub Page 上部署一个属于自己的博客站点，其过程不算太难，网上很容易就能找到大量的教程。

如果初衷只是想拥有一个主题好看、能够发布文章的站点，那参照一些教程配置主题，提交到 GitHub 即可。

但如果是想自己去实现一个特殊样式风格的站点，就得需要一个本地环境支撑调试，不然每次都部署到线上去查看结果可就太痛苦了。

接下来就带大家一步步在本地搭建一个 Jekyll 环境。

## 1. 安装 Ruby

运行 Jekyll 需要依赖 Ruby 环境，所以需要先配置一个 Ruby 环境。

### 1.1. Windows

在 Windows 下配置 Ruby 环境，安装 RubyInstaller 即可。

RubyInstaller 是一个基于 Windows 的安装程序，包括了 Ruby、运行环境等。

从 [RubyInstaller Downloads](http://rubyinstaller.org/downloads/) 下载 Ruby+Devkit，选择推荐版本，使用默认配置安装。

![RubyInstaller Downloads 界面及推荐版本](https://i.loli.net/2021/07/27/gy92EieXrTn5SYt.png)

安装完成之后，CMD 中输入 `ruby -v` 或者 `gem -v`，有输出版本即代表安装成功。

### 1.2. macOS

在 macOS Big Sur 11.x 版本下就已经自带了 Ruby 环境。

如果是以前版本的 macOS，使用 Homebrew 便可以安装 Ruby：`brew install ruby`。

同样的，在 macOS 下也可以使用 RubyGems 管理 Ruby 软件包。

## 2. 安装 Jekyll

有了 Ruby 环境以及 RubyGems 就可以安装 Jekyll，完成最后一步了：`gem install jekyll`。

安装之后，输入 `jekyll -v` 检查是否安装成功。

## 3. 启动 Jekyll 服务

Jekyll 环境搭建完成之后，进入到项目目录下（有 \_config.yml 文件的目录），

输入启动命令：`jekyll serve` 或者 `jekyll s`。

若没有异常，启动服务后的默认端口为 4000，浏览器地址栏输入 `localhost:4000` 即可访问。

启动服务时使用命令：`jekyll s --drafts`，可以同时访问草稿（\_drafts）目录下的文章。

## 4. 补充

之前的步骤中有接触到 RubyGems，接下来就简单的了解一下 RubyGems。

### 4.1. 什么是 RubyGems

> RubyGems 是 Ruby 的一个包管理器，提供了分发 Ruby 程序和库的标准格式（gem），使用它可以方便地下载安装 Ruby 的软件包到用户的系统。

命令 `gem -v` - 用来查看 RubyGems 的版本。

安装 RubyInstaller 的同时也安装了 RubyGems，之后就可以使用 gem 相关的指令集。

### 4.2. RubyGems 常用指令

```bash
# 更新 RubyGems
gem update --system

# 安装 gem 包
gem install <gem package name>

# 查看源
gem sources list
gem sources -l

# 删除源
gem sources -r <source URL>
gem sources --remove <source URL>

# 添加源
gem sources -a <source URL>
gem sources --add <source URL>
```

### 4.3. RubyGems 替换为国内源

- 查看当前源

  `gem sources list` 或者 `gem sources -l`

  默认官方源地址：`https://rubygems.org/`

- 删除当前源

  `gem sources --remove https://rubygems.org/`

- 添加新源

  `gem sources -a xxx` 或者 `gem sources --add xxx`

  Ruby China 源：`gem sources --add https://gems.ruby-china.com/`

  ~~淘宝源：`gem sources --add https://ruby.taobao.org/`~~ （淘宝源已失效）

## 5. 参考

- [Jekyll](https://jekyllrb.com/)
- [Jekyll 中文网](http://jekyllcn.com/)
- [How to install jekyll on Apple M1 Macbook](http://www.earthinversion.com/blogging/how-to-install-jekyll-on-appple-m1-macbook)
- [Error installing jekyll: Failed to build gem native extension](https://www.rubyonmac.dev/error-error-installing-jekyll-error-failed-to-build-gem-native-extension)
- [Install Ruby on Mac. The Definitive Guide for 2022.](https://www.moncefbelyamani.com/the-definitive-guide-to-installing-ruby-gems-on-a-mac/)
- ...

{% comment %}

- [Windows 上安装 Jekyll](http://blog.csdn.net/kong5090041/article/details/38408211)
- [Github+Jekyll 搭建个人网站详细教程](https://www.jianshu.com/p/9f71e260925d)

{% endcomment %}
