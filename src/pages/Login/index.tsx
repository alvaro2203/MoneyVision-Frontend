import { COMPANY_NAME } from '../../consts';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { useLoginLogic } from './logic';

export default function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useLoginLogic();

  return (
    <div className='dark:bg-zinc-900'>
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

              <p className='max-w-xl mt-3 text-white'>
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
              <form onSubmit={handleSubmit}>
                {error && (
                  <p className='mb-4 text-sm text-center text-red-500'>
                    {error}
                  </p>
                )}
                <div>
                  <Label htmlFor='email'>Dirección de Email</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='example@example.com'
                  />
                </div>

                <div className='mt-6'>
                  <div className='flex justify-between mb-2'>
                    <Label htmlFor='password'>Contraseña</Label>
                    <a
                      href='#'
                      className='text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline'
                    >
                      ¿Olvidó su contraseña?
                    </a>
                  </div>

                  <Input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Tu contraseña'
                  />
                </div>

                <div className='mt-6'>
                  <button
                    className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                  </button>
                </div>
              </form>

              <p className='mt-6 text-sm text-center text-gray-400'>
                ¿No tienes una cuenta todavía?{' '}
                <a
                  href='/register'
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
