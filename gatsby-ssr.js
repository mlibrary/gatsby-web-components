/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const { renderToString } = require("react-dom/server")
const stencil = require("@umich-lib/components/hydrate")

exports.replaceRenderer = async ({ bodyComponent, replaceBodyHTMLString }) => {
  try {
    const bodyHTML = renderToString(bodyComponent)
    const results = await stencil.renderToString(bodyHTML, {
      clientHydrateAnnotations: true,
      removeScripts: false,
      removeUnusedStyles: false,
    })

    console.log("results.html", results.html)

    return replaceBodyHTMLString(results.html)
  } catch (error) {
    return error
  }
}
