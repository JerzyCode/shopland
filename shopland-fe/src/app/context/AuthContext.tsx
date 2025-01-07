import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {getUser, removeUser, saveUser} from '../services/AuthService.ts';
import {User} from "../models/User.ts";

interface AuthContextType {
    user: User | null;
    logout: () => void;
    login: (user: User) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = getUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const logout = () => {
        console.debug('logout()')
        removeUser();
        setUser(null);
    };

    const login = (user: User) => {
        saveUser(user);
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{user, logout, login}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
