import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useEffect } from 'react';
import useUserStore from '@/store/userStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ChartDoughnut() {
  const { totalExpenses, totalIncomes } = useUserStore();
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Euros',
        data: [totalIncomes, totalExpenses],
        backgroundColor: ['#41bb1e ', '#cb4813'],
        borderColor: ['#41bb1e ', '#cb4813'],
      },
    ],
  };

  useEffect(() => {}, [totalIncomes, totalExpenses]);

  return (
    <div className='flex justify-center items-center w-full h-64 sm:h-80 md:h-96 lg:h-1/2'>
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
