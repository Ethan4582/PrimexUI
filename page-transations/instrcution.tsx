// how to use this code snippet

// Quick Setup:

import PageTransition from './PageTransition';

function App() {
  return (
    <PageTransition direction="right-to-left" duration={1200}>
      <YourAppContent />
    </PageTransition>
  );
}


import React from 'react';
import PageTransition, { TransitionLink, usePageTransitions } from './PageTransition';

// EXAMPLE 1: Basic Usage with Default Settings (bottom-to-top)
const App = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        <nav className="p-4">
          <TransitionLink href="/" className="mr-4">Home</TransitionLink>
          <TransitionLink href="/about" className="mr-4">About</TransitionLink>
          <TransitionLink href="/contact" className="mr-4">Contact</TransitionLink>
        </nav>
        <main>
          {/* Your page content */}
        </main>
      </div>
    </PageTransition>
  );
};

// EXAMPLE 2: Custom Direction - Top to Bottom
const TopToBottomTransition = () => {
  return (
    <PageTransition 
      direction="top-to-bottom"
      duration={1200}
      opacity={0.3}
    >
      <YourPageContent />
    </PageTransition>
  );
};

// EXAMPLE 3: Left to Right Slide
const LeftToRightTransition = () => {
  return (
    <PageTransition 
      direction="left-to-right"
      duration={1000}
      moveDistance="50%"
      easing="cubic-bezier(0.25, 1, 0.5, 1)"
    >
      <YourPageContent />
    </PageTransition>
  );
};

// EXAMPLE 4: Fade Transition
const FadeTransition = () => {
  return (
    <PageTransition 
      direction="fade"
      duration={800}
    >
      <YourPageContent />
    </PageTransition>
  );
};

// EXAMPLE 5: Using Hook Directly for More Control
const CustomTransitionComponent = () => {
  usePageTransitions({
    direction: 'right-to-left',
    duration: 1500,
    easing: 'ease-in-out',
    moveDistance: '40%',
    opacity: 0.7
  });

  return (
    <div>
      <TransitionLink href="/page1">Go to Page 1</TransitionLink>
      <TransitionLink href="/page2">Go to Page 2</TransitionLink>
    </div>
  );
};

// EXAMPLE 6: Dynamic Direction Based on Navigation
const DynamicTransitionApp = () => {
  const [transitionDirection, setTransitionDirection] = React.useState('bottom-to-top');
  
  const handleNavigation = (direction) => {
    setTransitionDirection(direction);
  };

  return (
    <PageTransition direction={transitionDirection}>
      <nav>
        <button onClick={() => handleNavigation('left-to-right')}>
          <TransitionLink href="/services">Services →</TransitionLink>
        </button>
        <button onClick={() => handleNavigation('right-to-left')}>
          <TransitionLink href="/portfolio">← Portfolio</TransitionLink>
        </button>
        <button onClick={() => handleNavigation('top-to-bottom')}>
          <TransitionLink href="/blog">Blog ↓</TransitionLink>
        </button>
        <button onClick={() => handleNavigation('bottom-to-top')}>
          <TransitionLink href="/contact">Contact ↑</TransitionLink>
        </button>
      </nav>
    </PageTransition>
  );
};

export default App;

/* 
=== TRANSITION DIRECTIONS EXPLAINED ===

1. BOTTOM-TO-TOP (Default - Your current setup):
   - Old page moves UP and fades out
   - New page reveals from BOTTOM to TOP
   - Creates upward sliding effect

2. TOP-TO-BOTTOM:
   - Old page moves DOWN and fades out  
   - New page reveals from TOP to BOTTOM
   - Creates downward sliding effect

3. LEFT-TO-RIGHT:
   - Old page moves RIGHT and fades out
   - New page reveals from LEFT to RIGHT
   - Creates horizontal sliding effect (left direction)

4. RIGHT-TO-LEFT:
   - Old page moves LEFT and fades out
   - New page reveals from RIGHT to LEFT  
   - Creates horizontal sliding effect (right direction)

5. FADE:
   - Old page scales down and fades out
   - New page scales up and fades in
   - Creates smooth fade transition

6. SCALE:
   - Old page scales down and fades out
   - New page scales down to normal and fades in
   - Creates zoom-like effect

=== HOW TO CUSTOMIZE FURTHER ===

PARAMETERS YOU CAN MODIFY:

1. direction: Changes the animation direction
   - Options: 'bottom-to-top', 'top-to-bottom', 'left-to-right', 'right-to-left', 'fade', 'scale'

2. duration: Animation speed in milliseconds
   - Fast: 800ms, Normal: 1200ms, Slow: 2000ms

3. easing: Animation curve
   - Smooth: 'cubic-bezier(0.25, 1, 0.5, 1)'
   - Bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
   - Sharp: 'cubic-bezier(0.87, 0, 0.13, 1)'

4. moveDistance: How far the old page moves
   - Subtle: '20%', Normal: '35%', Dramatic: '60%'

5. opacity: How transparent the old page becomes
   - Barely visible: 0.1, Half visible: 0.5, Almost visible: 0.8

CREATING CUSTOM DIRECTIONS:

To create your own direction, modify the generateKeyframes function:
- moveOutKeyframes: Controls how the OLD page exits
- moveInKeyframes: Controls how the NEW page enters

Example - Diagonal transition:
case 'diagonal-down-right':
  moveOutKeyframes = `
    from { opacity: 1; transform: translate(0, 0) scale(1); }
    to { opacity: 0.3; transform: translate(30%, 30%) scale(0.9); }
  `;
  moveInKeyframes = `
    from { clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%); }
    to { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
  `;
  break;
*/