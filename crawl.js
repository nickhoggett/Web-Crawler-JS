const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`actively crawling for ${currentURL}`)
    
    try {
        const resp = await fetch(currentURL)

        //catches any response above 399 code eg. 404
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return 
        }

        //catches any response which is not responding with HTML
        const  contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`non HTML response,content type: ${contentType}, on the page: ${currentURL}`)
            return
        }

        console.log(await resp.text())
    }  catch(err) {
        console.log(`error in fetch: ${err.message}, on the page: ${currentURL}`)
    }
    
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if(linkElement.href.slice(0, 1) === '/'){
            //relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // absolute url
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

function normaliseURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normaliseURL,
    getURLsFromHTML,
    crawlPage
} 