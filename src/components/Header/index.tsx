import { useState } from 'react';
import { Eye, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='h-14 flex items-center justify-between px-4 sm:px-6 lg:px-8'>
      <Link className='flex items-center justify-center' to='/'>
        <Eye className='h-6 w-6 mr-2' />
        <span className='font-bold'>MoneyVision</span>
      </Link>
      <nav className='hidden md:flex gap-4 sm:gap-6'>
      <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          to='/home'
        >
          Panel de usuario
        </Link>
        <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          to='/features'
        >
          Características
        </Link>
        <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          to='/testimonials'
        >
          Testimonios
        </Link>
        
      </nav>
      <button
        className='md:hidden'
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label='Toggle menu'
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isMenuOpen && (
        <div className='absolute top-14 left-0 right-0 bg-white shadow-md z-50'>
          <nav className='flex flex-col p-4'>
          <Link
              className='text-sm font-medium py-2 hover:underline underline-offset-4'
              to='/home'
              onClick={toggleMenu}
            >
              Panel de usuario
            </Link>
            <Link
              className='text-sm font-medium py-2 hover:underline underline-offset-4'
              to='/features'
              onClick={toggleMenu}
            >
              Características
            </Link>
            <Link
              className='text-sm font-medium py-2 hover:underline underline-offset-4'
              to='/testimonials'
              onClick={toggleMenu}
            >
              Testimonios
            </Link>
            
            
          </nav>
        </div>
      )}
    </header>
  );
}
