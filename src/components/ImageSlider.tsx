import React, { useState, useEffect } from 'react';

const slides = [
  {
    url: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1920",
    title: "Modern Textile Management",
    subtitle: "Streamline your textile operations with our comprehensive system"
  },
  {
    url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1920",
    title: "Efficient Inventory Control",
    subtitle: "Keep track of your stock with precision and ease"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920",
    title: "Smart Analytics",
    subtitle: "Make data-driven decisions for your textile business"
  }
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden rounded-xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="text-xl max-w-2xl">{slide.subtitle}</p>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}