
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Homebrew, Rating as RatingType } from '../types';
import Rating from '../components/Rating';
import CommentSection from '../components/CommentSection';
import { useAuth } from '../hooks/useAuth';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [homebrew, setHomebrew] = useState<Homebrew | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const fetchHomebrew = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await api.getHomebrewById(id);
        if (data) {
          setHomebrew(data);
        }
      } catch (error) {
        console.error("Failed to fetch homebrew", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomebrew();
  }, [id]);

  const handleRate = async (score: number) => {
    if (!id || !user || hasRated || !homebrew) return;
    setHasRated(true); // Prevent multiple ratings
    try {
        const updatedRating: RatingType = await api.rateHomebrew(id, score);
        setHomebrew(prev => prev ? {...prev, rating: updatedRating} : null);
    } catch(error) {
        console.error("Failed to rate", error);
        setHasRated(false); // Allow retry on failure
    }
  }

  if (isLoading) {
    return <div className="text-center py-20 text-stone-400">Carregando conteúdo...</div>;
  }

  if (!homebrew) {
    return <div className="text-center py-20 text-red-500">Homebrew não encontrado.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-stone-800/50 border border-stone-700 rounded-lg p-8">
        <span className="text-sm font-bold text-amber-500">{homebrew.category}</span>
        <h1 className="font-display text-4xl md:text-5xl text-amber-400 mt-1 mb-4">{homebrew.title}</h1>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-stone-700">
            <div className="flex items-center gap-3">
                <img src={homebrew.authorAvatarUrl} alt={homebrew.authorUsername} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="text-sm text-stone-400">Criado por</p>
                    <p className="font-bold text-stone-200">{homebrew.authorUsername}</p>
                </div>
            </div>
             <div className="flex flex-col items-end">
                <Rating rating={homebrew.rating} onRate={user && !hasRated ? handleRate : undefined} />
                {hasRated && <p className="text-xs text-green-400 mt-1">Obrigado por avaliar!</p>}
             </div>
        </div>

        <div 
          className="prose prose-invert prose-headings:font-display prose-headings:text-amber-400 max-w-none text-stone-300"
          dangerouslySetInnerHTML={{ __html: homebrew.content.replace(/###\s*(.*)/g, '<h3 class="font-display text-xl text-amber-400 mt-6 mb-2">$1</h3>').replace(/\n/g, '<br />') }} 
        />
      </div>

      <CommentSection homebrewId={homebrew.id} comments={homebrew.comments} />
    </div>
  );
};

export default DetailPage;
