# Landing Page Design Documentation

## Overview

This document captures the design patterns, techniques, and visual elements used in the Online School landing page. Use this as a reference when designing other components to maintain consistency and apply similar modern design principles.

## Design Philosophy

### Core Principles
1. **Modern Glass-morphism**: Semi-transparent elements with backdrop blur for depth
2. **Animated Gradients**: Dynamic color transitions for visual interest without distraction
3. **Subtle Animations**: Gentle, purposeful motion that enhances UX
4. **High Contrast Text**: Clear, readable white text with proper shadows
5. **Card-based Layout**: Organized content in distinct, elevated containers

## Color Palette & Gradients

### Background Gradient
```css
background: linear-gradient(135deg, 
  var(--color-bg-primary) 0%, 
  var(--color-neutral-900) 25%, 
  var(--color-primary-950) 50%, 
  var(--color-secondary-950) 75%, 
  var(--color-bg-primary) 100%);
background-size: 400% 400%;
animation: gradientShift 15s ease infinite;
```

### Text Gradients
```css
background: linear-gradient(135deg, 
  var(--color-text-primary) 0%, 
  var(--color-primary-400) 25%, 
  var(--color-secondary-400) 50%, 
  var(--color-accent-green) 75%, 
  var(--color-text-primary) 100%);
background-size: 300% 300%;
animation: textGradient 8s ease infinite;
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

## Typography Patterns

### Hero Title
- **Font Size**: `clamp(4rem, 12vw, 14rem)` for responsive scaling
- **Weight**: `var(--font-weight-black)` for maximum impact
- **Layout**: Flexbox column for perfect centering
- **Effect**: Animated gradient text with subtle glow

### Section Headings
- **Font Size**: `var(--font-size-5xl)`
- **Weight**: `var(--font-weight-bold)`
- **Effect**: Gradient text with underline accent
- **Spacing**: `var(--space-16)` top margin for clear separation

### Body Text
- **Color**: `var(--color-text-secondary)` for good contrast
- **Size**: `var(--font-size-lg)`
- **Line Height**: `var(--line-height-relaxed)` for readability
- **Container**: Glass-morphism cards for organization

## Glass-morphism Cards

### Standard Card Pattern
```css
background: rgba(30, 41, 59, 0.3);
backdrop-filter: blur(10px);
border: 1px solid rgba(51, 65, 85, 0.3);
border-radius: var(--radius-xl);
padding: var(--space-6);
box-shadow: var(--shadow-lg);
```

### List Cards
```css
background: rgba(30, 41, 59, 0.2);
backdrop-filter: blur(10px);
border: 1px solid rgba(51, 65, 85, 0.2);
border-radius: var(--radius-xl);
box-shadow: var(--shadow-md);
```

### Action Word Pills
```css
background: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: var(--radius-xl);
color: #ffffff;
text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
```

## Animation Patterns

### Gradient Animations
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes textGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Floating Animations
```css
@keyframes actionWordFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

/* Staggered delays for natural movement */
.action-word:nth-child(1) { animation-delay: 0s; }
.action-word:nth-child(2) { animation-delay: 0.5s; }
.action-word:nth-child(3) { animation-delay: 1s; }
.action-word:nth-child(4) { animation-delay: 1.5s; }
```

### Sparkle Animation
```css
@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}
```

## Interactive Elements

### Button Design Pattern
```css
/* Primary CTA Button */
background: linear-gradient(135deg, 
  var(--color-primary-600) 0%, 
  var(--color-secondary-600) 50%, 
  var(--color-accent-green) 100%);
border-radius: var(--radius-2xl);
padding: var(--space-5) var(--space-10);
font-weight: var(--font-weight-bold);
text-transform: uppercase;
letter-spacing: var(--letter-spacing-wide);
box-shadow: var(--shadow-lg);

/* Shimmer effect */
.button::before {
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent);
  transition: left var(--transition-slow);
}
```

### Secondary Buttons
```css
background: rgba(30, 41, 59, 0.4);
backdrop-filter: blur(10px);
border: 1px solid rgba(51, 65, 85, 0.4);
border-radius: var(--radius-xl);
transition: all var(--transition-normal);

