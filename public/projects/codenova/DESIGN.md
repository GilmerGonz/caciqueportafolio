---
name: Nova Matrix
colors:
  surface: '#071325'
  surface-dim: '#071325'
  surface-bright: '#2e394d'
  surface-container-lowest: '#030e20'
  surface-container-low: '#101c2e'
  surface-container: '#142032'
  surface-container-high: '#1f2a3d'
  surface-container-highest: '#2a3548'
  on-surface: '#d7e3fc'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#d7e3fc'
  inverse-on-surface: '#253144'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#afffd1'
  on-secondary: '#003822'
  secondary-container: '#00ef9f'
  on-secondary-container: '#006742'
  tertiary: '#ffd5cc'
  on-tertiary: '#630f00'
  tertiary-container: '#ffaf9d'
  on-tertiary-container: '#992207'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#4dffb2'
  secondary-fixed-dim: '#00e296'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005234'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a3'
  on-tertiary-fixed: '#3d0600'
  on-tertiary-fixed-variant: '#8c1900'
  background: '#071325'
  on-background: '#d7e3fc'
  surface-variant: '#2a3548'
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  h3:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 80px
---

## Brand & Style

The design system is engineered for an elite technical education environment. It balances a deep-space "dark mode" aesthetic with high-performance accents to evoke feelings of authority, innovation, and digital mastery.

The style is **Modern Corporate-Tech**, characterized by high-contrast typography, precision-engineered spacing, and subtle luminescence. It leverages a "Cyber-Premium" aesthetic that differentiates it from standard mass-market platforms by using technical geometric typefaces and purposeful neon accents against a structured, dark architectural foundation.

- **Minimalist Foundations**: Heavy use of "negative space" in dark tones to reduce cognitive load during complex coding tasks.
- **Glassmorphism**: Applied sparingly to cards and overlays to create depth without sacrificing performance.
- **Subtle Glows**: Strategic use of cyan and green outer glows to highlight progress, interactive states, and "success" moments.

## Colors

This design system utilizes a tiered dark-theme architecture. The **Primary Background (#0A1628)** acts as the void, providing maximum contrast for the **Cyan (#00D4FF)** and **Green (#00F0A0)** accents which represent "Active State" and "Completed/Safe" states respectively.

The **Coral (#FF6B4A)** accent is reserved strictly for high-urgency alerts, error states, or specialized calls to action to prevent visual fatigue. 

Functional color usage:
- **Interactive Elements**: Use the `action_cta` gradient for primary buttons.
- **Depth**: Use `brand_depth` for page headers and hero sections.
- **Information Hierarchy**: Secondary and light background variants are used to distinguish sidebar navigation and nested content areas.

## Typography

The typographic system is designed for high technical legibility. 

1.  **Headlines**: `Space Grotesk` provides a geometric, futuristic feel that signals "modernity." Headlines should use tight letter-spacing to maintain a compact, authoritative look.
2.  **Body**: `Inter` is utilized for its exceptional readability in dense information environments. High weights (700+) should be used sparingly for emphasis.
3.  **Code & Metadata**: `JetBrains Mono` is used for all code snippets, technical metadata, and "Label-Caps" to reinforce the developer-centric nature of the academy.

For mobile devices, H1 sizes scale down significantly to ensure the content remains within the viewport without excessive wrapping.

## Layout & Spacing

The design system follows an **8px grid system** for consistent vertical and horizontal rhythm. 

- **Layout Model**: A 12-column fluid grid is used for desktop (breakpoints > 1024px). For tablets (768px - 1023px), an 8-column grid is preferred. Mobile devices use a 4-column grid.
- **Padding Philosophy**: Components use generous internal padding (stack-md) to ensure a premium, airy feel.
- **Sectioning**: Vertical sections are separated by `stack-xl` to maintain clear thematic boundaries.

## Elevation & Depth

Depth in this system is communicated through **Luminance and Tonal Layering** rather than traditional drop shadows.

- **Level 0 (Floor)**: `#0A1628` (Primary Background).
- **Level 1 (Cards/Sidebar)**: Uses the `surface_card` gradient with a 1px border of `#243B5A`.
- **Level 2 (Floating/Modals)**: Enhanced with a Cyan-tinted glow (`0 0 40px rgba(0, 212, 255, 0.15)`).
- **Interactive State**: Elements like buttons or active cards should transition their border-color from the muted navy to the Cyan or Green accent colors on hover.

**Transitions**: All elevation changes must use the `cubic-bezier(0.4, 0, 0.2, 1)` timing function over a 200ms duration for a "snappy yet smooth" feel.

## Shapes

The shape language is **Technical and Precise**. 

We utilize **Soft (0.25rem)** roundedness for standard UI elements (Inputs, Buttons, Small Chips) to maintain a professional, slightly sharp edge. 

- **Large Containers (Cards, Modals)**: Use `rounded-lg` (0.5rem).
- **Feature Hero Elements**: Use `rounded-xl` (0.75rem).

Avoid fully rounded "pill" shapes for buttons to maintain the serious, architectural tone of the academy; rectangular buttons with subtle rounding feel more "engineered."

## Components

### Buttons
- **Primary**: Uses `action_cta` gradient. Text is `#1A2332` (Dark) for maximum contrast.
- **Secondary**: Ghost style with 1px border of `#00D4FF` and transparent background.
- **Hover State**: 4px vertical lift with a 20% increase in glow intensity.

### Input Fields
- **Default**: Background `#1A2D47`, 1px border `#243B5A`, text `#F0F4FF`.
- **Focus**: Border changes to `#00D4FF` with a subtle outer glow. Label moves to a floating position using `label-caps` typography.

### Cards
- **Construction**: `surface_card` gradient background. 
- **Header**: Use `h3` for titles and `label-caps` for category tags.
- **Interactive**: Cards should have a "Border-Light" effect on hover, where the border color brightens.

### Progress Bars
- **Track**: `#1A2D47`.
- **Indicator**: `#00F0A0` (Green) for completion or `#00D4FF` (Cyan) for in-progress.

### Code Editor (Specialized)
- Background: `#0A1628`.
- Syntax Highlighting: Use Cyan for keywords, Green for strings, and Coral for operators. 
- Font: `JetBrains Mono` at 14px.