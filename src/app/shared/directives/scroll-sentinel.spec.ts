import { ScrollSentinel } from './scroll-sentinel';

describe('InfiniteScroll', () => {
  it('should create an instance', () => {
    const directive = new ScrollSentinel();
    expect(directive).toBeTruthy();
  });
});
