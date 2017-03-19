import { NlDatepickerPage } from './app.po';

describe('Novalinc Datepicker App', () => {
  let page: NlDatepickerPage;

  beforeEach(() => {
    page = new NlDatepickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
