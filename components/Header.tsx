import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 md:py-12">
      <div className="inline-flex items-center bg-slate-700/50 text-indigo-300 rounded-full p-1 pr-4 mb-4">
        <SparklesIcon className="w-6 h-6 text-indigo-400 bg-white/10 rounded-full p-1" />
        <span className="ml-2 text-sm font-medium">AI-Powered Analysis</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
        Price Genie
      </h1>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Analyze car rental prices from any UAE-based website. Enter a URL and car details to get an expert price analysis.
      </p>
    </header>
  );
};

export default Header;
