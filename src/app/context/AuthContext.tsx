import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const BASE_URL = 'https://medpal-production-dee1.up.railway.app';

interface AuthContextType {
  isAuthenticated: boolean;
  admin: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const savedAdmin = localStorage.getItem('admin');
      if (token && savedAdmin && savedAdmin !== 'undefined') {
        setIsAuthenticated(true);
        setAdmin(JSON.parse(savedAdmin));
      }
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/super-admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'Login failed');

    const accessToken = data.token?.accessToken || data.token || data.accessToken;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('admin', JSON.stringify(data.admin ?? {}));
    setIsAuthenticated(true);
    setAdmin(data.admin ?? {});
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}