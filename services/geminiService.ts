import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    lowestPrice: { 
        type: Type.NUMBER, 
        description: "The absolute lowest daily rental price found in AED." 
    },
    averageLowestPrice: { 
        type: Type.NUMBER, 
        description: "The average of the lowest tier of daily prices found for the car in AED." 
    },
    highestPrice: { 
        type: Type.NUMBER, 
        description: "The absolute highest daily rental price found in AED." 
    },
    averageHighestPrice: { 
        type: Type.NUMBER, 
        description: "The average of the highest tier of daily prices found for the car in AED." 
    },
    compellingPrice: { 
        type: Type.NUMBER, 
        description: "A recommended competitive daily rental price in AED, balancing customer appeal and company profit." 
    },
  },
  required: ["lowestPrice", "averageLowestPrice", "highestPrice", "averageHighestPrice", "compellingPrice"]
};

export const analyzeRentalPrices = async (url: string, carMake: string, carModel: string, carYear: string): Promise<Omit<AnalysisResult, 'url' | 'carMake' | 'carModel' | 'carYear'>> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const prompt = `
    You are an expert car rental price analyst called 'Price Genie', specializing in the UAE market.
    Your task is to analyze the provided website URL to find rental prices for a specific car.
    All prices you find or calculate must be in AED (United Arab Emirates Dirham).

    Website to analyze: ${url}
    Car to find: ${carYear} ${carMake} ${carModel}

    Please perform the following steps:
    1.  Imagine you are visiting the website and looking for daily rental prices for the specified car model and year.
    2.  Scan the website for all available prices for this car.
    3.  Identify the absolute lowest price and the absolute highest price.
    4.  Calculate the average of the low-end prices you find.
    5.  Calculate the average of the high-end prices you find.
    6.  Based on all the data, generate a 'compelling price'. This price should be attractive to customers but still ensure profitability for the rental company. It should be a smart, data-driven recommendation.
    7.  Return your complete analysis in the specified JSON format.

    If you cannot find any data for the specified car on the website, return an object with all price fields set to 0.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("API returned an empty response.");
    }

    const result = JSON.parse(jsonText);

    if (result && typeof result.lowestPrice === 'number') {
        return result;
    }

    throw new Error("Failed to parse valid analysis from the data. The model might not have found relevant information.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze prices: ${error.message}`);
    }
    throw new Error("An unknown error occurred during analysis.");
  }
};