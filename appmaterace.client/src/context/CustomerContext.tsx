import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CustomerType, allCustomers as defaultCustomers } from '../types/types';

interface CustomerContextType {
    customers: CustomerType[];
    addCustomer: (customerData: Omit<CustomerType, 'id'>) => void;
    deleteCustomer: (id: number) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const [customers, setCustomers] = useState<CustomerType[]>(() => {
        try {
            const savedCustomersJSON = localStorage.getItem('customers');
            if (savedCustomersJSON) {
                return JSON.parse(savedCustomersJSON) as CustomerType[];
            }
        } catch (error) {
            console.error("B³¹d podczas wczytywania klientów z localStorage:", error);
        }
        return defaultCustomers;
    });

    useEffect(() => {
        try {
            localStorage.setItem('customers', JSON.stringify(customers));
        } catch (error) {
            console.error("B³¹d podczas zapisywania klientów do localStorage:", error);
        }
    }, [customers]);

    const addCustomer = (customerData: Omit<CustomerType, 'id'>) => {
        const newCustomer: CustomerType = {
            ...customerData,
            id: Date.now(),
        };
        setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
    };

    const deleteCustomer = (id: number) => {
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
    };

    return (
        <CustomerContext.Provider value={{ customers, addCustomer, deleteCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomers = () => {
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error('useCustomers must be used within a CustomerProvider');
    }
    return context;
};