import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'shiny-text': 'shiny-text 8s infinite',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      fontFamily: {
        inter: ['var(--font-inter-sans)'],
      },
      colors: {
        surface: {
          DEFAULT: 'var(--surface-color-surface)',
          hovered: 'var(--surface-color-surface-hovered)',
          pressed: 'var(--surface-color-surface-pressed)',
        },
        background: {
          brand: 'var(--background-color-background-brand)',
          'brand-hovered': 'var(--background-color-background-brand-hovered)',
          'brand-pressed': 'var(--background-color-background-brand-pressed)',
          disabled: 'var(--background-color-background-disabled)',
        },
        text: {
          DEFAULT: 'var(--text-color-text)',
          inverse: 'var(--text-color-text-inverse)',
          disabled: 'var(--text-color-text-disabled)',
          subtle: 'var(--text-color-text-subtle)',
          subtlest: 'var(--text-color-text-subtlest)',
          brand: 'var(--text-color-text-brand)',
          selected: 'var(--text-color-text-selected)',
          success: 'var(--text-color-text-success)',
          warning: 'var(--text-color-text-warning)',
          danger: 'var(--text-color-text-danger)',
        },
        link: {
          DEFAULT: 'var(--link-color-link)',
          hovered: 'var(--link-color-link-hovered)',
          pressed: 'var(--link-color-link-pressed)',
        },
        border: {
          DEFAULT: 'var(--border-color-border)',
          brand: 'var(--border-color-border-brand)',
          disabled: 'var(--border-color-border-disabled)',
          focused: 'var(--border-color-border-focused)',
          input: 'var(--border-color-border-input)',
          inverse: 'var(--border-color-border-inverse)',
          success: 'var(--border-color-border-success)',
          warning: 'var(--border-color-border-warning)',
          danger: 'var(--border-color-border-danger)',
        },
        icon: {
          DEFAULT: 'var(--icon-color-icon)',
          inverse: 'var(--icon-color-inverse)',
          brand: 'var(--icon-color-brand)',
          information: 'var(--icon-color-icon-information)',
          success: 'var(--icon-color-icon-success)',
          warning: 'var(--icon-color-icon-warning)',
          danger: 'var(--icon-color-icon-danger)',
          discovery: 'var(--icon-color-icon-discovery)',
          disabled: 'var(--icon-color-icon-disabled)',
        },
        gradient: {
          'gradient-01-0': 'var(--gradient-gradient_01-0)',
          'gradient-01-100': 'var(--gradient-gradient_01-100)',
          'cardType01-100': 'var(--gradient-cardType01-100)',
          'cardType01-200': 'var(--gradient-cardType01-200)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
