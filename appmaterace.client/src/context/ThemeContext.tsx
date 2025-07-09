// src/context/ThemeContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme: Theme = prefersDark ? 'dark' : 'light';

    const [theme, setTheme] = useState<Theme>(() => {
        try {
            const savedTheme = localStorage.getItem('theme') as Theme | null;
            return savedTheme || defaultTheme;
        } catch (error) {
            console.error("B³¹d wczytywania motywu z localStorage:", error);
            return defaultTheme;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.error("B³¹d zapisywania motywu do localStorage:", error);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};