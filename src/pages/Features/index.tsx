import { Input } from '@/components/Form';
import { Card, CardContent } from '@/components/Card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart2, PiggyBank, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainSection } from '@/components/MainSection';

export default function FeaturesPage() {
  const sectionTitle = 'Características de MoneyVision';
  const sectionDescription =
    'Descubre cómo MoneyVision te ayuda a tomar el control de tus finanzas con herramientas poderosas y fáciles de usar.';

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <MainSection title={sectionTitle} description={sectionDescription} />
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex flex-col items-center mb-4'>
                    <BarChart2 className='h-12 w-12 mb-2 text-primary' />
                    <h2 className='text-2xl font-bold text-center'>
                      Seguimiento de Gastos
                    </h2>
                  </div>
                  <p className='text-gray-500 mb-4 text-left'>
                    Visualiza tus gastos de forma clara y detallada. MoneyVision
                    categoriza automáticamente tus transacciones y te
                    proporciona gráficos intuitivos para entender dónde va tu
                    dinero.
                  </p>
                  <ul className='list-disc list-inside text-gray-500'>
                    <li>Categorización automática de transacciones</li>
                    <li>Gráficos interactivos de gastos</li>
                    <li>Alertas personalizables de gastos excesivos</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex flex-col items-center mb-4'>
                    <PiggyBank className='h-12 w-12 mb-2 text-primary' />
                    <h2 className='text-2xl font-bold text-center'>
                      Metas de Ahorro
                    </h2>
                  </div>
                  <p className='text-gray-500 mb-4 text-left'>
                    Establece y alcanza tus objetivos financieros con nuestra
                    función de metas de ahorro. MoneyVision te ayuda a
                    planificar y seguir tu progreso hacia tus sueños
                    financieros.
                  </p>
                  <ul className='list-disc list-inside text-gray-500'>
                    <li>Creación de metas personalizadas</li>
                    <li>Seguimiento visual del progreso</li>
                    <li>Sugerencias para optimizar tus ahorros</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex flex-col items-center mb-4'>
                    <TrendingUp className='h-12 w-12 mb-2 text-primary' />
                    <h2 className='text-2xl font-bold text-center'>
                      Seguimiento de Inversiones
                    </h2>
                  </div>
                  <p className='text-gray-500 mb-4 text-left'>
                    Mantén un ojo en tus inversiones con nuestras herramientas
                    de seguimiento. MoneyVision te permite ver el rendimiento de
                    tu cartera en tiempo real y tomar decisiones informadas.
                  </p>
                  <ul className='list-disc list-inside text-gray-500'>
                    <li>Integración con múltiples plataformas de inversión</li>
                    <li>Análisis de rendimiento y riesgo</li>
                    <li>Alertas de mercado personalizables</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex flex-col items-center mb-4'>
                    <Shield className='h-12 w-12 mb-2 text-primary' />
                    <h2 className='text-2xl font-bold text-center'>
                      Seguridad Avanzada
                    </h2>
                  </div>
                  <p className='text-gray-500 mb-4 text-left'>
                    Tu seguridad es nuestra prioridad. MoneyVision utiliza
                    encriptación de grado bancario y las últimas medidas de
                    seguridad para proteger tu información financiera.
                  </p>
                  <ul className='list-disc list-inside text-gray-500'>
                    <li>Encriptación de extremo a extremo</li>
                    <li>Autenticación de dos factores</li>
                    <li>Monitoreo continuo de seguridad</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id='pricing' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8 text-center'>
              Comparación de Planes
            </h2>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Característica</TableHead>
                    <TableHead>Plan Gratuito</TableHead>
                    <TableHead>Plan Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>
                      Seguimiento de Gastos
                    </TableCell>
                    <TableCell>Básico</TableCell>
                    <TableCell>Avanzado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>
                      Metas de Ahorro
                    </TableCell>
                    <TableCell>3 metas</TableCell>
                    <TableCell>Ilimitadas</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>
                      Seguimiento de Inversiones
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Incluido</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Soporte</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Email y Chat 24/7</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8 text-center'>
              Preguntas Frecuentes
            </h2>
            <Accordion
              type='single'
              collapsible
              className='w-full max-w-3xl mx-auto'
            >
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  ¿Cómo conecta MoneyVision mis cuentas bancarias?
                </AccordionTrigger>
                <AccordionContent>
                  MoneyVision utiliza conexiones seguras y encriptadas para
                  sincronizar tus cuentas bancarias. Simplemente proporciona tus
                  credenciales de banca en línea, y MoneyVision se encargará del
                  resto, actualizando tus transacciones automáticamente.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>
                  ¿Puedo personalizar las categorías de gastos?
                </AccordionTrigger>
                <AccordionContent>
                  Sí, MoneyVision te permite crear y personalizar categorías de
                  gastos según tus necesidades. Además de nuestras categorías
                  predefinidas, puedes añadir, editar o eliminar categorías para
                  que se ajusten a tu estilo de vida y hábitos de gasto.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>
                  ¿Cómo maneja MoneyVision la seguridad de mis datos
                  financieros?
                </AccordionTrigger>
                <AccordionContent>
                  La seguridad es nuestra máxima prioridad. Utilizamos
                  encriptación de grado bancario para todas las transmisiones de
                  datos, autenticación de dos factores para el acceso a tu
                  cuenta, y nuestros servidores están protegidos con las últimas
                  medidas de seguridad. Además, nunca vendemos ni compartimos tu
                  información personal.
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
                Comienza a transformar tus finanzas hoy
              </h2>
              <p className='mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl'>
                Únete a MoneyVision y descubre el poder de tener una visión
                clara de tus finanzas.
              </p>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                  <Input
                    className='max-w-lg flex-1 bg-primary-foreground text-primary'
                    placeholder='Ingresa tu email'
                    type='email'
                  />
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-10 px-4 py-2 w-full sm:w-auto'
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
