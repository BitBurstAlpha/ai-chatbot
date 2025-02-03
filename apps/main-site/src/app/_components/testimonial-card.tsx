import { cn } from '@/lib/utils';

export const TestimonialCard = ({
  img,
  name,
  profession,
  body,
}: {
  img: string;
  name: string;
  profession: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative w-96 cursor-pointer overflow-hidden rounded-xl border p-4',
        'border-gray-50/[.1] bg-background-brand-pressed hover:bg-background-brand-hovered',
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{profession}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
