export const formatTime = (timeStamp: string) => {
   const minutes: number = +timeStamp.slice(3);
   const hours: number = +timeStamp.slice(0, 2);

   const getHours = (hours: number) => {
      if (hours % 10 === 1 && hours % 100 !== 11) return 'час';
      if (hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20)) return 'часа';
      return 'часов';
   };

   const getMinutes = (minutes: number) => {
      if (minutes % 10 === 1 && minutes % 100 !== 11) return 'минута';
      if (minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20)) return 'минуты';
      return 'минут';
   };

   let result = [];
   if (hours > 0) result.push(`${hours} ${getHours(hours)}`);
   if (minutes > 0) result.push(`${minutes} ${getMinutes(minutes)}`);
   return result.length > 0 ? result.join(' ') : '0 минут';
};