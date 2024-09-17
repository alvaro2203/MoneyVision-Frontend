import { FC, ReactNode } from 'react';

interface MainSection {
  title: string;
  description: string;
  children: ReactNode;
}

export const MainSection: FC<MainSection> = ({
  children,
  title,
  description,
}) => {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6 text-center'>
          {title}
        </h1>
        <p className='max-w-[700px] text-gray-500 md:text-xl mb-12 text-center mx-auto'>
          {description}
        </p>
        {children}
      </div>
    </section>
  );
};
