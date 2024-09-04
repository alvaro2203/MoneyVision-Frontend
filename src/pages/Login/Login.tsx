import { useState } from 'react';
import { COMPANY_NAME } from '../../consts';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='bg-white dark:bg-zinc-900'>
      <div className='flex justify-center h-screen'>
        <aside
          className='hidden bg-cover lg:block lg:w-2/3'
          style={{
            backgroundImage: `url(/background.jpg)`,
          }}
        >
          <div className='flex items-center h-full px-32'>
            <div className='text-left'>
              <h2 className='text-6xl font-bold text-white'>{COMPANY_NAME}</h2>

              <p className='max-w-xl mt-3 text-gray-300'>
                Bienvenido a {COMPANY_NAME}, tu plataforma confiable para
                gestionar y controlar tus finanzas personales. Aquí, puedes
                realizar un seguimiento de tus gastos, planificar tu presupuesto
                y alcanzar tus objetivos financieros con facilidad.
              </p>
            </div>
          </div>
        </aside>

        <main className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 text-left'>
          <div className='flex-1'>
            <header className='text-center'>
              <h1 className='text-4xl font-bold text-center text-gray-700 dark:text-white'>
                {COMPANY_NAME}
              </h1>

              <p className='mt-3 text-gray-500 dark:text-gray-300'>
                Inicia sesión para acceder a tu cuenta y tomar el control de tus
                finanzas.
              </p>
            </header>

            <section className='mt-8'>
              <form>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm text-gray-600 dark:text-gray-200'
                  >
                    Dirección de Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='example@example.com'
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-zinc-950 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>

                <div className='mt-6'>
                  <div className='flex justify-between mb-2'>
                    <label
                      htmlFor='password'
                      className='text-sm text-gray-600 dark:text-gray-200'
                    >
                      Contraseña
                    </label>
                    <a
                      href='#'
                      className='text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline'
                    >
                      ¿Olvidó su contraseña?
                    </a>
                  </div>

                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Tu contraseña'
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-zinc-950 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>

                <div className='mt-6'>
                  <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                    Iniciar Sesión
                  </button>
                </div>
              </form>

              <p className='mt-6 text-sm text-center text-gray-400'>
                ¿No tienes una cuenta todavía?{' '}
                <a
                  href='#'
                  className='text-blue-500 focus:outline-none focus:underline hover:underline'
                >
                  Regístrate
                </a>
                .
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
