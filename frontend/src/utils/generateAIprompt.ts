export const generateAIprompt = (filmId: number, nameRu: string, description: string, filmType: string) => {
   let status: string = '';

   switch (filmType) {
      case 'watchLater':
         status = 'я буду смотреть позже';
         break;
      case 'disliked':
         status = 'мне не понравился';
         break;
      case 'already watched':
         status = 'я уже смотрел';
         break;
   }

   return `${status} фильм ${nameRu} с id фильма кинопоиска ${filmId}${description ? ` и описанием ${description.slice(0, 500)}` : ''}. придумай комментарий про фильм и моё отношение к нему. только текст`;
};