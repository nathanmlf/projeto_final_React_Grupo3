import { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('userData');
        
        if (savedToken && savedUser) {
          const userData = JSON.parse(savedUser);
          setUser({
            ...userData,
            token: savedToken
          });
        }
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      const token = data.token;

      const userData = {
        id: 1,
        username: username,
        email: `${username}@example.com`,
        role: username === 'admin' || username === 'johnd' ? 'admin' : 'user',
        token: token
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));

      setUser(userData);
      setLoading(false);
      
      return {
        success: true,
        message: 'Login realizado com sucesso!'
      };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.message || 'Erro ao fazer login. Tente novamente.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const hasRole = (roles) => {
    if (!user) {
      return false;
    }

    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }

    return user.role === roles;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
