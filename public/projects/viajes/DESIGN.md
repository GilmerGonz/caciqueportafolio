---
name: VenAventura Narrative
colors:
  surface: '#fbf8ff'
  surface-dim: '#dbd9e0'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fa'
  surface-container: '#efedf4'
  surface-container-high: '#e9e7ee'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1b1b20'
  on-surface-variant: '#454651'
  inverse-surface: '#303036'
  inverse-on-surface: '#f2f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4759a7'
  primary: '#011b6b'
  on-primary: '#ffffff'
  primary-container: '#203481'
  on-primary-container: '#8ea0f4'
  inverse-primary: '#b8c4ff'
  secondary: '#356476'
  on-secondary: '#ffffff'
  secondary-container: '#b7e7fc'
  on-secondary-container: '#39697b'
  tertiary: '#431900'
  on-tertiary: '#ffffff'
  tertiary-container: '#652900'
  on-tertiary-container: '#e78f5f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001355'
  on-primary-fixed-variant: '#2d418e'
  secondary-fixed: '#baeaff'
  secondary-fixed-dim: '#9ecee2'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#194c5e'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#331100'
  on-tertiary-fixed-variant: '#74340a'
  background: '#fbf8ff'
  on-background: '#1b1b20'
  surface-variant: '#e3e1e9'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is anchored in a **Modern Corporate** aesthetic with a strong emphasis on trust and the vastness of the Venezuelan landscape. It balances professional reliability with an adventurous spirit, evoking the feeling of a high-end, curated journey. 

The visual style utilizes **expansive whitespace** to mirror the open vistas of the Gran Sabana, while structured layouts ensure information is easily digestible. High-quality imagery is central to the experience, acting as a window into the destination rather than mere decoration. The interface feels "airy" yet grounded by deep navy anchors.

## Colors
The palette is a monochromatic exploration of blue, symbolizing the diverse waters and skies of Venezuela—from the Caribbean coast to the Orinoco. 

- **Primary Deep Navy:** Used for structural elements like navigation and footers to provide a sense of authority and permanence.
- **Secondary Sky Blue:** Applied to large surface areas and section containers to reduce visual fatigue and maintain a light, "vacation-ready" mood.
- **Interactive Accents:** Bright and Intense blues are reserved strictly for movement and action, guiding the user's eye toward the booking funnel.
- **Background:** A soft, blue-tinted white replaces pure white to prevent harsh contrast and maintain a premium, cohesive environment.

## Typography
The system uses **Plus Jakarta Sans** for headlines to provide a modern, friendly, and approachable geometric feel that resonates with travel and discovery. **Work Sans** is used for body copy to ensure maximum legibility and a grounded, professional tone for travel details and fine print.

Hierarchy is established through tight line-heights on headlines for an editorial look, and generous line-heights on body text to facilitate reading long descriptions of excursions.

## Layout & Spacing
The layout follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Margins:** A standard 24px margin is maintained on mobile, expanding to 48px or more on tablet to allow the content to breathe.
- **Rhythm:** An 8px baseline grid ensures vertical consistency. Large sections are separated by `xl` spacing (80px) to clearly define the journey through the homepage.
- **Imagery:** Large "Hero" components should bleed to the edge of the container or the screen to maximize the impact of the destination photography.

## Elevation & Depth
This design system uses **Ambient Shadows** to create a sense of floating, lightweight layers. 

- **Cards:** Use a soft, tinted shadow: `0 4px 20px rgba(32, 52, 129, 0.15)`. This subtle navy tint in the shadow creates a more natural integration with the blue-white background than a neutral gray shadow.
- **Interactive Layers:** Upon hover, cards should slightly lift (increase Y-offset to 8px and decrease opacity) to provide tactile feedback.
- **Depth Hierarchy:** Navigation bars use a solid background without a shadow to maintain a clean "cut-out" look, while modal overlays use a 40% backdrop blur (glassmorphism) to keep the user oriented within the landscape photography.

## Shapes
The shape language is defined by a **mixed-radius approach** to distinguish between static content and interactive elements.

- **Content Containers:** Cards, image galleries, and input fields utilize a 12px `rounded-lg` radius. This provides a soft, welcoming feel without appearing overly juvenile.
- **Interactive Elements:** Primary and secondary buttons utilize a fully rounded "Pill" shape (50px). This distinction helps the user instinctively identify clickable actions versus informational containers.
- **Icons:** Icons should be housed within circular backgrounds or have rounded terminals to match the typography.

## Components

### Buttons
- **Primary:** Pill-shaped, Deep Navy background, white text. Transitions to Accent 1 (#4EAAFF) on hover.
- **Secondary:** Pill-shaped, transparent background with a 2px Deep Navy border.
- **Size:** Large (56px height) for mobile accessibility on primary booking actions.

### Cards
- **Destination Card:** 12px corner radius, white background, featuring a top-aligned image with a subtle gradient overlay at the bottom for legibility of white text labels.
- **Shadow:** Applied consistently to denote elevation above the Soft Blue-White background.

### Input Fields
- **Search Bars:** Often integrated into hero sections with a 50px radius to match the button style, suggesting a unified "Action" area.
- **Form Inputs:** 12px radius, 1px border using Accent 3 (#678ABA) at 30% opacity.

### Chips & Tags
- **Status/Category:** Small 4px rounded tags using Secondary Sky Blue with Deep Navy text to highlight "New", "Bestseller", or "Adventure Type."

### Navigation
- **Header:** Sticky positioning, using the Deep Navy as the primary background for high contrast against the body content. Links use semi-transparent white, turning fully opaque on hover.