import { test, expect, Page } from '@playwright/test'
import { link } from 'node:fs';

async function getAllLinksFromPage(page: Page) {
    const links = await page.locator('a').all();

    const hrefs = await Promise.all(links.map((link) => link.getAttribute('href')));

    const validHrefs = hrefs.reduce((links, link) => {
        // To check the url and keep record of bad urls
        expect.soft(link).toBeTruthy()

        // Filter out untruthy href, `/***` and `#` links.
        if (link && !link?.startsWith("/") && !link?.startsWith("#"))
            links.add(link)
        return links
    }, new Set<string>())
    return validHrefs;
}

test('Check web URLs', async ({ page }) => {

    // To check the status codes

    await page.goto("https://www.deadlinkchecker.com/");

    const validLinkURLs = await getAllLinksFromPage(page);

    // Iterate over the URLs and check the status code.
    for (const url of validLinkURLs) {
        console.log(url);
    try {
        const response = await page.request.get(url)
        expect
        .soft(response.ok(), url + `has no green status code`)
        .toBeTruthy()
    } catch {
        console.log(url);
        expect.soft(null, url + ` has no green status code`).toBeTruthy()
    }
    }
    
})