import fs from 'fs'
import path from 'path'

fs.writeFileSync(path.join(process.cwd(), '.npmrc'), `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`, 'utf-8')