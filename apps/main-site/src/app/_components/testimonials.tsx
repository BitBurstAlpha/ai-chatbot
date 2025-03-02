import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard } from './testimonial-card';

const reviews = [
  {
    name: 'Dilshan Samarokoon',
    profession: 'AI Engineer',
    body: 'Working with this team has been an incredible experience. Their attention to detail, innovative approach, and commitment to delivering high-quality solutions exceeded my expectations',
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Sophia Reynolds',
    profession: 'Product Manager',
    body: 'The level of professionalism and expertise displayed was outstanding. They took the time to understand our needs and delivered a product that has streamlined our processes, saving us valuable time and resources.',
    img: 'https://avatar.vercel.sh/sophia',
  },
  {
    name: 'James Carter',
    profession: 'Software Developer',
    body: 'A truly remarkable experience! The team’s knowledge and problem-solving skills made a huge difference in our project. They provided valuable insights and delivered beyond our expectations.',
    img: 'https://avatar.vercel.sh/james',
  },
  {
    name: 'Ava Thompson',
    profession: 'Marketing Specialist',
    body: 'Absolutely amazing service! Their solutions helped us optimize our marketing campaigns with AI-powered analytics. We have seen a noticeable increase in engagement and conversions since implementing their recommendations.',
    img: 'https://avatar.vercel.sh/ava',
  },
  {
    name: 'Michael Brown',
    profession: 'Data Scientist',
    body: 'I was thoroughly impressed with their deep technical expertise and innovative thinking. They helped us build a robust AI model that has greatly improved our predictive analytics. Would definitely work with them again!',
    img: 'https://avatar.vercel.sh/michael',
  },
  {
    name: 'Emily Watson',
    profession: 'Entrepreneur',
    body: 'From start to finish, the process was seamless. Their dedication to delivering high-quality work and their ability to solve complex problems made a real impact on our business. Highly recommend their services!',
    img: 'https://avatar.vercel.sh/emily',
  },
  {
    name: 'Liam Anderson',
    profession: 'Tech Consultant',
    body: 'Professional, knowledgeable, and highly skilled. They went above and beyond to ensure our project was a success. Their insights into AI and automation were game-changing for our business.',
    img: 'https://avatar.vercel.sh/liam',
  },
  {
    name: 'Olivia Martinez',
    profession: 'UX Designer',
    body: 'Their user-centric approach to design and development was truly refreshing. They delivered an intuitive and engaging interface that has significantly improved user experience and satisfaction.',
    img: 'https://avatar.vercel.sh/olivia',
  },
  {
    name: 'William Roberts',
    profession: 'Business Strategist',
    body: 'I highly recommend their services! Their innovative solutions helped us gain a competitive edge in the market. The AI-driven strategies they implemented resulted in increased efficiency and growth.',
    img: 'https://avatar.vercel.sh/william',
  },
  {
    name: 'Emma Johnson',
    profession: 'CEO, Startup Founder',
    body: 'The expertise and dedication of this team are truly commendable. They transformed our vision into reality with precision and efficiency. Their AI solutions have played a crucial role in our company’s success.',
    img: 'https://avatar.vercel.sh/emma',
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export function Testimonials() {
  return (
    <section>
      <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex bg-[#99C9FF]/10 group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-border ">
            <AnimatedShinyText className=" inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Testimonials</span>
            </AnimatedShinyText>
          </div>
        </div>
        {/* <Button className="rounded-full px-6 h-10">✨ Futures</Button> */}
        <h2 className="text-5xl font-black">Hear From Our Users</h2>
        <p className="opacity-50 max-w-3xl text-center mx-auto">
          Experience the Future of AI Conversations
        </p>
      </div>

      <div className="py-4 relative">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <TestimonialCard key={review.profession} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <TestimonialCard key={review.profession} {...review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
