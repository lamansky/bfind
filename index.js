'use strict'

const arrify = require('arrify')
const threeWayFn = require('3fn')

module.exports = function bfind ({compare, get, length, multiple, value}) {
  compare = threeWayFn(...arrify(compare))

  function search (min, max, target) {
    let c, index
    if (max >= min) {
      while (true) {
        const i = min + Math.floor((max - min) / 2)
        const other = get(i)
        c = compare(value, other)
        if (min === max) break
        if (c === target) { index = i; break }
        if (c < 0 || (c === 0 && target === -1)) max = i; else min = i + 1
      }
    }
    if (typeof index === 'undefined') index = min
    return {c, index, min, max}
  }

  const {c, index: firstIndex, min, max} = search(0, length - 1, 0)
  let index = firstIndex
  if (c === 0) {
    if (multiple === 'first') {
      ({index} = search(min, firstIndex, -1))
    } else if (multiple === 'last') {
      const {c: c2, index: index2} = search(firstIndex, max, 1)
      index = c2 === 0 ? index2 : index2 - 1
    }
  }
  return {found: c === 0, index}
}
