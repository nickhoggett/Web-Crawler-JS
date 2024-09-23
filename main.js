const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


//in CLI run "npm start <web site address>"

async function main() {
    //catching user errors before crawlpage runs

    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("to many commmand line args")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log(`starting crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})

    printReport(pages)

}
main ()
