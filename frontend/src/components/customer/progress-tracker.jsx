import React from 'react';

const steps = [
  { label: 'Artisan Found', completed: true },
  { label: 'Contacted', completed: true },
  { label: 'Work in Progress', completed: false },
  { label: 'Completed', completed: false },
  { label: 'Review', completed: false }
];

const ProgressTracker = () => {
  return (
    <div className="flex gap-[6px] items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full ${
                step.completed ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
            <span className="mt-2 text-xs text-center">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                steps[index + 1].completed ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressTracker;
