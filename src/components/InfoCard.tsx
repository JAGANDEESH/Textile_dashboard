import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function InfoCard({ title, description, icon: Icon, color }: InfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition-all hover:shadow-xl hover:scale-105 duration-300 flex flex-col items-center text-center">
      {/* Icon with Background */}
      <div className={`flex items-center justify-center p-3 rounded-xl ${color} mb-4 shadow-md`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      
      {/* Title with Hover Effect */}
      <a href="/FA" className="text-lg font-semibold mb-2 block text-gray-900 hover:text-blue-600 transition-colors"target = "_blank">
        {title}
      </a>
      
      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
