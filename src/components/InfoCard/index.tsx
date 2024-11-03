import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

interface InfoCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isHighlighted?: boolean;
  highlightedClassName?: string;
}

const InfoCard = ({
  title,
  icon,
  children,
  isHighlighted = false,
  highlightedClassName = '',
}: InfoCardProps) => {
  return (
    <Card className={`${isHighlighted ? highlightedClassName : ''}`}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default InfoCard;
