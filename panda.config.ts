import { defineConfig } from "@pandacss/dev";
import { createPreset } from '@park-ui/panda-preset';
import pandaPreset from '@pandacss/preset-panda';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: 'teal',
      grayColor: 'slate',
      borderRadius: 'lg'
    }),
    pandaPreset
  ],

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            value: "#0ea5e9"
          },
          background: {
            value: "#e0f2fe"
          }
        }
      }
    },
  },
  jsxFramework: "react",
  // The output directory for your css system
  outdir: "styled-system",
});
