import { generateAIprompt } from '../src/utils/generateAIprompt';

describe('generateAIprompt util tests', () => {
   const id = 2;
   const title = 'Тест';
   const description = 'Тест';
   
   test('generates prompt for "watchLater"', () => {
      const result = generateAIprompt(id, title, description, 'watchLater');

      expect(result).toContain('я буду смотреть позже фильм Тест с id фильма кинопоиска 2');
      expect(result).toContain('и описанием Тест');
      expect(result).toContain('придумай комментарий');
   });

   test('generates prompt for disliked', () => {
      const result = generateAIprompt(id, title, description, 'disliked');
      
      expect(result.startsWith('мне не понравился фильм')).toBe(true);
   });

   test('generates prompt for already watched', () => {
      const result = generateAIprompt(id, title, description, 'already watched');
      
      expect(result.startsWith('я уже смотрел фильм')).toBe(true);
   });

   test('generates prompt for empty desc', () => {
      const result = generateAIprompt(id, title, '', 'watchLater');
      
      expect(result).not.toContain('и описанием');
   });

   test('truncates long description to 500 chars', () => {
      const longDesc = 'A'.repeat(600);
      const result = generateAIprompt(id, title, longDesc, 'watchLater');
      const match = result.match(/и описанием (.+?)\. придумай/);

      expect(match).not.toBeNull();
      expect(match?.[1].length).toBeLessThanOrEqual(500);
   });
});
