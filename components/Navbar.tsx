
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-stone-700 text-amber-400'
        : 'text-stone-300 hover:bg-stone-800 hover:text-white'
    }`;

  return (
    <nav className="bg-stone-900/80 backdrop-blur-sm border-b border-stone-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-amber-400 font-display text-2xl flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
              </svg>
              Grimório Tupiniquim
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/explore" className={navLinkClasses}>Explorar</NavLink>
                <NavLink to="/create" className={navLinkClasses}>Criar Homebrew</NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-stone-300 hover:text-white">
                  <img src={user.avatarUrl} alt={user.username} className="h-8 w-8 rounded-full" />
                  <span>{user.username}</span>
                </Link>
                <Button onClick={logout} variant="secondary" size="sm">Sair</Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="sm">Entrar / Registrar</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
