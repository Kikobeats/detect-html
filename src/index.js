'use strict'

// List of HTML void elements according to the HTML specification
// https://html.spec.whatwg.org/multipage/syntax.html#elements-2
const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
])

module.exports = string => {
  const results = []
  const length = string.length
  let i = 0

  while (i < length) {
    if (string[i] === '<' && i + 1 < length && string[i + 1] !== '/') {
      let j = i + 1
      let tagName = ''

      // Extract tag name (0-9, a-z, A-Z)
      while (j < length && /[a-zA-Z0-9]/.test(string[j])) {
        tagName += string[j]
        j++
      }

      // Skip if tagName is empty or invalid
      if (!tagName) {
        i++
        continue
      }

      // Find the end of the current opening tag ('>')
      let tagEnd = j
      let isSelfClosing = false

      while (tagEnd < length && string[tagEnd] !== '>') {
        // Detect explicitly self-closing tags with '/>'
        if (
          string[tagEnd] === '/' &&
          tagEnd + 1 < length &&
          string[tagEnd + 1] === '>'
        ) {
          isSelfClosing = true
          tagEnd++ // Move to the '>' character
          break
        }
        tagEnd++
      }

      if (tagEnd >= length) {
        i++
        continue // Malformed tag, skip
      }

      tagEnd++ // Move past '>'

      // Check if current tag is a void element
      if (voidElements.has(tagName.toLowerCase()) || isSelfClosing) {
        // Void or explicitly self-closed tag, no nesting required
        const extractedTag = string.substring(i, tagEnd)
        results.push(extractedTag)
        i = tagEnd - 1
      } else {
        // Regular non-void tag, needs nesting logic
        const openTag = `<${tagName}`
        const closeTag = `</${tagName}>`

        let nesting = 1
        let k = tagEnd

        while (k < length) {
          if (string[k] === '<') {
            // Check for nested opening tag
            if (
              string.substr(k, openTag.length) === openTag &&
              /\s|>/.test(string[k + openTag.length] || '')
            ) {
              nesting++
              k += openTag.length
              // Check for matching closing tag
            } else if (string.substr(k, closeTag.length) === closeTag) {
              nesting--
              k += closeTag.length

              if (nesting === 0) {
                const extractedTag = string.substring(i, k)
                results.push(extractedTag)
                i = k - 1 // Move main iterator to continue after current tag
                break
              }
            } else {
              k++
            }
          } else {
            k++
          }
        }
      }
    }

    i++ // Move main iterator forward
  }

  return results // Return array of extracted HTML tags
}
