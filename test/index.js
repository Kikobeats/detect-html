'use strict'

const { randomBytes } = require('crypto')
const test = require('ava')

const detectHtml = require('..')

test('detect HTML tags inside a string', t => {
  let data = randomBytes(100).toString('base64')
  data += "<script>console.log('lol')</script>"
  data += "<div><script>console.log('lol')</script></div>"
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), [
    "<script>console.log('lol')</script>",
    "<div><script>console.log('lol')</script></div>"
  ])
})

test('detect multiple HTML tags with no nesting', t => {
  let data = randomBytes(100).toString('base64')
  data += '<div>Content</div><span>Text</span>'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), ['<div>Content</div>', '<span>Text</span>'])
})

test('detect HTML tags with attributes', t => {
  let data = randomBytes(100).toString('base64')
  data += '<div class="container">Content</div>'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), ['<div class="container">Content</div>'])
})

test('detect self-closing HTML tags', t => {
  let data = randomBytes(100).toString('base64')
  data += '<img src="image.jpg" />'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), ['<img src="image.jpg" />'])
})

test('detect nested opening HTML tags followed by whitespace or >', t => {
  let data = randomBytes(100).toString('base64')
  data += '<div><div class="nested">Content</div></div>'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), ['<div><div class="nested">Content</div></div>'])
})

test('detect HTML void element tags', t => {
  let data = randomBytes(100).toString('base64')
  data +=
    '<link rel="stylesheet" href="/_next/static/css/c7a57cb969713187.css?dpl=dpl_9uVBxfyEkJdjpUkvU8B2TPDwDdRB" data-precedence="next">'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), [
    '<link rel="stylesheet" href="/_next/static/css/c7a57cb969713187.css?dpl=dpl_9uVBxfyEkJdjpUkvU8B2TPDwDdRB" data-precedence="next">'
  ])
})

test('detect nested HTML tags of same type', t => {
  let data = randomBytes(100).toString('base64')
  data += '<div><div>Nested content</div></div>'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), ['<div><div>Nested content</div></div>'])
})

test('ignore unmatched closing HTML tags', t => {
  let data = randomBytes(100).toString('base64')
  data += 'Content</div>'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), [])
})

test('ignores unmatched opening HTML tags', t => {
  let data = randomBytes(100).toString('base64')
  data += '<div>Content'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), [])
})

test('ignore empty or invalid tag name', t => {
  let data = randomBytes(100).toString('base64')
  data += '<>Invalid tag<123invalid>Another invalid tag<>'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), [])
})

test('ignore malformed opening tag without closing bracket', t => {
  let data = randomBytes(100).toString('base64')
  data += '<div class="container" Content without closing bracket'
  data += randomBytes(100).toString('base64')
  t.deepEqual(detectHtml(data), [])
})
