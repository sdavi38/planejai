import { createBrowserRouter } from 'react-router-dom';
import { Button } from './components/Shared/Button';
import { User2 } from 'lucide-react';
import RootLayout from './components/layout/RootLayout';


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Button variant='primary' icon={User2}> teste </Button>
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