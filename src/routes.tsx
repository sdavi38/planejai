import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout';
import SimulationPage from './pages/SimulationPage';


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <SimulationPage />

            },
            {
                path: '/result',
                element: <h1>Elemento simulado</h1>
            },
            {
                path: '/historico',
                element: <h1>Elemento simulado</h1>

            }
        ]
    }
])