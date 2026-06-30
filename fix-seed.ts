import * as fs from 'fs';
let code = fs.readFileSync('src/data/seedData.ts', 'utf-8');
code = code.replace(/category:\s*'([^']+)'\s*,?\s*\n(\s*)\}/g, "category: '$1',\n$2tags: ['marketing'],\n$2}");
fs.writeFileSync('src/data/seedData.ts', code);
