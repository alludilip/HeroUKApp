import { test, expect } from '@playwright/test';

import * as path from 'path';
import * as fs from 'fs';

test('upload file using setInputFiles', async ({ page }) => {
  await page.goto('https://example.com/upload'); // Replace with your target URL

  // Locate the input element and set the file(s)
  await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, 'sample.pdf'));

  // upload multiple files by passing array of paths
  await page.getByLabel('Upload files').setInputFiles(['file1.pdf', 'file2.pdf']);
  
  // Optional: Assert the file name or a success message
  await expect(page.locator('.upload-status')).toHaveText('File Uploaded!');

  // Passing empty array to setInputFiles() makes unselect the files if you are already selected.
  await page.getByLabel('Upload file').setInputFiles([]);
  
});


test('download file and verify it', async ({ page, browserName }) => {
  await page.goto('https://example.com'); // Replace with your target URL

  // Start waiting for the download event before clicking the download link
  const downloadPromise = page.waitForEvent('download');
  
  // Perform the action that initiates the download
  await page.getByText('Download PDF').click();
  
  // Wait for the download process to complete
  const download = await downloadPromise;

  // Define the path where you want to save the file
  const downloadPath = path.join(__dirname, 'downloaded-file.pdf');

  // Save the downloaded file to the specified path
  await download.saveAs(downloadPath);

  // Optional: Verify the file exists (requires 'fs' module)
  expect(fs.existsSync(downloadPath)).toBeTruthy();

  // Verify file downloaded
  expect(download.suggestedFilename()).toContain('downloaded-file.pdf')
  
  // Clean up: delete the file after the test
  fs.unlinkSync(downloadPath);
});