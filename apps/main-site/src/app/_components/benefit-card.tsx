import { Icon } from '@/components/icons';

type BenefitCardProps = {
  icon: Icon;
  title: string;
  description: string;
};

export const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: BenefitCardProps) => (
  <div className="flex gap-6">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-lg bg-[#1a1b1e] flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-white text-xl font-semibold">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  </div>
);
