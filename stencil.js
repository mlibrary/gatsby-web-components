const glob = require("glob")
const fs = require("fs")

const stencil = require("@umich-lib/components/hydrate")

async function render() {
  const files = glob.sync("public/**/*.html")

  const promises = files.map(async file => {
    try {
      const html = fs.readFileSync(file, "utf8")
      const result = await stencil.renderToString(html, {
        prettyHtml: true,
      })
      fs.writeFileSync(file, result.html)
      return result
    } catch (e) {
      console.warn(e)
      return
    }
  })

  const results = await Promise.all(promises)

  console.log("results", results)
  return
}

render()
