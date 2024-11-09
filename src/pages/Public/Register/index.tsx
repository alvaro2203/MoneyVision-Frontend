import { COMPANY_NAME } from '@/consts';
import { useRegisterLogic } from './logic';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Register() {
  const { formData, loading, error, handleChange, handleSubmit } =
    useRegisterLogic();

  const { name, username, email, money, password, repeatedPassword } = formData;

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
                Regístrate para acceder a tu cuenta y tomar el control de tus
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
                  <Label htmlFor='name'>Nombre</Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    placeholder='Tu nombre'
                    onChange={handleChange}
                  />
                </div>

                <div className='mt-6'>
                  <Label htmlFor='username'>Nombre de usuario</Label>
                  <Input
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    placeholder='Tu nombre de usuario'
                    onChange={handleChange}
                  />
                </div>

                <div className='mt-6'>
                  <Label htmlFor='email'>Dirección de Email</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={handleChange}
                    placeholder='example@example.com'
                  />
                </div>

                <div className='mt-6'>
                  <Label htmlFor='money'>Dinero</Label>
                  <Input
                    type='number'
                    name='money'
                    id='money'
                    value={money}
                    onChange={handleChange}
                  />
                </div>

                <div className='mt-6'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={handleChange}
                    placeholder='Tu contraseña'
                  />
                </div>

                <div className='mt-6'>
                  <Label htmlFor='repeatedPassword'>Repite Contraseña</Label>
                  <Input
                    type='password'
                    name='repeatedPassword'
                    id='repeatedPassword'
                    value={repeatedPassword}
                    onChange={handleChange}
                    placeholder='Tu contraseña repetida'
                  />
                </div>

                <div className='mt-6'>
                  <button
                    className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Registrarse'}
                  </button>
                </div>
              </form>

              <p className='mt-6 text-sm text-center text-gray-400'>
                ¿Ya tienes una cuenta?{' '}
                <a
                  href='/login'
                  className='text-blue-500 focus:outline-none focus:underline hover:underline'
                >
                  Inicia sesión
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