/* Top accent line */
.button::before {
  background: linear-gradient(90deg, 
    var(--color-primary-500) 0%, 
    var(--color-secondary-500) 100%);
  height: 2px;
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}
```

## List Styling

### Enhanced Lists
```css
ul {
  background: rgba(30, 41, 59, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.2);
  border-radius: var(--radius-xl);
  position: relative;
}

/* Top gradient accent */
ul::before {
  background: linear-gradient(90deg, 
    var(--color-primary-500) 0%, 
    var(--color-secondary-500) 100%);
  height: 2px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

li {
  padding-left: var(--space-8);
  transition: all var(--transition-fast);
}

li:hover {
  color: var(--color-text-primary);
  transform: translateX(var(--space-1));
}

li::before {
  content: "✨";
  color: var(--color-primary-400);
  animation: sparkle 2s ease-in-out infinite;
}
```

## Responsive Design Patterns

### Fluid Typography
```css
/* Hero title */
font-size: clamp(4rem, 12vw, 14rem);

/* Section headings */
font-size: clamp(2.5rem, 8vw, 4rem);

/* Action words */
font-size: clamp(1.5rem, 4vw, 3rem);
```

### Mobile Adaptations
```css
@media (max-width: 768px) {
  /* Reduce padding and spacing */
  .container { padding: var(--space-4); }
  
  /* Adjust card sizes */
  .card { 
    padding: var(--space-4);
    margin: 0 0 var(--space-6) 0;
  }
  
  /* Scale down action words */
  .action-word {
    padding: var(--space-1-5) var(--space-3);
    font-size: clamp(0.9rem, 2.5vw, 1.5rem);
  }
}
```

## Layout Structure

### Main Container
```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0 0;
  position: relative;
  overflow: hidden;
}
```

### Content Hierarchy
1. **Hero Section**: Animated gradient title with action words
2. **Description**: Glass-morphism paragraph cards
3. **Feature Sections**: Headings with gradient underlines + list cards
4. **CTA Section**: Gradient button with secondary test buttons

## Key Measurements

### Spacing Scale
- **Small gaps**: `var(--space-2)` to `var(--space-4)`
- **Medium gaps**: `var(--space-6)` to `var(--space-8)`
- **Large gaps**: `var(--space-12)` to `var(--space-16)`
- **Section breaks**: `var(--space-16)` and above

### Border Radius
- **Cards**: `var(--radius-xl)` (12px)
- **Buttons**: `var(--radius-2xl)` (16px)
- **Pills/Tags**: `var(--radius-xl)` (12px)

### Shadows
- **Subtle**: `var(--shadow-sm)` for hover states
- **Standard**: `var(--shadow-md)` for cards
- **Elevated**: `var(--shadow-lg)` for buttons
- **Hero**: `var(--shadow-xl)` and `var(--shadow-2xl)` for major elements

## Best Practices

### Do's
✅ Use glass-morphism for content organization  
✅ Apply staggered animations for natural feel  
✅ Maintain high contrast for text readability  
✅ Use gradient accents sparingly but effectively  
✅ Implement responsive typography with clamp()  
✅ Add subtle hover interactions to all clickable elements  

### Don'ts
❌ Avoid spinning or rotating animations (causes dizziness)  
❌ Don't use moving grid patterns or cross-hatching  
❌ Avoid low contrast text on glass backgrounds  
❌ Don't overuse animations - keep them purposeful  
❌ Avoid jarring transitions - use easing functions  

## Component Reusability

### Glass Card Component
```css
.glass-card {
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
}
```

### Gradient Text Component
```css
.gradient-text {
  background: linear-gradient(135deg, 
    var(--color-text-primary) 0%, 
    var(--color-primary-400) 50%, 
    var(--color-text-primary) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Floating Element Component
```css
.floating-element {
  animation: gentleFloat 3s ease-in-out infinite;
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
```

---

*This design system creates a modern, engaging, and accessible user experience while maintaining performance and avoiding motion that could cause discomfort to users.*
