import { defineConfig, presetTypography, presetWebFonts, presetWind } from "unocss"
import presetAutoprefixer from "unocss-preset-autoprefixer"
import presetShadcn from "./preset.shadcn-ui"


var presets = [
  presetWind(),
  presetShadcn(),
  presetWebFonts({
    provider: "bunny",
    fonts: {
      sans: {
        name: "Poppins",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      },
    }
  })
]
if (process.env.NODE_ENV === "production") presets.push(presetAutoprefixer())


export default defineConfig({
  presets,
  theme: {
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',

      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: 'calc(var(--radius) - 4px)',
    },
  }
})