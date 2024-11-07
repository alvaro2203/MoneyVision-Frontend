// src/components/Sidebar.js
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRightLeft,
  LineChart,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';

function Sidebar() {
  return (
    <aside className='h-screen hidden w-64 border-r bg-gray-300/40 dark:bg-gray-800/40 lg:block'>
      {/* Header del Sidebar con nombre de la aplicación */}
      <header className='flex h-[60px] items-center border-b px-6'>
        <h1 className='text-lg font-bold'>MoneyVision</h1>
      </header>

      {/* Navegación principal */}
      <nav className='flex-1 flex flex-col gap-2 p-4'>
        <NavLink
          to='/home'
          className='flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
          aria-label='Dashboard'
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to='/transactions'
          className='flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
          aria-label='Transacciones'
        >
          <ArrowRightLeft size={20} />
          <span>Transacciones</span>
        </NavLink>
        <NavLink
          to='/investments'
          className='flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
          aria-label='Inversiones'
        >
          <LineChart size={20} />
          <span>Inversiones</span>
        </NavLink>
      </nav>

      {/* Sección inferior con enlaces adicionales y cerrar sesión */}
      <footer className='border-t p-4'>
        <nav
          aria-label='Configuración y Cerrar Sesión'
          className='flex flex-col gap-2'
        >
          <NavLink
            to='/settings'
            className='flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
            aria-label='Configuración'
          >
            <Settings size={20} />
            <span>Configuración</span>
          </NavLink>
          <Button
            className='flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
            aria-label='Cerrar Sesión'
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </Button>
        </nav>
      </footer>
    </aside>
  );
}

export default Sidebar;
