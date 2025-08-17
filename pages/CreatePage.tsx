
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Category } from '../types';
import { CATEGORIES } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

const CreatePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.CLASSE);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Você precisa estar logado para criar um homebrew.');
      return;
    }
    if (!title || !content) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const newHomebrewData = {
        title,
        category,
        content,
        authorId: user.id,
        authorUsername: user.username,
        authorAvatarUrl: user.avatarUrl,
      };
      const createdHomebrew = await api.createHomebrew(newHomebrewData);
      navigate(`/homebrew/${createdHomebrew.id}`);
    } catch (err) {
      setError('Ocorreu um erro ao criar o homebrew. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-stone-800/50 border border-stone-700 p-8 rounded-lg">
      <h1 className="font-display text-4xl text-amber-400 mb-2">Criar Novo Homebrew</h1>
      <p className="text-stone-400 mb-8">Dê vida às suas ideias e compartilhe com a comunidade.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          id="title"
          label="Título da Criação"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: O Bárbaro da Caatinga"
          required
        />
        
        <Select 
          id="category"
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          required
        >
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </Select>

        <Textarea
          id="content"
          label="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          placeholder="Descreva sua criação. Você pode usar markdown simples para títulos (ex: ### Título da Habilidade)."
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="flex justify-end">
          <Button type="submit" size="lg" isLoading={isLoading}>
            Publicar Criação
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
