/* eslint-disable */

// Register `Raw` in tree:
/// <reference types="mdast-util-to-hast" />

/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Parents} Parents
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast-util-to-jsx-runtime').Components} JsxRuntimeComponents
 * @typedef {import('remark-rehype').Options} RemarkRehypeOptions
 * @typedef {import('unist-util-visit').BuildVisitor<Root>} Visitor
 * @typedef {import('unified').PluggableList} PluggableList
 */

/**
 * @callback AllowElement
 *   Filter elements.
 * @param {Readonly<Element>} element
 *   Element to check.
 * @param {number} index
 *   Index of `element` in `parent`.
 * @param {Readonly<Parents> | undefined} parent
 *   Parent of `element`.
 * @returns {boolean | null | undefined}
 *   Whether to allow `element` (default: `false`).
 *
 * @typedef {Partial<JsxRuntimeComponents>} Components
 *   Map tag names to components.
 *
 * @typedef Deprecation
 *   Deprecation.
 * @property {string} from
 *   Old field.
 * @property {string} id
 *   ID in readme.
 * @property {keyof Options} [to]
 *   New field.
 *
 * @typedef Options
 *   Configuration.
 * @property {AllowElement | null | undefined} [allowElement]
 *   Filter elements (optional);
 *   `allowedElements` / `disallowedElements` is used first.
 * @property {ReadonlyArray<string> | null | undefined} [allowedElements]
 *   Tag names to allow (default: all tag names);
 *   cannot combine w/ `disallowedElements`.
 * @property {string | null | undefined} [children]
 *   Markdown.
 * @property {string | null | undefined} [className]
 *   Wrap in a `div` with this class name.
 * @property {Components | null | undefined} [components]
 *   Map tag names to components.
 * @property {ReadonlyArray<string> | null | undefined} [disallowedElements]
 *   Tag names to disallow (default: `[]`);
 *   cannot combine w/ `allowedElements`.
 * @property {PluggableList | null | undefined} [rehypePlugins]
 *   List of rehype plugins to use.
 * @property {PluggableList | null | undefined} [remarkPlugins]
 *   List of remark plugins to use.
 * @property {Readonly<RemarkRehypeOptions> | null | undefined} [remarkRehypeOptions]
 *   Options to pass through to `remark-rehype`.
 * @property {boolean | null | undefined} [skipHtml=false]
 *   Ignore HTML in markdown completely (default: `false`).
 * @property {boolean | null | undefined} [unwrapDisallowed=false]
 *   Extract (unwrap) what’s in disallowed elements (default: `false`);
 *   normally when say `strong` is not allowed, it and it’s children are dropped,
 *   with `unwrapDisallowed` the element itself is replaced by its children.
 * @property {UrlTransform | null | undefined} [urlTransform]
 *   Change URLs (default: `defaultUrlTransform`)
 *
 * @callback UrlTransform
 *   Transform all URLs.
 * @param {string} url
 *   URL.
 * @param {string} key
 *   Property name (example: `'href'`).
 * @param {Readonly<Element>} node
 *   Node.
 * @returns {string | null | undefined}
 *   Transformed URL (optional).
 */

import {unreachable} from 'devlop'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'
import {urlAttributes} from 'html-url-attributes'
// @ts-expect-error: untyped.
import {Fragment, jsx, jsxs} from 'react/jsx-runtime'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import {visit} from 'unist-util-visit'
import {VFile} from 'vfile'

const changelog =
  'https://github.com/remarkjs/react-markdown/blob/main/changelog.md'

/** @type {PluggableList} */
const emptyPlugins = []
/** @type {Readonly<RemarkRehypeOptions>} */
const emptyRemarkRehypeOptions = {allowDangerousHtml: true}
const safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i

// Mutable because we `delete` any time it’s used and a message is sent.
/** @type {ReadonlyArray<Readonly<Deprecation>>} */
const deprecations = [
  {from: 'astPlugins', id: 'remove-buggy-html-in-markdown-parser'},
  {from: 'allowDangerousHtml', id: 'remove-buggy-html-in-markdown-parser'},
  {
    from: 'allowNode',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'allowElement'
  },
  {
    from: 'allowedTypes',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'allowedElements'
  },
  {
    from: 'disallowedTypes',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'disallowedElements'
  },
  {from: 'escapeHtml', id: 'remove-buggy-html-in-markdown-parser'},
  {from: 'includeElementIndex', id: '#remove-includeelementindex'},
  {
    from: 'includeNodeIndex',
    id: 'change-includenodeindex-to-includeelementindex'
  },
  {from: 'linkTarget', id: 'remove-linktarget'},
  {from: 'plugins', id: 'change-plugins-to-remarkplugins', to: 'remarkPlugins'},
  {from: 'rawSourcePos', id: '#remove-rawsourcepos'},
  {from: 'renderers', id: 'change-renderers-to-components', to: 'components'},
  {from: 'source', id: 'change-source-to-children', to: 'children'},
  {from: 'sourcePos', id: '#remove-sourcepos'},
  {from: 'transformImageUri', id: '#add-urltransform', to: 'urlTransform'},
  {from: 'transformLinkUri', id: '#add-urltransform', to: 'urlTransform'}
]

