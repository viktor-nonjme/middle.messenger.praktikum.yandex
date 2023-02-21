import { set, toDate } from './helpers';

const { expect } = require('chai');

describe('Helpers function', () => {
  describe('toDate', () => {
    it('should return correct time', () => {
      const time = '2022-12-26T18:21:44+00:00';

      const result = toDate(time);

      expect(result, '26 декабря 2022 г., 21:21');
    });
  });

  describe('set', () => {
    let obj: any;
    let path: any;

    beforeEach(() => {
      path = 'test.test';
      obj = {};
    });

    it('should return passed object if it is not an object', () => {
      obj = 3;

      const result = set(obj, 'test.test', 3);

      expect(result).to.eq(obj);
    });

    it('should return passed null if null is passed an first argument', () => {
      obj = null;

      const result = set(obj, path, 3);

      expect(result).to.eq(obj);
    });

    it('should throw an error if path is not a string', () => {
      path = 10 as any;

      const fn = () => set(obj, path, 3);

      expect(fn).to.throw(Error);
    });

    it('should set a value by keypath to the object', () => {
      const result = set(obj, path, 3);

      expect((result as any).test.test).to.eq(3);
    });

    it('should not return new object', () => {
      const result = set(obj, path, 3);

      expect(result).to.eq(obj);
    });
  });
});
