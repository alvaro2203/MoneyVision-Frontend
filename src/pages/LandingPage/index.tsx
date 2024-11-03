import { Button, Input } from '@/components/Form';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, PiggyBank, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center space-y-8 text-center'>
              <div className='space-y-8'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Visualiza y gestiona tus finanzas con claridad
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl'>
                  MoneyVision te ayuda a controlar tus gastos, ahorrar dinero y
                  alcanzar tus metas financieras con una visión clara de tu
                  economía.
                </p>
              </div>
              <div className='space-x-4'>
                <Link
                  to='/register'
                  className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
                >
                  Comenzar gratis
                </Link>
                <Link
                  to='/about'
                  className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
                >
                  Saber más
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id='features'
          className='w-full py-12 md:py-24 lg:py-32 bg-gray-100'
        >
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Características principales
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <Card>
                <CardContent className='flex flex-col items-center p-6'>
                  <BarChart3 className='h-12 w-12 mb-4 text-primary' />
                  <h3 className='text-lg font-bold mb-2'>Control de gastos</h3>
                  <p className='text-center text-gray-500'>
                    Registra y categoriza tus gastos para saber dónde va tu
                    dinero.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='flex flex-col items-center p-6'>
                  <PiggyBank className='h-12 w-12 mb-4 text-primary' />
                  <h3 className='text-lg font-bold mb-2'>Metas de ahorro</h3>
                  <p className='text-center text-gray-500'>
                    Establece objetivos de ahorro y sigue tu progreso
                    fácilmente.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='flex flex-col items-center p-6'>
                  <TrendingUp className='h-12 w-12 mb-4 text-primary' />
                  <h3 className='text-lg font-bold mb-2'>
                    Seguimiento de inversiones
                  </h3>
                  <p className='text-center text-gray-500'>
                    Monitorea tus inversiones y analiza su rendimiento en tiempo
                    real.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id='testimonials' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Lo que dicen nuestros usuarios
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <Card>
                <CardContent className='p-6'>
                  <p className='mb-4'>
                    "MoneyVision ha cambiado completamente la forma en que
                    manejo mis finanzas. Ahora tengo una visión clara de mis
                    gastos e ingresos."
                  </p>
                  <p className='font-bold'>María G.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <p className='mb-4'>
                    "Gracias a MoneyVision, he podido ahorrar para mis
                    vacaciones soñadas. ¡Es increíblemente fácil de usar y muy
                    visual!"
                  </p>
                  <p className='font-bold'>Carlos R.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <p className='mb-4'>
                    "Como inversor principiante, MoneyVision me ha ayudado a
                    entender y mejorar mis estrategias de inversión con gráficos
                    claros."
                  </p>
                  <p className='font-bold'>Ana L.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id='cta'
          className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'
        >
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Obtén una visión clara de tus finanzas hoy
              </h2>
              <p className='mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl'>
                Únete a miles de usuarios que ya están mejorando su salud
                financiera con MoneyVision.
              </p>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1 bg-primary-foreground text-primary'
                    placeholder='Ingresa tu email'
                    type='email'
                  />
                  <Button
                    className='bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                    type='submit'
                  >
                    Registrarse
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center border-t'>
          <p className='text-xs text-gray-500'>
            © 2023 MoneyVision. Todos los derechos reservados.
          </p>
          <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
            <Link className='text-xs hover:underline underline-offset-4' to='#'>
              Términos de servicio
            </Link>
            <Link className='text-xs hover:underline underline-offset-4' to='#'>
              Privacidad
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
