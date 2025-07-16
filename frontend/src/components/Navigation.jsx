import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Download, Sparkles, Zap } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                  Sahil
                </span>
              </h1>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-gray-300 hover:text-teal-400 transition-all duration-300 text-sm font-medium py-2 px-1 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:block">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-teal-500/25"
            >
              <Download className="h-4 w-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 p-2 rounded-full transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl mt-4 mx-2 border border-gray-700/50 shadow-xl">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-300 hover:text-teal-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 text-sm font-medium"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"></div>
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-700/50">
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 rounded-full transition-all duration-300 shadow-lg shadow-teal-500/25"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;