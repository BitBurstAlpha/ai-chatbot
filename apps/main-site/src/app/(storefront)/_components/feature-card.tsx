import { Icon } from '@/components/icons';

type FeatureCardProps = {
  icon: Icon;
  title: string;
  description: string;
};

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => (
  <div className="p-6 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors">
    <div className="w-12 h-12 rounded-lg bg-blue-950 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);
