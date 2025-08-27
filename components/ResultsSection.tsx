import React from 'react';
import { SaveIcon } from './icons/SaveIcon';
import { InfoIcon } from './icons/InfoIcon';
import type { AnalysisResult } from '../types';

interface ResultsSectionProps {
  result: AnalysisResult | null;
  onSave: () => void;
  isLoading: boolean;
}

const StatCard: React.FC<{ title: string; value: string; description: string; color: string; large?: boolean; }> = 
({ title, value, description, color, large = false }) => (
  <div className={`bg-slate-800 p-4 rounded-lg border-l-4 ${color} ${large ? 'md:col-span-2' : ''}`}>
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <div className="relative group">
        <InfoIcon className="w-4 h-4 text-slate-500"/>
        <div className="absolute bottom-full z-10 mb-2 w-48 bg-slate-900 border border-slate-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {description}
        </div>
      </div>
    </div>
    <p className={`mt-1 font-bold text-white ${large ? 'text-4xl' : 'text-3xl'}`}>
        <span className="text-xl font-medium text-slate-400 mr-1">AED</span>
        {value}
    </p>
  </div>
);


const ResultsSection: React.FC<ResultsSectionProps> = ({ result, onSave, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center text-slate-400">
        <p>The Genie is analyzing the website... This might take a moment.</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Analysis for <span className="text-indigo-400">{result.carYear} {result.carMake} {result.carModel}</span></h2>
              <p className="text-slate-400 mt-1 max-w-md truncate">From: {result.url}</p>
            </div>
            <button 
                onClick={onSave}
                className="inline-flex items-center px-4 py-2 bg-slate-700 text-slate-300 text-sm font-medium rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-colors flex-shrink-0"
            >
                <SaveIcon className="w-4 h-4 mr-2"/>
                Save for CSV
            </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard title="Lowest Daily Price" value={`${result.lowestPrice.toLocaleString()}`} description="The absolute cheapest daily rate found on the site." color="border-green-500" />
            <StatCard title="Highest Daily Price" value={`${result.highestPrice.toLocaleString()}`} description="The absolute most expensive daily rate found on the site." color="border-red-500" />
            <StatCard title="Avg. Lowest Daily Prices" value={`${result.averageLowestPrice.toLocaleString()}`} description="The average of the low-end daily prices available." color="border-green-600/70" />
            <StatCard title="Avg. Highest Daily Prices" value={`${result.averageHighestPrice.toLocaleString()}`} description="The average of the high-end daily prices available." color="border-red-600/70" />
            <StatCard 
                title="Genie's Compelling Daily Price" 
                value={`${result.compellingPrice.toLocaleString()}`}
                description="The AI's recommended daily price to be competitive and profitable." 
                color="border-indigo-500" 
                large={true} 
            />
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;