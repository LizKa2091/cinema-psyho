import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IAIResponse, IApiResponse } from "../types/profile.types";

const generateFilmComment = async (prompt: string): Promise<IAIResponse> => {
   try {
      const response: IApiResponse = await axios.post('http://localhost:8000/api/generate-comment', {
            prompt: prompt,
         }, 
      );
      return response.data;
   }
   catch (err) {
      if (err instanceof Error) {
         throw new Error(err.message || 'произошла ошибка')
      }
      else {
         throw new Error('произошла ошибка');
      }
   }
};

export const useGenerateFilmComment = () => {
   return useMutation<IAIResponse, Error, string>({
      mutationKey: ['AIrequest'],
      mutationFn: generateFilmComment
   })
};