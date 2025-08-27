import React from 'react';
import type { HistoryItem } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface HistorySectionProps {
  history: HistoryItem[];
  onDelete: (id: string) => void;
  onDownload: () => void;
  onClear: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, onDelete, onDownload, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-white">Saved for Export</h2>
        <div className="flex items-center gap-2">
           <button 
                onClick={onDownload}
                className="inline-flex items-center px-3 py-1.5 bg-slate-700 text-slate-300 text-xs font-medium rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-colors"
            >
                <DownloadIcon className="w-4 h-4 mr-2"/>
                Download CSV
            </button>
            <button 
                onClick={onClear}
                className="inline-flex items-center px-3 py-1.5 bg-red-800/50 text-red-300 text-xs font-medium rounded-md hover:bg-red-800/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-900 transition-colors"
            >
                <TrashIcon className="w-4 h-4 mr-2"/>
                Clear All
            </button>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {history.map(item => (
          <div key={item.id} className="bg-slate-900/70 p-4 rounded-lg flex justify-between items-center transition-colors hover:bg-slate-800">
            <div>
                <p className="font-semibold text-indigo-400">{item.carYear} {item.carMake} {item.carModel}</p>
                <p className="text-sm text-slate-400 mt-1">
                    Compelling Daily: <span className="font-medium text-slate-300">AED {item.compellingPrice.toLocaleString()}</span>
                    <span className="mx-2 text-slate-600">|</span>
                    Range: <span className="font-medium text-slate-300">AED {item.lowestPrice.toLocaleString()} - {item.highestPrice.toLocaleString()}</span>
                </p>
                 <p className="text-xs text-slate-500 mt-2">
                    Saved on {new Date(item.date).toLocaleDateString()}
                </p>
            </div>
            <button 
                onClick={() => onDelete(item.id)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-700 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 flex-shrink-0"
                aria-label="Delete analysis"
            >
                <TrashIcon className="w-5 h-5"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;