export interface AnalysisResult {
  url: string;
  carMake: string;
  carModel: string;
  carYear: string;
  lowestPrice: number;
  averageLowestPrice: number;
  highestPrice: number;
  averageHighestPrice: number;
  compellingPrice: number;
}

export interface HistoryItem extends AnalysisResult {
  id: string;
  date: string;
}
