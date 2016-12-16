# CLI Plugin
CLI plugin is a simple and easy to use CLI for web applications.  

This is project originated from my fascination with minimalistic user interfaces.  
While rich in functionality - a good CLI is never distracting.  

Features:
- keeps history of used commands
- configurable colorschemes

## Demo
Click <a href="https://rawgit.com/g1eb/cli-plugin/master/" target="_blank">here</a> for a live demo.

## Install

- Install 'cli-plugin' with bower

```
bower install cli-plugin
```

- Install 'cli-plugin' with npm

```
npm install cli-plugin
```

- Or include files directly in your html:

```
<link rel="stylesheet" type="text/css" href="dist/cli-plugin.min.css">
<script src="dist/cli-plugin.min.js"></script>
```

### Setup

Initialize cliPlugin using a custom colorscheme/config file.

```
cliPlugin.init(config);
```

Config accepts following properties:

|Property        | Usage           | Default  | Required |
|:------------- |:-------------|:-----:|:-----:|
| textColor | text color | #111111 | no |
| cursorColor | cursor color | #111111 | no |
| backgroundColor | background color | whitesmoke | no |

Feel free to use hex, rgb(a) or html5 color names :)

### Register commands

Register your own commands:

```
cliPlugin.bind('list', function () {
  cliPlugin.print('<p>items on the shopping list:</p>');
  cliPlugin.print('<ul><li>milk</li><li>bacon</li><li>eggs</li></ul>');
});
```

### Useful functions

Use ```cliPlugin.print(text)``` command to print text on the screen, accepts html.  

Use ```cliPlugin.clear()``` command to clear the screen.

### Example

See [index.html](https://github.com/g1eb/cli-plugin/blob/master/index.html) for an example implementation.
