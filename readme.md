# bfind

Runs a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) on any sorted collection.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i bfind
```

## API

The module exports a single function.

### Parameters

1. Object argument:
    * Optional: `compare` (function, array, or any):
        * If a function: When passed two arguments `a` and `b`, expected to return `-1` if `a` is less than `b`, `1` if `a` is greater than `b`, and `0` if they are equal.
        * If an array: An array of Map/object keys, the values of which can be used to compare two Maps/objects. The first key is checked first, and if the two values for that key are equal, the next key in the array is checked, and so on. If any given element is itself an array, it is interpreted as a nested keychain.
        * Otherwise: A single Map/object key.
        * If omitted: Only numbers and strings will be compared as-is. All others values will be coerced into strings before being compared.
    * `get` (function): A callback that should return a value from the collection for a given index from `0` to `length - 1`.
    * `length` (positive integer): The length of the collection.
    * Optional: `multiple` (string): Specifies behavior in the event that more than one existing collection item is sort-equivalent with `value`.
        * If set to `first` or `last`, the index of the first or last sort-equivalent item (respectively) will be returned.
        * If set to `identical`, every sort-equivalent item will be scanned for identity (`===`) with `value` and the first identical item found will have its index returned.
        * Otherwise, the index of whatever sort-equivalent item the algorithm comes across first will be returned.
    * `value` (any): The value to search for.

### Return Value

Returns an object:

* `found` (boolean): `true` if `compare` reported that the collection contains another value with the same sort value as `value`; `false` otherwise.
* `index` (positive integer): The index of `value` or its sort-equivalent (if `equal` is `true`); or, the appropriate insertion index for `value` (if `equal` is `false`).

## Example

```javascript
const bfind = require('bfind')

const arr = ['a', 'c', 'c']

const argsForArr = {get: i => arr[i], length: arr.length}

bfind({...argsForArr, value: 'a'}) // {found: true,  index: 0}
bfind({...argsForArr, value: 'b'}) // {found: false, index: 1}
bfind({...argsForArr, value: 'c'}) // {found: true,  index: 1}
bfind({...argsForArr, value: 'c', multiple: 'last'}) // {found: true,  index: 2}
```

## Related

This module is part of the “b” family of binary search modules.

* [barr](https://github.com/lamansky/barr)
* [binsert](https://github.com/lamansky/binsert)
