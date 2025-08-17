
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Homebrew, Category } from '../types';
import { CATEGORIES } from '../constants';
import HomebrewCard from '../components/HomebrewCard';

const ExplorePage: React.FC = () => {
  const [homebrews, setHomebrews] = useState<Homebrew[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  useEffect(() => {
    const fetchHomebrews = async () => {
      setIsLoading(true);
      try {
        const categoryFilter = selectedCategory === 'all' ? undefined : selectedCategory;
        const data = await api.getHomebrews(categoryFilter);
        setHomebrews(data);
      } catch (error) {
        console.error("Failed to fetch homebrews", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomebrews();
  }, [selectedCategory]);

  return (
    <div>
      <h1 className="font-display text-4xl text-amber-400 mb-2">Explorar Homebrews</h1>
      <p className="text-stone-400 mb-8">Navegue por todas as criações da comunidade.</p>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 border-b-2 border-stone-800 pb-4">
            <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedCategory === 'all' ? 'bg-amber-600 text-white' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'}`}
            >
                Todos
            </button>
            {CATEGORIES.map(cat => (
                 <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedCategory === cat ? 'bg-amber-600 text-white' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'}`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-stone-400 py-16">Buscando pergaminhos...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homebrews.length > 0 ? (
            homebrews.map(hb => <HomebrewCard key={hb.id} homebrew={hb} />)
          ) : (
            <p className="text-center text-stone-500 col-span-full py-16">Nenhuma criação encontrada para esta categoria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
