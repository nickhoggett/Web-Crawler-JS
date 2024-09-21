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
            <a href="https://BLOG.boot.dev/path">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/path'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev blog path one
            </a>
            <a href="/path2/">
                Boot.dev blog path two
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})