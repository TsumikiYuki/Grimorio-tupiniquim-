
import React from 'react';
import { Rating as RatingType } from '../types';

interface RatingProps {
  rating: RatingType;
  onRate?: (score: number) => void;
  size?: 'sm' | 'md';
}

const StarIcon: React.FC<{ filled: boolean; onHover?: () => void; onClick?: () => void; isHovered?: boolean }> = ({ filled, onHover, onClick, isHovered }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={`h-5 w-5 cursor-pointer ${ (filled || isHovered) ? 'text-yellow-400' : 'text-stone-600'}`} 
      viewBox="0 0 20 20" 
      fill="currentColor"
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const Rating: React.FC<RatingProps> = ({ rating, onRate, size = 'sm' }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  if (onRate) {
    return (
      <div className="flex items-center gap-2" onMouseLeave={() => setHoverRating(0)}>
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => (
            <StarIcon 
              key={star}
              filled={star <= rating.score}
              isHovered={star <= hoverRating}
              onHover={() => setHoverRating(star)}
              onClick={() => onRate(star)}
            />
          ))}
        </div>
        <span className="text-xs text-stone-400">({rating.count} avaliações)</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center ${size === 'sm' ? 'gap-1' : 'gap-2'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} text-yellow-400`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-bold text-stone-300`}>{rating.score.toFixed(1)}</span>
      <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} text-stone-500`}>({rating.count})</span>
    </div>
  );
};

export default Rating;
