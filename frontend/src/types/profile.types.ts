export interface ISavedCategoriesItem {
   value: string;
   label: string;
   icon: any;
}

export interface IAIResponse {
   result: string;
   model: string;
   usage: {
      prompt_tokens: number;
      completion_tokens: number;
   };
   message?: string;
}

export interface IApiResponse {
   data: IAIResponse;
}