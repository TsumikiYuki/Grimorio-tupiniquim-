
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Homebrew } from '../types';
import HomebrewCard from '../components/HomebrewCard';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [myHomebrews, setMyHomebrews] = useState<Homebrew[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserHomebrews = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const data = await api.getUserHomebrews(user.id);
        setMyHomebrews(data);
      } catch (error) {
        console.error("Failed to fetch user's homebrews", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserHomebrews();
  }, [user]);

  if (!user) {
    return <div className="text-center text-stone-400">Usuário não encontrado.</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-6 mb-12 p-8 bg-stone-800/50 border border-stone-700 rounded-lg">
        <img src={user.avatarUrl} alt={user.username} className="w-24 h-24 rounded-full border-2 border-amber-500" />
        <div>
          <h1 className="font-display text-4xl text-amber-400">{user.username}</h1>
          <p className="text-stone-300 mt-2">{user.bio}</p>
        </div>
      </div>
      
      <h2 className="font-display text-3xl text-stone-200 mb-8">Minhas Criações</h2>
      {isLoading ? (
        <div className="text-center text-stone-400">Carregando suas criações...</div>
      ) : (
        myHomebrews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myHomebrews.map(hb => (
              <HomebrewCard key={hb.id} homebrew={hb} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-stone-800 rounded-lg">
            <p className="text-stone-400">Você ainda não criou nenhum homebrew. Que tal começar agora?</p>
          </div>
        )
      )}
    </div>
  );
};

export default ProfilePage;
