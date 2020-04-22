describe('Stale elements', () => {
  it('shows the rerendered element as displayed', async () => {
    await browser.url('https://stale-element-repro.netlify.app/');

    const button = await browser.$('.start');
    await button.click();
    const element = await browser.$('.inner');
    await element.waitForDisplayed();
    await element.waitForDisplayed();
    await element.waitForDisplayed();
    await element.waitForDisplayed();
    await element.waitForDisplayed();
  });
});
