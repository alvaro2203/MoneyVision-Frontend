import { Input } from '@/components/Form';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6'>
              Acerca de MoneyVision
            </h1>
            <p className='max-w-[700px] text-gray-500 md:text-xl mb-12'>
              MoneyVision nació con la misión de empoderar a las personas para
              tomar el control de sus finanzas personales de una manera simple y
              visual.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <Card>
                <CardContent className='p-6'>
                  <h2 className='text-2xl font-bold mb-4'>Nuestra Misión</h2>
                  <p className='text-gray-500'>
                    Proporcionar herramientas intuitivas y poderosas que
                    permitan a las personas entender, gestionar y mejorar su
                    salud financiera.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <h2 className='text-2xl font-bold mb-4'>Nuestra Visión</h2>
                  <p className='text-gray-500'>
                    Un mundo donde todas las personas tengan el conocimiento y
                    las herramientas para alcanzar sus metas financieras y vivir
                    con tranquilidad económica.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Nuestro Equipo
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto'>
              <Card>
                <CardContent className='p-6 text-center'>
                  <div className='w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4'></div>
                  <h3 className='text-xl font-bold mb-2'>Álvaro Aparicio</h3>
                  <p className='text-gray-500'>Fundador y CEO</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 text-center'>
                  <div className='w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4'></div>
                  <h3 className='text-xl font-bold mb-2'>Óscar García</h3>
                  <p className='text-gray-500'>Fundador y CTO</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Preguntas Frecuentes
            </h2>
            <Accordion
              type='single'
              collapsible
              className='w-full max-w-3xl mx-auto'
            >
              <AccordionItem value='item-1'>
                <AccordionTrigger>¿Cómo funciona MoneyVision?</AccordionTrigger>
                <AccordionContent>
                  MoneyVision te permite conectar tus cuentas bancarias y
                  tarjetas de crédito de forma segura. Luego, categorizamos
                  automáticamente tus transacciones y te proporcionamos
                  visualizaciones claras de tus gastos e ingresos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>
                  ¿Es seguro usar MoneyVision?
                </AccordionTrigger>
                <AccordionContent>
                  Sí, la seguridad es nuestra prioridad. Utilizamos encriptación
                  de grado bancario y nunca almacenamos tus credenciales
                  bancarias. Además, no vendemos ni compartimos tu información
                  personal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>
                  ¿Cuánto cuesta usar MoneyVision?
                </AccordionTrigger>
                <AccordionContent>
                  Ofrecemos un plan gratuito con funcionalidades básicas. Para
                  características avanzadas, tenemos planes premium que
                  comienzan desde 5€ al mes. Puedes ver todos nuestros planes en
                  la sección de precios.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section
          id='cta'
          className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'
        >
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Comienza tu viaje hacia la libertad financiera
              </h2>
              <p className='mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl'>
                Únete a MoneyVision hoy y da el primer paso hacia una mejor
                gestión de tus finanzas.
              </p>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1 bg-primary-foreground text-primary'
                    placeholder='Ingresa tu email'
                    type='email'
                  />
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-10 px-4 py-2'
                  >
                    Empezar
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
