---
name: Artisanal Coffee & Boutique Mini App
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#50443f'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#82746e'
  outline-variant: '#d4c3bc'
  surface-tint: '#795745'
  primary: '#250f03'
  on-primary: '#ffffff'
  primary-container: '#3d2314'
  on-primary-container: '#af8874'
  inverse-primary: '#e9bda7'
  secondary: '#83532b'
  on-secondary: '#ffffff'
  secondary-container: '#ffbf8e'
  on-secondary-container: '#794b24'
  tertiary: '#280e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#451f03'
  on-tertiary-container: '#be835f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#e9bda7'
  on-primary-fixed: '#2d1608'
  on-primary-fixed-variant: '#5e402f'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#f9b989'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#673c16'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#fab890'
  on-tertiary-fixed: '#321300'
  on-tertiary-fixed-variant: '#693b1d'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1.25rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system draws its inspiration from warm, artisanal boutique cafes and high-end roasteries. Designed specifically for the fast-paced, context-sensitive environment of a Telegram Mini App and modern mobile web, it channels an emotional response of comforting indulgence, refined luxury, and approachable hospitality. 

The aesthetic is characterized by:
- **Warm Tactile Minimalism:** Smooth off-white canvases paired with velvety roast browns and rich caramel tones evoke the sensory experience of freshly brewed espresso, steamed oat milk, and toasted pastries.
- **Boutique Editorial Elegance:** Refined serif headlines establish craft and authenticity, balanced with clean, ultra-legible geometric sans-serif copy optimized for compact mobile viewports.
- **Ergonomic Mini App First:** Focused on bottom-sheet interactions, thumb-zone accessible action targets, soft card elevated surfaces, and snappy micro-interactions that feel native inside embedded messengers and mobile screens.

## Colors

The color palette centers around the visual warmth of roasting, brewing, and artisanal ceramic tableware.

- **Primary (`#3D2314`):** Deep roasted espresso brown. Serves as the high-contrast anchor for primary interactive controls, active navigation nodes, and bold typographical hierarchy. A lighter roast variant (`#5C3826`) handles secondary interactive states and card overlays.
- **Secondary (`#C48B5E`):** Warm toasted caramel gold. Highlights promotional banners, floating badge pills, ratings, and focus states with a radiant amber glow.
- **Tertiary (`#9C6644`):** Rich cinnamon brown. Applied to supportive badges, subtle icons, tags, and category chips.
- **Neutral Canvas (`#FAF7F2`):** Steamed oat milk off-white. Provides a soft, glare-free background that enhances comfort and reading endurance compared to stark pure white. Surface cards utilize crisp pure white (`#FFFFFF`) or warm beige cream (`#F5EBE1`) to provide clear visual depth without heavy outlines.
- **Text & Contrast:** Primary text uses `#2B180D`, subtext uses `#7A6658`, and muted borders utilize `#E8DFD5`.

## Typography

Typography establishes an intentional dialogue between classic editorial grace and hyper-functional mobile readability.

- **Headlines (`Playfair Display`):** Conveys the heritage, craftsmanship, and bespoke luxury of a boutique European coffeehouse. Applied sparingly to brand hero messaging, section titles, and featured product names.
- **Body & Labels (`Plus Jakarta Sans`):** Delivers clean geometry, crisp horizontal metrics, and friendly rounded terminals that pair seamlessly with rounded card UI components and maintain high legibility under dense menu listings.
- **Hierarchy Rules:** 
  - Price tags utilize `label-lg` or `headline-sm` set in bold weights for instantaneous scanning.
  - Category headers and banner badges use uppercase tracking (`0.04em` - `0.06em`) to preserve legibility at micro scales on mobile viewports.

## Layout & Spacing

The layout model is optimized around mobile-first webviews and embedded mini apps with fluid adaptability to tablet and desktop screens.

- **Canvas Constraints:** On mobile devices, layouts stretch fluidly with a consistent `1rem` (16px) outer edge margin. When rendered inside desktop browsers or Telegram Desktop, content bounds strictly to a centered `480px` maximum viewport container to retain the intimate handheld phone experience.
- **Rhythm & Grid:** Built upon a 4px/8px modular spacing baseline. 
  - Standard horizontal card carousels (e.g., categories, popular picks) maintain a `0.75rem` (12px) gutter.
  - Section vertical rhythm adheres strictly to `space-lg` (24px) to keep screens clean without visual clutter.
  - Nested card padding standardizes at `space-md` (16px) for spacious breathing room around product imagery and metadata.

