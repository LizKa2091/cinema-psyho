export const generateAIprompt = (filmId: number, nameRu: string, description: string) => {
   return `мне не понравился фильм ${nameRu} с id фильма кинопоиска ${filmId}${description ? ` и описанием ${description}` : ''}. придумай комментарий. только текст`;
};