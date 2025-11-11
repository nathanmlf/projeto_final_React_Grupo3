import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requireAuth = true 
}) => {
  const { isAuthenticated, hasRole, loading, user } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (!hasRole(requiredRole)) {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          gap: '20px'
        }}>
          <h2>Acesso Negado</h2>
          <p>Você não tem permissão para acessar esta página.</p>
          <p>Role necessário: <strong>{requiredRole}</strong></p>
          {user && (
            <p>Seu role atual: <strong>{user.role || 'Nenhum'}</strong></p>
          )}
          <button onClick={() => window.location.href = '/'}>
            Voltar para Home
          </button>
        </div>
      );
    }
  }

  
  return <>{children}</>;
};

export default ProtectedRoute;