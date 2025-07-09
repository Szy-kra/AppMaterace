import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';

import { App } from './App';
import { Customers } from './customers/CustomersPage';
import { NewCustomer } from './newCustomer/NewCustomerPage';
import { OrderChanges } from './orderChanges/OrderChangesPage';
import { NewOrder } from './newOrder/NewOrderPage';
import { OrdersList } from './ordersList/OrdersListPage';
import { Products } from './products/ProductsPage';
import { Layout } from './layout/layout';
import { OrderProvider } from './context/OrderContext';
import { CustomerProvider } from './context/CustomerContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- ZMIANA 1: Import ThemeProvider
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        {/* ZMIANA 2: Opakowujemy wszystko w ThemeProvider */}
        <ThemeProvider>
            <BrowserRouter>
                <OrderProvider>
                    <CustomerProvider>
                        <Routes>
                            <Route path='/' element={<Layout />}>
                                <Route index element={<App />} />
                            </Route>
                            <Route path='/Customers' element={<Layout />}>
                                <Route index element={<Customers />} />
                            </Route>
                            <Route path='/NewCustomer' element={<Layout />}>
                                <Route index element={<NewCustomer />} />
                            </Route>
                            <Route path='/OrderChanges' element={<Layout />}>
                                <Route index element={<OrderChanges />} />
                            </Route>
                            <Route path='/NewOrder' element={<Layout />}>
                                <Route index element={<NewOrder />} />
                            </Route>
                            <Route path='/OrdersList' element={<Layout />}>
                                <Route index element={<OrdersList />} />
                            </Route>
                            <Route path='/Products' element={<Layout />}>
                                <Route index element={<Products />} />
                            </Route>
                        </Routes>
                    </CustomerProvider>
                </OrderProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

// ---------------------------inny sposob routingu-------------------------
//-------------------------------------------------------------------------
//import { Configuration } from "./configuration/ConfigurationPage.jsx";
//import { Customers } from "./customers/CustomersPage.jsx";
//import { OrderChanges } from "./orderChanges/OrderChangesPage.jsx";
//import { NewOrder } from "./newOrder/NewOrderPage.jsx";
//import { OrdersList } from "./ordersList/OrdersListPage.jsx";
//import { Products } from "./products/ProductsPage.jsx";
//import { Layout } from './layout/layout';


//import {
//    createBrowserRouter,
//    RouterProvider,
//} from "react-router-dom";

//const router = createBrowserRouter([
//    {
//        path: "/",
//        element: <App />,
//        children: [
//            {
//                path: "ordersList",
//                element: <OrdersList />,
//            },
//            {
//                path: "customers",
//                element: <Customers />,
//            },
//            {
//                path: "products",
//                element: <Products />,
//            },
//            {
//                path: "configuration",
//                element: <Configuration />,
//            },
//            {
//                path: "newOrder",
//                element: <NewOrder />,
//            },
//            {
//                path: "orderChanges",
//                element: <OrderChanges />,
//            },
//            {
//                path: 'layout',
//                element: <Layout />, // Dodanie Layout jako jednej z tras
//            },
//        ],
//    },
//]);




