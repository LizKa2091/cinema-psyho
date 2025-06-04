export const get30Days = () => {
   const today = new Date();
   const currTimestamp = today.getTime();
   const thirtyDaysAgoTimestamp = currTimestamp - (30 * 24 * 60 * 60 * 1000);
   const datesArray = [];

   for (let timestamp = currTimestamp; timestamp >= thirtyDaysAgoTimestamp; timestamp -= (24 * 60 * 60 * 1000)) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const formattedDate = `${day}.${month}.${year}`;
      datesArray.push(formattedDate);
   }

   return datesArray;
};