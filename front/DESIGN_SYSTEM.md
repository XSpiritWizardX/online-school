# Online School Design System

## Overview

This design system provides a cohesive, modern, and accessible foundation for the Online School application. It's built with a dark-first approach, emphasizing readability, usability, and visual hierarchy.

## Design Principles

1. **Accessibility First**: All components meet WCAG 2.1 AA standards
2. **Consistency**: Unified spacing, typography, and color usage across all components
3. **Scalability**: Modular system that grows with the application
4. **Performance**: Optimized for fast loading and smooth interactions
5. **Modern**: Contemporary design patterns with subtle animations and effects

## Color Palette

### Primary Colors (Blue)
- **50**: `#f0f9ff` - Lightest blue for backgrounds
- **100**: `#e0f2fe` - Very light blue
- **200**: `#bae6fd` - Light blue
- **300**: `#7dd3fc` - Medium light blue
- **400**: `#38bdf8` - Medium blue
- **500**: `#0ea5e9` - Primary blue (main brand color)
- **600**: `#0284c7` - Dark blue
- **700**: `#0369a1` - Darker blue
- **800**: `#075985` - Very dark blue
- **900**: `#0c4a6e` - Darkest blue
- **950**: `#082f49` - Ultra dark blue

### Secondary Colors (Purple)
- **50**: `#faf5ff` - Lightest purple
- **500**: `#a855f7` - Primary purple
- **600**: `#9333ea` - Dark purple
- **700**: `#7c3aed` - Darker purple

### Accent Colors
- **Success Green**: `#10b981` - For success states, checkmarks, positive actions
- **Warning Orange**: `#f59e0b` - For warnings, alerts, attention-grabbing elements
- **Error Red**: `#ef4444` - For errors, destructive actions, validation failures

### Neutral Colors (Dark Theme)
- **Primary Background**: `#0f172a` - Main background color
- **Secondary Background**: `#1e293b` - Cards, modals, elevated surfaces
- **Tertiary Background**: `#334155` - Hover states, active elements
- **Primary Text**: `#f8fafc` - Main text color
- **Secondary Text**: `#cbd5e1` - Secondary text, labels
- **Tertiary Text**: `#94a3b8` - Muted text, placeholders
- **Quaternary Text**: `#64748b` - Disabled text

## Typography

### Font Families
- **Primary**: Inter - Clean, modern sans-serif for UI elements
- **Secondary**: Poppins - Friendly, rounded sans-serif for headings
- **Monospace**: JetBrains Mono - For code, technical content

### Font Scale
- **xs**: 12px - Small labels, captions
- **sm**: 14px - Body text, form labels
- **base**: 16px - Default body text
- **lg**: 18px - Large body text
- **xl**: 20px - Small headings
- **2xl**: 24px - Medium headings
- **3xl**: 30px - Large headings
- **4xl**: 36px - Extra large headings
- **5xl**: 48px - Hero headings
- **6xl+**: 60px+ - Display headings

### Font Weights
- **Thin**: 100 - Very light text
- **Light**: 300 - Light text
- **Normal**: 400 - Regular text
- **Medium**: 500 - Medium weight text
- **Semibold**: 600 - Semi-bold text
- **Bold**: 700 - Bold text
- **Extrabold**: 800 - Extra bold text
- **Black**: 900 - Heaviest text

## Spacing System

Based on a 4px grid system for consistent spacing:

- **0**: 0px - No spacing
- **1**: 4px - Very small spacing
- **2**: 8px - Small spacing
- **3**: 12px - Medium-small spacing
- **4**: 16px - Medium spacing
- **6**: 24px - Large spacing
- **8**: 32px - Extra large spacing
- **12**: 48px - Very large spacing
- **16**: 64px - Huge spacing
- **20+**: 80px+ - Massive spacing

## Border Radius

- **sm**: 2px - Small elements
- **base**: 4px - Default radius
- **md**: 6px - Medium elements
- **lg**: 8px - Large elements
- **xl**: 12px - Extra large elements
- **2xl**: 16px - Very large elements
- **3xl**: 24px - Huge elements
- **full**: 9999px - Fully rounded (circles)

## Shadows

