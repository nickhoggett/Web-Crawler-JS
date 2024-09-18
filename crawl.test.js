const { normaliseURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')


// strip https:// 
test('normaliseURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

// stripping trailing '/' from url
test('normaliseURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

// URL constructor already lower casing url (no logic in normaliseURL)
test('normaliseURL capitals ', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

// strip http:// URL constructor already correcting this (no logic in normaliseURL)
test('normaliseURL capitals ', () => {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://BLOG.boot.dev/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://BLOG.boot.dev/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

