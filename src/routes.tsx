import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout';
import SimulationPage from './pages/SimulationFormPage';
import SimulationResultPage from './pages/SimulationResultPage';
import SimulationHistory from './pages/SimulationHistory';


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <SimulationPage />

            },
            {
                path: '/result/:id',
                element: <SimulationResultPage />
            },
            {
                path: '/history',
                element: <SimulationHistory />

            }
        ]
    }
])