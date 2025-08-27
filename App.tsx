import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import HistorySection from './components/HistorySection';
import useLocalStorage from './hooks/useLocalStorage';
import { analyzeRentalPrices } from './services/geminiService';
import type { AnalysisResult, HistoryItem } from './types';

const App: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [carMake, setCarMake] = useState<string>('');
    const [carModel, setCarModel] = useState<string>('');
    const [carYear, setCarYear] = useState<string>('');

    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('priceGenieHistory_v2', []);

    const handleAnalysis = async () => {
        if (!url.trim() || !carMake.trim() || !carModel.trim() || !carYear.trim()) return;
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzeRentalPrices(url, carMake, carModel, carYear);
            if (result && result.lowestPrice > 0) {
              setAnalysisResult({
                  ...result,
                  url,
                  carMake,
                  carModel,
                  carYear
              });
            } else {
              setError("The Genie couldn't find any pricing data for that car on the website. Please check your inputs or try a different URL.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        if (!analysisResult) return;
        const newHistoryItem: HistoryItem = {
            ...analysisResult,
            id: new Date().toISOString() + Math.random(),
            date: new Date().toISOString(),
        };
        setHistory([newHistoryItem, ...history]);
    };

    const handleDelete = (id: string) => {
        setHistory(history.filter(item => item.id !== id));
    };
    
    const handleClearHistory = () => {
        if(window.confirm("Are you sure you want to clear all saved analyses?")) {
            setHistory([]);
        }
    };

    const downloadCSV = () => {
        if (history.length === 0) return;
        const headers = "Date of Analyzation,Car Make Model Year,Lowest Daily Price (AED),Highest Daily Price (AED),Compelling Daily Price (AED)\n";
        const rows = history.map(item => {
            const carFullName = `${item.carMake} ${item.carModel} ${item.carYear}`;
            return [
                `"${new Date(item.date).toLocaleString()}"`,
                `"${carFullName}"`,
                item.lowestPrice,
                item.highestPrice,
                item.compellingPrice
            ].join(',');
        }).join("\n");

        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", "price_genie_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div 
              className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
            ></div>
            <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                <Header />
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6" role="alert">
                        <strong className="font-bold">Oops! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <InputSection 
                    url={url}
                    setUrl={setUrl}
                    carMake={carMake}
                    setCarMake={setCarMake}
                    carModel={carModel}
                    setCarModel={setCarModel}
                    carYear={carYear}
                    setCarYear={setCarYear}
                    handleAnalysis={handleAnalysis}
                    isLoading={isLoading}
                />
                
                <ResultsSection 
                    result={analysisResult} 
                    onSave={handleSave}
                    isLoading={isLoading}
                />

                <HistorySection 
                    history={history}
                    onDelete={handleDelete}
                    onDownload={downloadCSV}
                    onClear={handleClearHistory}
                />
            </main>
            <footer className="text-center py-4 text-slate-500 text-sm relative z-10">
              <p>Powered by the Gemini API</p>
            </footer>
        </div>
    );
};

export default App;