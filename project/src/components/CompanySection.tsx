import React from 'react';
import { Package, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function CompanySection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold">TextileMS</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Leading the way in textile management solutions, we provide comprehensive
              tools for efficient inventory control, production management, and business
              growth. Our system is designed to streamline your operations and boost
              productivity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-3 text-gray-600 mb-3">
                <Mail className="h-5 w-5" />
                <span>contact@textilems.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}