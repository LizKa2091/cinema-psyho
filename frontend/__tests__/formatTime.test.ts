import { formatTime } from '../src/utils/formatTime';

describe('format time util tests', () => {
   test('formats time with hours only', () => {
      expect(formatTime('02:00')).toBe('2 часа');
      expect(formatTime('01:00')).toBe('1 час');
      expect(formatTime('05:00')).toBe('5 часов');
   });

   test('formats time with minutes only', () => {
      expect(formatTime('00:01')).toBe('1 минута');
      expect(formatTime('00:02')).toBe('2 минуты');
      expect(formatTime('00:05')).toBe('5 минут');
   });

   test('formats time with hours and minutes', () => {
      expect(formatTime('01:01')).toBe('1 час 1 минута');
      expect(formatTime('02:03')).toBe('2 часа 3 минуты');
      expect(formatTime('05:15')).toBe('5 часов 15 минут');
      expect(formatTime('11:11')).toBe('11 часов 11 минут');
   });

   test('formats invalid format', () => {
      expect(formatTime('0')).toBe('0 минут');
      expect(formatTime('')).toBe('0 минут');
   });
});