// src/context/OrderContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CustomerType, ProductType } from '../types/types';

export interface OrderItem {
    id: number;
    product: ProductType;
    selectedComfort: 'miekki' | 'sredni' | 'twardy';
    selectedColor: string;
    selectedSize: string;
    quantity: number;
    itemCalculatedPrice: number;
    totalItemPrice: number;
    displayPrice: string;
    totalDisplayPrice: string;
}

export interface Order {
    id: number;
    customer: CustomerType;
    items: OrderItem[];
    totalAmount: number;
    status: 'Nowe' | 'W realizacji' | 'Wys³ane' | 'Anulowane';
    paid: boolean;
    orderDate: Date;
}

interface OrderContextType {
    orders: Order[];
    addOrder: (orderData: { customer: CustomerType; items: OrderItem[]; totalAmount: number }) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>(() => {
        try {
            const savedOrdersJSON = localStorage.getItem('orders');
            if (savedOrdersJSON) {
                const savedOrders = JSON.parse(savedOrdersJSON) as Order[];
                return savedOrders.map(order => ({
                    ...order,
                    orderDate: new Date(order.orderDate),
                }));
            }
        } catch (error) {
            console.error("B³¹d podczas wczytywania zamówieñ z localStorage:", error);
        }
        return [];
    });

    useEffect(() => {
        try {
            localStorage.setItem('orders', JSON.stringify(orders));
        } catch (error) {
            console.error("B³¹d podczas zapisywania zamówieñ do localStorage:", error);
        }
    }, [orders]);

    const addOrder = (orderData: { customer: CustomerType; items: OrderItem[]; totalAmount: number }) => {
        const fullOrder: Order = {
            ...orderData,
            id: Date.now(),
            status: 'Nowe',
            paid: false,
            orderDate: new Date(),
        };
        setOrders(prevOrders => [...prevOrders, fullOrder]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};