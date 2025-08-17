
import React from 'react';
import { Link } from 'react-router-dom';
import { Homebrew } from '../types';
import Rating from './Rating';

interface HomebrewCardProps {
  homebrew: Homebrew;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const colors: { [key: string]: string } = {
    'Classe': 'bg-red-800 text-red-100',
    'Raça': 'bg-green-800 text-green-100',
    'Magia': 'bg-blue-800 text-blue-100',
    'Item Mágico': 'bg-purple-800 text-purple-100',
    'Monstro': 'bg-yellow-800 text-yellow-100',
    'Outro': 'bg-gray-700 text-gray-200',
  };

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded ${colors[category] || colors['Outro']}`}>
      {category}
    </span>
  );
};


const HomebrewCard: React.FC<HomebrewCardProps> = ({ homebrew }) => {
  const contentPreview = homebrew.content.substring(0, 100).replace(/###/g, '') + '...';

  return (
    <Link to={`/homebrew/${homebrew.id}`} className="block">
      <div className="bg-stone-800/50 border border-stone-700 rounded-lg shadow-lg p-6 hover:bg-stone-800 hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <CategoryBadge category={homebrew.category} />
             <Rating rating={homebrew.rating} />
          </div>
          <h3 className="font-display text-2xl text-amber-400 mb-2">{homebrew.title}</h3>
          <p className="text-stone-400 text-sm leading-relaxed">{contentPreview}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={homebrew.authorAvatarUrl} alt={homebrew.authorUsername} className="w-6 h-6 rounded-full"/>
            <span className="text-xs font-medium text-stone-400">{homebrew.authorUsername}</span>
          </div>
          <span className="text-xs text-stone-500">{new Date(homebrew.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </Link>
  );
};

export default HomebrewCard;
