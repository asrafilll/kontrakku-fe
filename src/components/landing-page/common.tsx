import React from "react";

export const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-4 md:px-6">{children}</div>
  </section>
);

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start p-6 bg-white rounded-lg transition-all hover:shadow-xl">
    <div className="p-3 bg-blue-100 rounded-md mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
  </div>
);

export const StepItem = ({
  stepNumber,
  title,
  description,
}: {
  stepNumber: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col md:flex-row items-start md:space-x-6 space-y-4 md:space-y-0">
    <div className="flex-shrink-0">
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg">
        {stepNumber}
      </span>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);
