import { Input } from '@/components/Form';
import { Card, CardContent } from '@/components/Card';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainSection } from '@/components/MainSection';

export default function TestimonialsPage() {
  const sectionTitle = 'Lo que dicen nuestros usuarios';
  const sectionDescription =
    'Descubre cómo MoneyVision ha ayudado a miles de personas a tomar el control de sus finanzas y alcanzar sus metas económicas.';

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <MainSection title={sectionTitle} description={sectionDescription} />

        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl font-bold mb-8 text-center'>
              Testimonios destacados
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 rounded-full bg-gray-200 mr-4'></div>
                    <div>
                      <h3 className='font-bold'>María Rodríguez</h3>
                      <p className='text-sm text-gray-500'>Emprendedora</p>
                    </div>
                  </div>
                  <p className='mb-4'>
                    "MoneyVision ha sido un cambio de juego para mi negocio.
                    Ahora puedo ver claramente mis gastos e ingresos, lo que me
                    ha permitido tomar decisiones más informadas y aumentar mis
                    beneficios en un 30% en solo 6 meses."
                  </p>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 rounded-full bg-gray-200 mr-4'></div>
                    <div>
                      <h3 className='font-bold'>Carlos Sánchez</h3>
                      <p className='text-sm text-gray-500'>Padre de familia</p>
                    </div>
                  </div>
                  <p className='mb-4'>
                    "Gracias a MoneyVision, por fin pude crear un presupuesto
                    familiar realista y cumplirlo. La función de metas de ahorro
                    nos ha ayudado a ahorrar para las vacaciones de nuestros
                    sueños sin estrés financiero."
                  </p>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl font-bold mb-8 text-center'>
              Más experiencias de usuarios
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <Card>
                <CardContent className='p-4'>
                  <p className='mb-2'>
                    "La visualización de gastos de MoneyVision me ayudó a
                    identificar y eliminar gastos innecesarios. ¡He ahorrado más
                    de 200€ al mes!"
                  </p>
                  <p className='font-bold'>- Ana G.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4'>
                  <p className='mb-2'>
                    "Como inversor principiante, el seguimiento de inversiones
                    de MoneyVision ha sido invaluable. Me ha dado la confianza
                    para diversificar mi cartera."
                  </p>
                  <p className='font-bold'>- Pedro M.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4'>
                  <p className='mb-2'>
                    "La función de categorización automática me ahorra horas
                    cada mes. Ahora tengo más tiempo para disfrutar de mi dinero
                    en lugar de solo contarlo."
                  </p>
                  <p className='font-bold'>- Laura T.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl font-bold mb-8 text-center'>
              MoneyVision en números
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='text-center'>
                <p className='text-4xl font-bold mb-2'>50,000+</p>
                <p>Usuarios activos</p>
              </div>
              <div className='text-center'>
                <p className='text-4xl font-bold mb-2'>€10M+</p>
                <p>Ahorrados por usuarios</p>
              </div>
              <div className='text-center'>
                <p className='text-4xl font-bold mb-2'>98%</p>
                <p>Satisfacción del cliente</p>
              </div>
              <div className='text-center'>
                <p className='text-4xl font-bold mb-2'>4.8/5</p>
                <p>Calificación promedio</p>
              </div>
            </div>
          </div>
        </section>
        <section id='cta' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Únete a miles de usuarios satisfechos
              </h2>
              <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl'>
                Comienza tu viaje hacia la libertad financiera con MoneyVision
                hoy mismo.
              </p>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1'
                    placeholder='Ingresa tu email'
                    type='email'
                  />
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
                  >
                    Empezar gratis
                  </button>
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
