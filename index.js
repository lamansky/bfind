'use strict'

const arrify = require('arrify')
const threeWayFn = require('3fn')

module.exports = function bfind ({compare, get, length, multiple, value}) {
  compare = threeWayFn(...arrify(compare))

  if (length === 0) return {found: false, index: 0}
  if (compare(value, get(length - 1)) === 1) return {found: false, index: length}
  if (compare(value, get(0)) === -1) return {found: false, index: 0}

  function search (min, max, target) {
    let c, index, match
    if (max >= min) {
      while (true) {
        const i = min + Math.floor((max - min) / 2)
        match = get(i)
        c = compare(value, match)
        if (min === max) break
        if (c === target) { index = i; break }
        if (c < 0 || (c === 0 && target === -1)) max = i; else min = i + 1
      }
    }
    if (typeof index === 'undefined') index = min
    return {c, index, match, min, max}
  }

  const {c, index: firstIndex, match, min, max} = search(0, length - 1, 0)
  let index = firstIndex
  if (c === 0) {
    if (multiple === 'identical') {
      let other = match
      for (const delta of [-1, 1]) {
        index = firstIndex
        do {
          if (value === other) return {found: true, identical: true, index}
          index += delta
          if (index < 0 || index >= length) break
          other = get(index)
        } while (compare(value, other) === 0)

        return {found: true, identical: false, index: firstIndex}
      }
    } else if (multiple === 'first') {
      ({index} = search(min, firstIndex, -1))
    } else if (multiple === 'last') {
      const {c: c2, index: index2} = search(firstIndex, max, 1)
      index = c2 === 0 ? index2 : index2 - 1
    }
  }
  return {found: c === 0, index}
}
