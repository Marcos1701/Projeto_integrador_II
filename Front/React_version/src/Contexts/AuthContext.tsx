// import axios from "axios";
import axios from "axios";
import React, { createContext, useContext, useMemo, useState } from "react";
// import { ulid } from 'ulidx';

export type User = {
    access_token: string;
}

export type singinData = {
    email: string;
    senha: string;
    lembrar?: boolean;
}

export type singupData = {
    nome: string;
    email: string;
    senha: string;
    lembrar?: boolean;
}


interface AuthContextType {
    user: User | null
    signin: (data: singinData) => Promise<string | void>
    singup: (user: singupData) => Promise<string | void>
    signout: () => void
    isAuthenticated: boolean
}

const defaultValue = {} as AuthContextType

const AuthContext = createContext<AuthContextType>(defaultValue)

interface AuthProviderProps {
    children: React.ReactNode
}

export const api_url: string = "http://localhost:3300/"
//"https://legendary-space-spoon-gvjqgjx7gx92vv5g-3300.app.github.dev/"

// AuthProvider encapsula o AuthContextProvider e o AuthContext
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(
        localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('user')!
        ) : null
    )

    const signin = async (data: singinData): Promise<string | void> => {

        const response = await axios.post<User>(`${api_url}auth/login`, {
            email: data.email,
            senha: data.senha
        })

        if (response.status === 401) {
            return response.statusText;
        }

        if (data.lembrar) {
            localStorage.setItem('access_token', JSON.stringify(response.data))
        }
        setUser(response.data);
    }

    const singup = async (user: singupData): Promise<string | void> => {

        const response = await axios.post<User>(`${api_url}auth/register`, {
            nome: user.nome,
            email: user.email,
            senha: user.senha
        })

        if (response.status === 401) {
            return response.statusText;
        }

        setUser(response.data);
    }

    const signout = (): void => {
        setUser(null);
        localStorage.removeItem('access_token');
    }

    const value = useMemo(() => ({
        user, signin, singup, signout, isAuthenticated: user != null
    }), [user])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const authContext = useContext(AuthContext)

    if (!authContext)
        throw new Error('useAuth fora do AuthProvider!')

    return authContext
}