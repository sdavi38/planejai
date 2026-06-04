import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout';
import SimulationPage from './pages/SimulationFormPage';
import SimulationResultPage from './pages/SimulationResultPage';


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
                element: <SimulationResultPage />
            },
            {
                path: '/historico',
                element: <h1>Elemento simulado</h1>

            }
        ]
    }
])