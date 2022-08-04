const fs = require('fs')

const result = []

for (let i = 0; i < 10; i++) {
  const js = []
  for (let j = 0; j < 100; j++) {
    const ks = []
    for (let k = 0; k < 1000; k++) {
      ks.push({
        id: `${i}_${j}_${k}`
      })
    }
    js.push({
      id: `${i}_${j}`,
      children: ks
    })
  }
  result.push({
    id: `${i}`,
    children: js
  })
}

fs.writeFileSync('./public/data.json', JSON.stringify(result))
