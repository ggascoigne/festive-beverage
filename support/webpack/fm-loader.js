// See the patch-package patch for react-scripts
// and https://mdxjs.com/guides/custom-loader

const matter = require('gray-matter')
const stringifyObject = require('stringify-object')

/**
 * read only if not logged on
 * @param {any} src
 * @returns {Promise<any>}
 */

module.exports = async function (src) {
  // @ts-ignore
  const callback = this.async()
  const { content, data } = matter(src)

  // @ts-ignore
  const code = `export const frontMatter = ${stringifyObject(data)}

${content}`

  return callback(null, code)
}
