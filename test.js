'use strict'

const assert = require('assert')
const bfind = require('.')

describe('bfind()', function () {
  it('should handle an empty collection', function () {
    let calls = 0
    const {found, index} = bfind({
      compare: (a, b) => { calls++; return a - b },
      get: i => i,
      length: 0,
      value: 0,
    })
    assert.strictEqual(found, false)
    assert.strictEqual(index, 0)
    assert.strictEqual(calls, 0)
  })

  it('should locate the index of a given value', function () {
    let calls = 0
    const {found, index} = bfind({
      compare: (a, b) => { calls++; return a - b },
      get: i => i,
      length: 10,
      value: 7,
    })
    assert.strictEqual(found, true)
    assert.strictEqual(index, 7)
    assert.strictEqual(calls, 2)
  })

  it('should locate a value at the beginning', function () {
    let calls = 0
    const {found, index} = bfind({
      compare: (a, b) => { calls++; return a - b },
      get: i => i,
      length: 10,
      value: 0,
    })
    assert.strictEqual(found, true)
    assert.strictEqual(index, 0)
    assert.strictEqual(calls, 4)
  })

  it('should locate a value at the end', function () {
    let calls = 0
    const {found, index} = bfind({
      compare: (a, b) => { calls++; return a - b },
      get: i => i,
      length: 10,
      value: 9,
    })
    assert.strictEqual(found, true)
    assert.strictEqual(index, 9)
    assert.strictEqual(calls, 4)
  })

  it('should return false `found` if value out of range', function () {
    const {found, index} = bfind({
      get: i => i,
      length: 10,
      value: 10,
    })
    assert.strictEqual(found, false)
    assert.strictEqual(index, 9)
  })

  it('should index a new item at the correct location', function () {
    {
      const arr = ['a', 'c', 'e']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        value: 'b',
      })
      assert.strictEqual(found, false)
      assert.strictEqual(index, 1)
    }
    {
      const arr = ['a', 'c', 'e']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        value: 'd',
      })
      assert.strictEqual(found, false)
      assert.strictEqual(index, 2)
    }
    {
      const arr = ['a', 'b', 'c', 'e']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        value: 'd',
      })
      assert.strictEqual(found, false)
      assert.strictEqual(index, 3)
    }
  })

  it('should return the first matching index found', function () {
    const arr = ['a', 'b', 'b', 'b', 'c']
    const {found, index} = bfind({
      get: i => arr[i],
      length: arr.length,
      value: 'b',
    })
    assert.strictEqual(found, true)
    assert.strictEqual(index, 2)
  })

  it('should return the first matching index if `multiple` set to `first`', function () {
    {
      const arr = ['a', 'b', 'b', 'b', 'c']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        multiple: 'first',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 1)
    }
    {
      const arr = ['b', 'b', 'b']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        multiple: 'first',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 0)
    }
    {
      const arr = ['a', 'b', 'c']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        multiple: 'first',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 1)
    }
  })

  it('should return the last matching index if `multiple` set to `last`', function () {
    {
      const arr = ['a', 'a', 'b', 'b', 'b', 'b', 'c']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        multiple: 'last',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 5)
    }
    {
      const arr = ['b', 'b', 'b', 'b']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        multiple: 'last',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 3)
    }
    {
      const arr = ['a', 'b', 'c']
      const {found, index} = bfind({
        get: i => arr[i],
        length: arr.length,
        multiple: 'last',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 1)
    }
  })
})
