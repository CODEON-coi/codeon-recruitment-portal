import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mission', path: '/#mission' },
    { name: 'Departments', path: '/#departments' },
    { name: 'Benefits', path: '/#benefits' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Smooth scroll for hash links if on home page
  const handleNavClick = (hash: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      // If not on home, Link will handle routing, but we need to wait for render to scroll
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-codeon-dark/90 backdrop-blur-md border-b border-codeon-surface' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-codeon-accent/10 rounded-lg flex items-center justify-center border border-codeon-accent/20 group-hover:border-codeon-accent/50 transition-colors">
              <Terminal className="text-codeon-accent w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CODEON</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              location.pathname === '/' ? (
                <button 
                  key={link.name}
                  onClick={() => handleNavClick(link.path.split('/')[1])}
                  className="text-sm font-medium text-slate-400 hover:text-codeon-accent transition-colors"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-slate-400 hover:text-codeon-accent transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            
            <Link 
              to="/apply"
              className="px-5 py-2.5 rounded-lg bg-codeon-accent text-codeon-dark font-bold text-sm hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-slate-300 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-codeon-surface border-b border-slate-700"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                 location.pathname === '/' ? (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path.split('/')[1])}
                    className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    {link.name}
                  </button>
                 ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    {link.name}
                  </Link>
                 )
              ))}
               <Link 
                to="/apply"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 rounded-lg bg-codeon-accent text-codeon-dark font-bold"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;