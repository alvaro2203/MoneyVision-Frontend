// src/components/Sidebar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRightLeft,
  LineChart,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import useDarkMode from '@/hooks/useDarkMode';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Icono de hamburguesa para pantallas pequeñas */}
      <button
        onClick={toggleSidebar}
        className='p-2 lg:hidden fixed top-4 left-4 z-50'
        aria-label='Toggle Sidebar'
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'min-h-screen fixed inset-y-0 left-0 z-40 flex flex-col justify-start w-52 bg-gray-300/40 dark:bg-gray-800/40 transform transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header del Sidebar */}
        <header className='flex h-[60px] items-center justify-center border-b px-6'>
          <h1 className='text-lg font-bold'>MoneyVision</h1>
        </header>

        {/* Navegación principal */}
        <nav className='flex-1 flex flex-col gap-2 p-4'>
          <NavLink
            to='/dashboard'
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
            to='#'
            className='flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
            aria-label='Inversiones'
          >
            <LineChart size={20} />
            <span>Inversiones</span>
          </NavLink>
        </nav>

        {/* Sección inferior con botones adicionales */}
        <footer className='border-t p-4'>
          <nav
            aria-label='Configuración y Cerrar Sesión'
            className='flex flex-col gap-2'
          >
            <Button
              onClick={toggleDarkMode}
              variant='ghost'
              className={cn(
                'w-full justify-start gap-2',
                'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? 'Modo claro' : 'Modo oscuro'}</span>
            </Button>
            <Button
              variant='ghost'
              className={cn(
                'w-full justify-start gap-2 text-red-500',
                'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              aria-label='Cerrar Sesión'
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </Button>
          </nav>
        </footer>
      </aside>

      {/* Fondo oscuro al abrir el menú en móvil */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className='fixed inset-0 z-30 bg-black opacity-50 lg:hidden'
        ></div>
      )}
    </>
  );
};

export default Sidebar;