## Elevation & Depth

Visual depth is achieved through ambient, latte-tinted drop shadows paired with soft layered tonal surfaces rather than harsh dark drop shadows or stark outlines.

- **Level 0 (Flat Canvas):** The base app backdrop (`#FAF7F2`).
- **Level 1 (Surface Cards & Search Inputs):** `#FFFFFF` or `#F5EBE1` backgrounds paired with a warm ambient shadow: `0 4px 16px -2px rgba(61, 35, 20, 0.06)`. This creates a tactile, floating card presence reminiscent of pressed cream cardstock.
- **Level 2 (Active Pills & Category Icons):** Raised circular action items and floating cards utilize `0 6px 20px -3px rgba(61, 35, 20, 0.10)` to communicate interactive affordance.
- **Level 3 (Sticky Bottom Bar & Modals):** Persistent ordering bottom bars and bottom-sheets adopt a deep protective elevation: `0 -4px 24px 0 rgba(61, 35, 20, 0.08)`, gently fading out background scrolling content.
- **Overlays:** Hero banners employ a deep espresso-to-transparent gradient (`linear-gradient(180deg, rgba(61, 35, 20, 0.85) 0%, rgba(61, 35, 20, 0.2) 100%)`) allowing creamy white text to remain legible over rich food photography.

## Shapes

The design system embraces generous, organic curves that echo porcelain teacups, coffee saucers, and rounded biscuit packaging.

- **Containers & Product Cards:** Utilize `rounded-xl` (1.5rem / 24px) for outer card silhouettes, creating an approachable luxury feel.
- **Category Icon Buttons:** Rendered as full circles (`rounded-full`) or smooth squircles to guide natural touch target placement.
- **Search Bar & Action Buttons:** Styled with full pill geometries (`rounded-full`) to reinforce ease of tapping on mobile touchscreens.
- **Badges & Tags:** Compact pill shapes (`rounded-full`) wrapping bestseller or discount text snugly.

## Components

### Buttons
- **Primary Action (e.g., "Order Now", Checkout):** Pill-shaped container filled with Deep Espresso (`#3D2314`) and high-contrast cream typography (`#FAF7F2`). Includes a subtle inline circular arrow or icon badge. Pressed states shift smoothly to `#5C3826`.
- **Secondary Action:** Transparent base with a 1.5px border in `#C48B5E` or `#3D2314`, paired with matching text.
- **Floating Add Button (`+`):** Pill or circular button (`36px × 36px`) anchored to the bottom-right of product cards in `#3D2314` with a crisp white icon.

### Chips & Category Selectors
- **Circular Category Node:** A circular container (56px–64px) layered on `#FFFFFF` with a fine line illustration and label below. Active states transition the background to `#3D2314` with icon and text inverting to `#FAF7F2`.
- **Tag Badges:** Micro-pills set on `#C48B5E` or `#FAF7F2` with dark espresso labels (e.g., "BESTSELLER", "CHEF'S PICK").

### Input Fields & Search Bars
- **Global Search:** Full-width pill-shaped field with `#FFFFFF` background, subtle ambient shadow, coffee-hued search icon on the left, and filter toggle icon button on the right. Placeholder text set in `#7A6658`.

### Product & Promo Cards
- **Product Cards:** Two-column grid cards featuring an upper 1:1 rounded image container, small floating tag badge, crisp serif title, two-line muted description, star rating row, price, and floating plus button.
- **Promo Banners:** Full-width banner featuring rich photography, warm espresso gradient backing, dual headline typography (serif script + bold serif headline), and an embedded pill CTA button.

### Navigation & Bottom Bar
- **App Dock (Mini App Nav):** Fixed floating bottom navigation bar crafted in pure `#FFFFFF` with soft upward warm shadows, featuring icon and label combinations. The central active item (e.g., "Order") is enclosed in an elevated espresso pill or circle.