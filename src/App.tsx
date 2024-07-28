import './App.css';
import { COMPANY_NAME } from './conts/CONTS';

function App() {
  return (
    <div>
      <h1 className='text-4xl font-bold text-blue-700 mb-4'>
        Bienvenido a {`${COMPANY_NAME}`}
      </h1>
      <section className='p-8 max-w-4xl w-full'>
        <h3 className='text-2xl font-semibold text-yellow-300 mb-6'>
          {`${COMPANY_NAME} `} es una aplicación de gestión financiera diseñada
          para ayudarte a mantener un control detallado de tus ingresos y
          gastos. Con una interfaz intuitiva y moderna, puedes:
        </h3>

        <ul className='list-disc pl-6 space-y-4 text-gray-300 text-left'>
          <li className='text-lg'>
            <p>
              <b>Gestionar Usuarios:</b> Crear y administrar tu perfil,
              incluyendo detalles personales y financieros.
            </p>
          </li>
          <li className='text-lg'>
            <p>
              <b>Registrar Transacciones:</b> Añadir, editar y eliminar
              transacciones, clasificándolas en categorías como ingresos o
              gastos.
            </p>
          </li>
          <li className='text-lg'>
            <p>
              <b>Organizar Categorías:</b> Definir y gestionar categorías para
              tus transacciones, facilitando un análisis financiero más
              detallado.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
