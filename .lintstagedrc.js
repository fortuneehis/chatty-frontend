const path = require("path")

const buildFiles =
  (command, seperator = " ") =>
  (filenames) => {
    return `${command} ${filenames
      .map((filename) => path.relative(process.cwd(), filename))
      .join(seperator)}`
  }

module.exports = {
  "**/*.{ts,tsx}": [
    buildFiles("next lint --file", " --file "),
    buildFiles("npx prettier --write", " "),
    "git add .",
  ],
}
