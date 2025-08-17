
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Homebrew } from '../types';
import HomebrewCard from '../components/HomebrewCard';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const [latestHomebrews, setLatestHomebrews] = useState<Homebrew[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      setIsLoading(true);
      try {
        const allHomebrews = await api.getHomebrews();
        setLatestHomebrews(allHomebrews.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch homebrews", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div>
      <div className="text-center py-16 px-4 bg-stone-900 rounded-lg border border-stone-800" style={{ backgroundImage: `radial-gradient(circle, rgba(41, 37, 36, 0.95) 0%, rgba(28, 25, 23, 1) 100%), url(https://picsum.photos/seed/dndbg/1200/400)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="font-display text-5xl md:text-6xl text-amber-400 mb-4">Bem-vindo ao Grimório Tupiniquim</h1>
        <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto mb-8">
          Onde a criatividade brasileira encontra o universo de Dungeons & Dragons. Crie, compartilhe e descubra conteúdos únicos para suas aventuras.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/create">
            <Button variant="primary" size="lg">Criar Homebrew</Button>
          </Link>
          <Link to="/explore">
            <Button variant="secondary" size="lg">Explorar Criações</Button>
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl text-stone-200 text-center mb-8">Últimas Criações</h2>
        {isLoading ? (
          <div className="text-center text-stone-400">Carregando grimórios...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestHomebrews.map(hb => (
              <HomebrewCard key={hb.id} homebrew={hb} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
