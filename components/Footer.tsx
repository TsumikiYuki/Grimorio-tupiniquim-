
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 border-t border-stone-800">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Grimório Tupiniquim. Feito com paixão pela comunidade de D&D.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
