import type { Config } from "tailwindcss";

// class names ending with -tw are for components used in the app
// others are used for config preview components
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl-tw": "1400px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // app components
        "border-tw": "hsl(var(--border-tw))",
        "input-tw": "hsl(var(--input-tw))",
        "ring-tw": "hsl(var(--ring-tw))",
        "background-tw": "hsl(var(--background-tw))",
        "foreground-tw": "hsl(var(--foreground-tw))",
        "primary-tw": {
          DEFAULT: "hsl(var(--primary-tw))",
          "foreground-tw": "hsl(var(--primary-foreground-tw))",
        },
        "secondary-tw": {
          DEFAULT: "hsl(var(--secondary-tw))",
          "foreground-tw": "hsl(var(--secondary-foreground-tw))",
        },
        "destructive-tw": {
          DEFAULT: "hsl(var(--destructive-tw))",
          "foreground-tw": "hsl(var(--destructive-foreground-tw))",
        },
        "muted-tw": {
          DEFAULT: "hsl(var(--muted-tw))",
          "foreground-tw": "hsl(var(--muted-foreground-tw))",
        },
        "accent-tw": {
          DEFAULT: "hsl(var(--accent-tw))",
          "foreground-tw": "hsl(var(--accent-foreground-tw))",
        },
        "popover-tw": {
          DEFAULT: "hsl(var(--popover-tw))",
          "foreground-tw": "hsl(var(--popover-foreground-tw))",
        },
        "card-tw": {
          DEFAULT: "hsl(var(--card-tw))",
          "foreground-tw": "hsl(var(--card-foreground-tw))",
        },
        // config preview
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        "lg-tw": "var(--radius-tw)",
        "md-tw": "calc(var(--radius-tw) - 2px)",
        "sm-tw": "calc(var(--radius-tw) - 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down-tw": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height-tw)",
          },
        },
        "accordion-up-tw": {
          from: {
            height: "var(--radix-accordion-content-height-tw)",
          },
          to: {
            height: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down-tw": "accordion-down-tw 0.2s ease-out",
        "accordion-up-tw": "accordion-up-tw 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