- **xs**: Subtle shadow for small elements
- **sm**: Light shadow for cards
- **md**: Medium shadow for elevated elements
- **lg**: Large shadow for modals, dropdowns
- **xl**: Extra large shadow for major elements
- **2xl**: Massive shadow for hero elements
- **glow**: Colored glow effect for interactive elements

## Components

### Buttons

#### Primary Button
- Background: Primary blue
- Text: White
- Use: Main actions, CTAs
- States: Default, hover, active, disabled

#### Secondary Button
- Background: Secondary background
- Text: Primary text
- Border: Primary border
- Use: Secondary actions

#### Ghost Button
- Background: Transparent
- Text: Secondary text
- Use: Subtle actions, links

#### Button Sizes
- **Small**: Compact for tight spaces
- **Medium**: Default size
- **Large**: Prominent actions
- **Extra Large**: Hero CTAs

### Input Fields

- Background: Secondary background
- Border: Primary border
- Focus: Primary blue with glow
- Placeholder: Tertiary text
- States: Default, focus, error, disabled

### Cards

- Background: Secondary background
- Border: Primary border
- Shadow: Medium shadow
- Hover: Elevated shadow with slight lift
- Use: Content containers, feature highlights

### Navigation

- Background: Primary background with blur
- Height: 64px
- Border: Bottom border
- Z-index: Fixed positioning
- Responsive: Collapsible on mobile

### Modals

- Overlay: Semi-transparent with blur
- Background: Secondary background
- Border: Primary border
- Shadow: Extra large shadow
- Animation: Slide in from top

### Dropdowns

- Background: Secondary background
- Border: Primary border
- Shadow: Large shadow
- Animation: Fade in with scale
- Positioning: Absolute with proper z-index

## Icons

### Icon Library
- **React Icons**: Primary icon library
- **Feather Icons**: Clean, minimal icons
- **Font Awesome**: Comprehensive icon set
- **Custom Icons**: Brand-specific icons

### Icon Guidelines
- Size: 16px, 20px, 24px, 32px
- Color: Inherit from parent or use semantic colors
- Style: Outline preferred, filled for emphasis
- Spacing: 8px from text

## Layout

### Grid System
- **Mobile**: Single column, full width
- **Tablet**: Two columns, responsive
- **Desktop**: Multi-column, max width containers
- **Breakpoints**: 640px, 768px, 1024px, 1280px, 1536px

### Container Sizes
- **Small**: 640px max width
- **Medium**: 768px max width
- **Large**: 1024px max width
- **Extra Large**: 1280px max width
- **Full**: 100% width

### Spacing Guidelines
- **Section Spacing**: 48px - 80px between major sections
- **Component Spacing**: 24px - 32px between components
- **Element Spacing**: 8px - 16px between related elements
- **Text Spacing**: 16px - 24px between paragraphs

## Animations

### Transitions
- **Fast**: 150ms - Hover states, small interactions
- **Normal**: 250ms - Default transitions
- **Slow**: 350ms - Page transitions, major changes
- **Bounce**: 500ms - Playful interactions

### Easing
- **Default**: `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth, natural
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Playful

### Animations
- **Fade In**: Opacity transition
- **Slide Up**: Transform with opacity
- **Bounce**: Playful bounce effect
- **Glow**: Colored glow on hover

## Accessibility

### Color Contrast
- All text meets WCAG 2.1 AA standards
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text

### Focus States
- Visible focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader friendly

### Motion
- Respects `prefers-reduced-motion` setting
- Subtle animations that don't cause discomfort
- Clear state changes

## Usage Guidelines

### Do's
- Use the design system consistently across all components
- Follow the spacing scale for consistent layouts
- Use semantic colors for different states
- Test with real content, not lorem ipsum
- Consider mobile-first responsive design

### Don'ts
- Don't create custom colors outside the palette
- Don't use arbitrary spacing values
- Don't ignore accessibility requirements
- Don't use too many different font sizes
- Don't create components that don't fit the system

## Implementation

### CSS Custom Properties
All design tokens are available as CSS custom properties for easy theming and consistency.

### Utility Classes
Pre-built utility classes for common patterns and quick styling.

### Component Classes
Semantic component classes that combine multiple utilities for common UI patterns.

## Future Considerations

- Light theme support
- High contrast mode
- Additional color variations
- More animation options
- Advanced layout components
- Theme customization tools

---

*This design system is living documentation that evolves with the application. Please keep it updated as new patterns emerge.*
