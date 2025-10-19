const fs = require('fs')
const path = require('path')

function printStructure(dir, prefix = '') {
  const entries = fs.readdirSync(dir, {withFileTypes: true})

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1
    const pointer = isLast ? '└── ' : '├── '
    const newPrefix = prefix + (isLast ? '    ' : '│   ')
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      console.log(`${prefix}${pointer}/${entry.name}`)
      printStructure(fullPath, newPrefix)
    } else if (entry.isFile()) {
      console.log(`${prefix}${pointer}${entry.name}`)
    }
  })
}

const targetArg = process.argv[2]
if (!targetArg) {
  console.error('❌ Please provide a target folder. Example: npm run printfiles src/app/shared')
  process.exit(1)
}

const projectRoot = path.resolve(__dirname, '../')
const targetPath = path.resolve(projectRoot, targetArg)

if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isDirectory()) {
  console.error(`❌ The target folder '${targetArg}' does not exist or is not a directory.`)
  process.exit(1)
}

console.log(`/ ${path.basename(targetPath)}`)
printStructure(targetPath)
