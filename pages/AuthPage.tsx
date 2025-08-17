
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would have separate logic for login and register
    // and handle validation (e.g., password match).
    // Here, we just log in the mock user regardless.
    login(username);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-4">
      <div className="max-w-md w-full bg-stone-800/50 border border-stone-700 p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-amber-400">{isLogin ? 'Login' : 'Criar Conta'}</h1>
          <p className="text-stone-400 mt-2">
            {isLogin ? 'Bem-vindo de volta, aventureiro!' : 'Junte-se à nossa guilda!'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Nome de Usuário"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input 
            label="Senha"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <Input 
              label="Confirmar Senha"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <Button type="submit" className="w-full" size="lg">
            {isLogin ? 'Entrar' : 'Registrar'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-amber-500 hover:text-amber-400">
            {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
