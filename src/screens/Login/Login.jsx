import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <h1 className={styles['login-title']}>Login</h1>
        
        <form onSubmit={handleSubmit} className={styles['login-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              disabled={loading}
              className={styles['login-input']}
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={loading}
              className={styles['login-input']}
            />
          </div>

          {error && (
            <div className={styles['error-message']}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={styles['login-button']}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className={styles['login-info']}>
          <p><strong>Para testar:</strong></p>
          <p>Usuário: <code>johnd</code> ou <code>admin</code> (role: admin)</p>
          <p>Senha: <code>m38rmF$</code> (qualquer senha funciona na API fake)</p>
          <p>Outros usuários terão role: <code>user</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
