import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function InfoCard({ title, description, icon: Icon, color }: InfoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className={`inline-block p-3 rounded-lg ${color} mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}