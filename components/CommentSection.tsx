
import React, { useState } from 'react';
import { Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import Button from './Button';
import Textarea from './Textarea';

interface CommentSectionProps {
  homebrewId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ homebrewId, comments: initialComments }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      const commentData = {
        authorId: user.id,
        authorUsername: user.username,
        authorAvatarUrl: user.avatarUrl,
        content: newComment
      };
      const postedComment = await api.postComment(homebrewId, commentData);
      setComments([postedComment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="font-display text-2xl text-stone-300 border-b-2 border-stone-700 pb-2 mb-6">Comentários</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            id="comment"
            label="Deixe seu comentário"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Compartilhe sua opinião sobre este homebrew..."
            required
          />
          <div className="mt-2">
            <Button type="submit" isLoading={isSubmitting}>
              Enviar Comentário
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center bg-stone-800 p-4 rounded-md">
          <p className="text-stone-400">Você precisa estar logado para comentar.</p>
        </div>
      )}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="flex items-start gap-4">
              <img src={comment.authorAvatarUrl} alt={comment.authorUsername} className="h-10 w-10 rounded-full" />
              <div className="flex-1 bg-stone-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-amber-400">{comment.authorUsername}</p>
                  <p className="text-xs text-stone-500">{new Date(comment.createdAt).toLocaleString('pt-BR')}</p>
                </div>
                <p className="text-stone-300 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-stone-500 text-center">Nenhum comentário ainda. Seja o primeiro!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
