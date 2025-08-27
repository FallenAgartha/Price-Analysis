import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  carMake: string;
  setCarMake: (make: string) => void;
  carModel: string;
  setCarModel: (model: string) => void;
  carYear: string;
  setCarYear: (year: string) => void;
  handleAnalysis: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{id: string, label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, disabled: boolean}> = 
  ({ id, label, placeholder, value, onChange, type = 'text', disabled }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-slate-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
);


const InputSection: React.FC<InputSectionProps> = ({ 
    url, setUrl, 
    carMake, setCarMake, 
    carModel, setCarModel, 
    carYear, setCarYear, 
    handleAnalysis, 
    isLoading 
}) => {
  const isButtonDisabled = isLoading || !url.trim() || !carMake.trim() || !carModel.trim() || !carYear.trim();

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <InputField 
                    id="url"
                    label="Website URL to Analyze"
                    placeholder="https://example-uae-rental.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    disabled={isLoading}
                />
            </div>
            <InputField 
                id="carMake"
                label="Car Make"
                placeholder="e.g., Toyota"
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                disabled={isLoading}
            />
            <InputField 
                id="carModel"
                label="Car Model"
                placeholder="e.g., Camry"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                disabled={isLoading}
            />
            <div className="md:col-span-2">
                 <InputField 
                    id="carYear"
                    label="Car Year"
                    placeholder="e.g., 2023"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    type="number"
                    disabled={isLoading}
                />
            </div>
        </div>
        <div className="mt-6 flex justify-end">
            <button
                onClick={handleAnalysis}
                disabled={isButtonDisabled}
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                    </>
                ) : (
                    <>
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Analyze Prices
                    </>
                )}
            </button>
        </div>
    </div>
  );
};

export default InputSection;