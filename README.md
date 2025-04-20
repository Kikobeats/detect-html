# detect-html

![Last version](https://img.shields.io/github/tag/kikobeats/detect-html.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/kikobeats/detect-html.svg?style=flat-square)](https://coveralls.io/github/kikobeats/detect-html)
[![NPM Status](https://img.shields.io/npm/dm/detect-html.svg?style=flat-square)](https://www.npmjs.org/package/detect-html)

> It detects HTML markup embed in any string.

## Install

```bash
$ npm install detect-html --save
```

## Usage

```js
const detectHtml = require('detect-html')

detectHtml(input)
// [
//   "<script>console.log('lol')</script>",
//   "<div><script>console.log('lol')</script></div>"
// ]
```

## License

**detect-html** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/kikobeats/detect-html/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/kikobeats/detect-html/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/kikobeats) · Twitter [@kikobeats](https://twitter.com/kikobeats)
