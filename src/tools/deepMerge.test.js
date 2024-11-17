import { deepMerge } from './deepMerge';
import { describe, it, expect } from 'jest';

describe('deepMerge', () => {
  it('should return the single object when only one is provided', () => {
    const obj = { a: 1, b: 2 };
    expect(deepMerge(obj)).toEqual(obj);
  });

  it('should merge two simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const expected = { a: 1, b: 3, c: 4 };
    expect(deepMerge(obj1, obj2)).toEqual(expected);
  });

  it('should deeply merge nested objects', () => {
    const obj1 = { a: { x: 1, y: 2 }, b: 3 };
    const obj2 = { a: { y: 3, z: 4 }, c: 5 };
    const expected = { a: { x: 1, y: 3, z: 4 }, b: 3, c: 5 };
    expect(deepMerge(obj1, obj2)).toEqual(expected);
  });

  it('should merge arrays by replacing them', () => {
    const obj1 = { a: [1, 2], b: 2 };
    const obj2 = { a: [3, 4], c: 3 };
    const expected = { a: [3, 4], b: 2, c: 3 };
    expect(deepMerge(obj1, obj2)).toEqual(expected);
  });

  it('should handle merging more than two objects', () => {
    const obj1 = { a: 1, b: { x: 10 } };
    const obj2 = { b: { y: 20 }, c: 3 };
    const obj3 = { a: 4, b: { z: 30 }, d: 5 };
    const expected = { a: 4, b: { x: 10, y: 20, z: 30 }, c: 3, d: 5 };
    expect(deepMerge(obj1, obj2, obj3)).toEqual(expected);
  });

  it('should handle merging with null and undefined values', () => {
    const obj1 = { a: 1, b: null, c: 3 };
    const obj2 = { b: 2, c: undefined, d: 4 };
    const expected = { a: 1, b: 2, c: undefined, d: 4 };
    expect(deepMerge(obj1, obj2)).toEqual(expected);
  });

  it('should not modify the original objects', () => {
    const obj1 = { a: { x: 1 } };
    const obj2 = { a: { y: 2 } };
    const result = deepMerge(obj1, obj2);
    expect(obj1).toEqual({ a: { x: 1 } });
    expect(obj2).toEqual({ a: { y: 2 } });
    expect(result).toEqual({ a: { x: 1, y: 2 } });
  });
});