---
title: Sublime Text 配置及常用插件
category: 工具
tags: [编辑器, Sublime Text]
create_time: 2015-01-07
---

Sublime Text 是一款比较轻巧的编辑器，打开文件的速度很快，安装包体积不大且运行时内存占用不多。保留基础编辑功能的同时，拥有丰富的插件生态，开发者可以自行添加需要的功能插件。

需要说明的是，Sublime Text 并不是免费的，但是非付费用户也能正常使用其编辑功能，只是每隔一段时间会自动弹出付费消息提示。

以下是我使用一段时间之后，总结的一些使用心得，包含了常用的插件及配置。

## 1. 插件管理器 Package Control

Package Control 可以帮助用户更方便的管理插件，通过简单的操作步骤就可以安装各种功能强大的插件，为编辑带来更高的效率。

同时 Package Control 也是一个插件，Sublime Text 并没有集成，需要用户自行安装。

下面提供两种安装 Package Control 的方法：

### 1.1. 控制台命令安装

因为 Sublime Text 3 更新了 Python 的函数，API 不同了，所以 3 与 2 的安装命令也有所不同。

从菜单 `View` > `Show Control` 或者 `Ctrl + ~` ，调出控制台，将以下 Python 代码粘贴进去，并回车执行，既可安装完成。

Sublime Text 3:

```python
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

Sublime Text 2:

```python
import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')
```

最后重启 Sublime Text

### 1.2. 手动安装

可能由于网络等其他原因，无法使用控制台命令安装，那可以通过以下步骤手动安装 Package Control:

1. 点击 `Preferences` > `Browse Packages` 菜单

2. 进入打开的目录的上层目录，然后再进入 `Installed Packages/` 目录

3. 下载 [Package Control.sublime-package](https://sublime.wbond.net/Package%20Control.sublime-package) 并复制到 `Installed Packages/` 目录

4. 重启 Sublime Text

按下组合键 `Ctrl + Shift + p` 即可调出命令面板，也就意味着 Package Control 安装成功了。

## 2. 常用插件介绍

大多数的插件都可以通过网站 [Package Control](https://packagecontrol.io/) 查看具体信息。

下面介绍几个我自己常用的插件及其用法。

### 2.1. Emmet

简单命令快速编写页面代码。

在一个空白的 HTML 文件中，输入 `html:5` 之后按 Tab 键，便能生成包含最基础标签的文本代码。

e.g:

![Emmet 示例](https://i.loli.net/2021/07/22/38rhHRxaqQtPXwE.gif)

详情参照：[语法表](http://docs.emmet.io/cheat-sheet/)

### 2.2. Color Highlighter

代码中出现的色值，底色就是此色值对应的颜色，方便开发者直观的了解此段色值代码对应的真正颜色。

此交互真的很赞，让冰冷的代码有了温度的感觉。

![Color Highlighter 效果展示](https://i.loli.net/2021/07/22/5jGLyrMSVlzB72t.png)

### 2.3. BracketHighlighter

代码匹配，可以匹配括号，引号等符号，并通过不同颜色区别展示，方便开发者查看代码块范围。

![BracketHighlighter 效果展示](https://i.loli.net/2021/07/22/2a7vLI5inmCGwu9.png)

### 2.4. DocBlockr

自动快捷生成注释模板，在为方法编写注释时及其方便。

![DocBlockr 示例](https://i.loli.net/2021/07/23/8uaqHBJOT1yDSNU.gif)

### 2.5. Less

支持 Less 语法高亮的插件，同样 SCSS 也有对应的高亮插件。

### 2.6. SideBarEnhancements

SideBarEnhancements 是一款很实用的右键菜单增强插件在安装该插件前，在 Sublime Text 左侧 FOLDERS 栏中点击右键只有寥寥几个简单的功能。

通过 Package Control 安装 SideBarEnhancements 插件后，可通过配置丰富右键菜单的功能。

### 2.7. MarkdownPreview

支持 Markdown 语法，直接生成 HTML 进行预览等功能。

## 3. 其他常用配置

### 3.1. 常用快捷键

| 作用             | 快捷键             |
| :--------------- | :----------------- |
| 调出控制命令面板 | `Ctrl + Shift + p` |
| 调出控制台       | `Ctrl + ~`         |

### 3.2. 显示空格或制表符

Preference -> Setting-User 添加

```config
"draw_white_space": "all",
```

### 3.3. 缩进以 4 个空格替换 tab

Preference -> Setting-User 添加

```config
"tab_size": 4,
"translate_tabs_to_spaces": true,
```

## 4. 参考

- [Sublime Text](https://www.sublimetext.com/)
- [Package Control](https://packagecontrol.io/)