/**
 * Component to render markdown.
 *
 * @param {Readonly<Options>} options
 *   Props.
 * @returns {JSX.Element}
 *   React element.
 */
export function Markdown(options) {
  const allowedElements = options.allowedElements
  const allowElement = options.allowElement
  const children = options.children || ''
  const className = options.className
  const components = options.components
  const disallowedElements = options.disallowedElements
  const rehypePlugins = options.rehypePlugins || emptyPlugins
  const remarkPlugins = options.remarkPlugins || emptyPlugins
  const remarkRehypeOptions = options.remarkRehypeOptions
    ? {...options.remarkRehypeOptions, ...emptyRemarkRehypeOptions}
    : emptyRemarkRehypeOptions
  const skipHtml = options.skipHtml
  const unwrapDisallowed = options.unwrapDisallowed
  const urlTransform = options.urlTransform || defaultUrlTransform

  const processor = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype, remarkRehypeOptions)
    .use(rehypePlugins)

  const file = new VFile()

  if (typeof children === 'string') {
    file.value = children
  } else {
    unreachable(
      'Unexpected value `' +
        children +
        '` for `children` prop, expected `string`'
    )
  }

  if (allowedElements && disallowedElements) {
    unreachable(
      'Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other'
    )
  }

  for (const deprecation of deprecations) {
    if (Object.prototype.hasOwnProperty.call(options, deprecation.from)) {
      unreachable(
        'Unexpected `' +
          deprecation.from +
          '` prop, ' +
          (deprecation.to
            ? 'use `' + deprecation.to + '` instead'
            : 'remove it') +
          ' (see <' +
          changelog +
          '#' +
          deprecation.id +
          '> for more info)'
      )
    }
  }

  const mdastTree = processor.parse(file)
  /** @type {Nodes} */
  let hastTree = processor.runSync(mdastTree, file)

  // Wrap in `div` if there’s a class name.
  if (className) {
    hastTree = {
      type: 'element',
      tagName: 'div',
      properties: {className},
      // Assume no doctypes.
      children: /** @type {Array<ElementContent>} */ (
        hastTree.type === 'root' ? hastTree.children : [hastTree]
      )
    }
  }

  visit(hastTree, transform)

  return toJsxRuntime(hastTree, {
    Fragment,
    components,
    ignoreInvalidStyle: true,
    jsx,
    jsxs,
    passKeys: true,
    passNode: true
  })

  /** @type {Visitor} */
  function transform(node, index, parent) {
    if (node.type === 'raw' && parent && typeof index === 'number') {
      if (skipHtml) {
        parent.children.splice(index, 1)
      } else {
        parent.children[index] = {type: 'text', value: node.value}
      }

      return index
    }

    if (node.type === 'element') {
      /** @type {string} */
      let key

      for (key in urlAttributes) {
        if (
          Object.prototype.hasOwnProperty.call(urlAttributes, key) &&
          Object.prototype.hasOwnProperty.call(node.properties, key)
        ) {
          const value = node.properties[key]
          const test = urlAttributes[key]
          if (test === null || test.includes(node.tagName)) {
            node.properties[key] = urlTransform(String(value || ''), key, node)
          }
        }
      }
    }

    if (node.type === 'element') {
      let remove = allowedElements
        ? !allowedElements.includes(node.tagName)
        : disallowedElements
          ? disallowedElements.includes(node.tagName)
          : false

      if (!remove && allowElement && typeof index === 'number') {
        remove = !allowElement(node, index, parent)
      }

      if (remove && parent && typeof index === 'number') {
        if (unwrapDisallowed && node.children) {
          parent.children.splice(index, 1, ...node.children)
        } else {
          parent.children.splice(index, 1)
        }

        return index
      }
    }
  }
}

/**
 * Make a URL safe.
 *
 * @satisfies {UrlTransform}
 * @param {string} value
 *   URL.
 * @returns {string}
 *   Safe URL.
 */
export function defaultUrlTransform(value) {
  // Same as:
  // <https://github.com/micromark/micromark/blob/929275e/packages/micromark-util-sanitize-uri/dev/index.js#L34>
  // But without the `encode` part.
  const colon = value.indexOf(':')
  const questionMark = value.indexOf('?')
  const numberSign = value.indexOf('#')
  const slash = value.indexOf('/')

  if (
    // If there is no protocol, it’s relative.
    colon < 0 ||
    // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    (slash > -1 && colon > slash) ||
    (questionMark > -1 && colon > questionMark) ||
    (numberSign > -1 && colon > numberSign) ||
    // It is a protocol, it should be allowed.
    safeProtocol.test(value.slice(0, colon))
  ) {
    return value
  }

  return ''
}
