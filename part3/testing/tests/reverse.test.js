const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
    const result = reverse('a')

    assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
    const result = reverse('react')

    asser.strictEqual(result, 'tcaer')
})

testest('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')
  
    assert.strictEqual(result, 'saippuakauppias')
  })