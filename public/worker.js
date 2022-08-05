let data = []
onmessage = function (e) {
  if (e.data.type === 'init') {
    fetch('./data.json')
      .then(res => res.json())
      .then(res => {
        data = flat(res)
        postMessage(JSON.stringify(data.slice(0, 50)))
      })
  } else {
    const startIndex = e.data.startIndex
    postMessage({
      data: JSON.stringify(data.slice(startIndex, startIndex + 50)),
      startIndex
    })
  }
}

function flat (data) {
  const res = []
  while (data.length) {
    const cur = { ...data.shift() }
    res.push(cur)
    if (Array.isArray(cur.children)) {
      data.unshift(...cur.children)
    }
    delete cur.children
  }
  return res
}
