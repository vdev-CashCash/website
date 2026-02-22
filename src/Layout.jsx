import Header from './Components/Header';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
    const location = useLocation();
    return (
        <>
            {
                location.pathname!=="/" && <Header />
            }
            <main>
                <Outlet />
            </main>
        </>
    )
}