import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { Button } from '../ui/button';
import React from 'react';
import { cn } from '@/lib/utils';

const serviceLinks: { title: string; href: string }[] = [
  {
    title: 'Chatbot',
    href: '/chatbot',
  },
  {
    title: 'Tickets',
    href: '/tickets',
  },
  {
    title: 'Elements',
    href: '/elements',
  },
  {
    title: 'Email Support',
    href: '/email-support',
  },
];

export const Header = () => {
  return (
    <div className="sticky z-50">
      <div className="pt-8">
        <header className="max-w-7xl mx-auto bg-gradient-to-b rounded-lg from-[#09091D] to-[#09091D]">
          <nav className="flex items-center justify-between h-20 px-8">
            {/* Logo */}
            <Link href="/" className="text-blue-500 text-xl font-bold">
              Lexi.AI
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 text-sm bg-[#99C9FF]/10 px-8 py-3 border-border border rounded-full ">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="p-4 min-w-40 bg-surface border-0 ring-0">
                        {serviceLinks.map((service) => (
                          <ListItem
                            key={service.title}
                            title={service.title}
                            href={service.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem></NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Docs
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/pricing" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Pricing
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign in</Button>
              <Button>Sign-Up</Button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ComponentRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-surface-hovered hover:text-text-brand focus:bg-accent focus:text-text-brand',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
