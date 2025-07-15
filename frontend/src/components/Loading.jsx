import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-gray-600 border-t-teal-500"></div>
    </div>
  );
};

const LoadingSection = ({ title = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-gray-400 text-lg">{title}</p>
    </div>
  );
};

const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 ${className}`}>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6 mb-4"></div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-700 rounded w-20"></div>
          <div className="h-6 bg-gray-700 rounded w-14"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonGrid = ({ count = 6, className = '' }) => {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

const ErrorMessage = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-white text-xl font-bold mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-400 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export { LoadingSpinner, LoadingSection, SkeletonCard, SkeletonGrid, ErrorMessage };