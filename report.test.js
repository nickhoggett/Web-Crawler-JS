const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

//sort arrays 
test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/path1': 4,
        'https://wagslane.dev/path2': 15,
        'https://wagslane.dev/path3': 7
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path2', 15],
        ['https://wagslane.dev/path3', 7],
        ['https://wagslane.dev/path1', 4],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1],
    ]
    expect(actual).toEqual(expected)
})