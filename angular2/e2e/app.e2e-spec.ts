import { ChartPage } from './app.po';

describe('chart App', function() {
  let page: ChartPage;

  beforeEach(() => {
    page = new ChartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
