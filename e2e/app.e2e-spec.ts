import { GitfizzbuzzPage } from './app.po';

describe('gitfizzbuzz App', () => {
  let page: GitfizzbuzzPage;

  beforeEach(() => {
    page = new GitfizzbuzzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
