import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What platforms does Lexi.ai integrate with?',
    answer:
      'Lexi.ai integrates with popular tools like Salesforce, HubSpot, Zendesk, Mailchimp, Shopify, and more. We also support custom integrations for unique needs.',
  },
  {
    question: 'Is coding required to set up integrations?',
    answer:
      'No, Lexi.ai offers a no-code integration process, allowing you to easily connect with various platforms without any programming knowledge.',
  },
  {
    question: 'Can I integrate Lexi.ai with multiple tools at once?',
    answer:
      'Yes, you can integrate Lexi.ai with multiple tools simultaneously, streamlining your workflows and improving efficiency.',
  },
  {
    question: 'How long does it take to set up an integration?',
    answer:
      'The setup time varies depending on the platform, but most integrations can be completed within a few minutes.',
  },
  {
    question: 'Will my data be secure during integration?',
    answer:
      'Yes, Lexi.ai ensures data security with encryption and compliance with industry standards to protect your information.',
  },
  {
    question: 'Can I disconnect an integration if I no longer need it?',
    answer:
      'Yes, you can easily disconnect an integration at any time through the settings without affecting your data.',
  },
  {
    question: 'Do you offer support for setting up integrations?',
    answer:
      'Yes, our support team is available to assist you with the integration process to ensure a smooth setup.',
  },
];

export function FAQSection() {
  return (
    <section className="pb-32 max-w-screen-lg mx-auto">
      <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex bg-[#99C9FF]/10 group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-border ">
            <AnimatedShinyText className=" inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ FAQs</span>
            </AnimatedShinyText>
          </div>
        </div>
        {/* <Button className="rounded-full px-6 h-10">✨ Futures</Button> */}
        <h2 className="text-5xl font-black">Frequently asked questions</h2>
      </div>

      <div className="px-4 py-8">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="px-4 rounded-md bg-gradient-to-r from-[#2563EB]/10 to-[#DBE6FE]/10 "
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-text opacity-50">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
