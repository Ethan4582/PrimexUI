import React, { useEffect, useState } from 'react';

// Page Transition Hook
export const usePageTransitions = (options = {}) => {
  const {
    duration = 1500,
    easing = 'cubic-bezier(0.87, 0, 0.13, 1)',
    direction = 'bottom-to-top', // 'bottom-to-top', 'top-to-bottom', 'left-to-right', 'right-to-left', 'fade', 'scale'
    moveDistance = '35%',
    opacity = 0.5
  } = options;

  useEffect(() => {
    // Inject transition styles
    const styleId = 'page-transition-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      existingStyle = style;
    }

    // Generate keyframes based on direction
    const generateKeyframes = (direction, moveDistance, opacity) => {
      let moveOutKeyframes, moveInKeyframes;

      switch (direction) {
        case 'bottom-to-top':
          moveOutKeyframes = `
            from { opacity: 1; transform: translateY(0); }
            to { opacity: ${opacity}; transform: translateY(-${moveDistance}); }
          `;
          moveInKeyframes = `
            from { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }
            to { clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%); }
          `;
          break;

        case 'top-to-bottom':
          moveOutKeyframes = `
            from { opacity: 1; transform: translateY(0); }
            to { opacity: ${opacity}; transform: translateY(${moveDistance}); }
          `;
          moveInKeyframes = `
            from { clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%); }
            to { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
          `;
          break;

        case 'left-to-right':
          moveOutKeyframes = `
            from { opacity: 1; transform: translateX(0); }
            to { opacity: ${opacity}; transform: translateX(${moveDistance}); }
          `;
          moveInKeyframes = `
            from { clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); }
            to { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
          `;
          break;

        case 'right-to-left':
          moveOutKeyframes = `
            from { opacity: 1; transform: translateX(0); }
            to { opacity: ${opacity}; transform: translateX(-${moveDistance}); }
          `;
          moveInKeyframes = `
            from { clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%); }
            to { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
          `;
          break;

        case 'fade':
          moveOutKeyframes = `
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
          `;
          moveInKeyframes = `
            from { opacity: 0; transform: scale(1.05); }
            to { opacity: 1; transform: scale(1); }
          `;
          break;

        case 'scale':
          moveOutKeyframes = `
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
          `;
          moveInKeyframes = `
            from { opacity: 0; transform: scale(1.2); }
            to { opacity: 1; transform: scale(1); }
          `;
          break;

        default:
          moveOutKeyframes = `
            from { opacity: 1; transform: translateY(0); }
            to { opacity: ${opacity}; transform: translateY(-${moveDistance}); }
          `;
          moveInKeyframes = `
            from { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }
            to { clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%); }
          `;
      }

      return { moveOutKeyframes, moveInKeyframes };
    };

    const { moveOutKeyframes, moveInKeyframes } = generateKeyframes(direction, moveDistance, opacity);

    existingStyle.textContent = `
      @keyframes move-out {
        ${moveOutKeyframes}
      }
      
      @keyframes move-in {
        ${moveInKeyframes}
      }
      
      ::view-transition-old(root) {
        animation: ${duration}ms ${easing} both move-out;
      }
      
      ::view-transition-new(root) {
        animation: ${duration}ms ${easing} both move-in;
      }

      @media (max-width: 600px) {
        nav {
          flex-direction: column;
          gap: 0.7rem;
          padding: 0.8rem 1rem;
        }
        .container {
          margin: 1rem 0.2rem;
          border-radius: 10px;
        }
        .hero h1 {
          font-size: 2rem;
        }
      }
    `;

    // Navigation API listener
    if (typeof window !== 'undefined' && 'navigation' in window) {
      const navigation = window.navigation;
      
      if (navigation.addEventListener) {
        const handleNavigate = (event) => {
          if (!event.destination.url.includes(document.location.origin)) {
            return;
          }

          event.intercept({
            handler: async () => {
              try {
                const response = await fetch(event.destination.url);
                const text = await response.text();
                
                const transition = document.startViewTransition(() => {
                  const bodyMatch = text.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                  if (bodyMatch) {
                    document.body.innerHTML = bodyMatch[1];
                  }
                  
                  const titleMatch = text.match(/<title[^>]*>(.*?)<\/title>/i);
                  if (titleMatch) {
                    document.title = titleMatch[1];
                  }
                });
                
                transition.ready.then(() => {
                  window.scrollTo(0, 0);
                });
              } catch (error) {
                console.error('Transition failed:', error);
                window.location.href = event.destination.url;
              }
            },
            scroll: "manual"
          });
        };

        navigation.addEventListener("navigate", handleNavigate);
        
        return () => {
          navigation.removeEventListener("navigate", handleNavigate);
        };
      }
    }
  }, [duration, easing, direction, moveDistance, opacity]);
};

// Transition Link Component
export const TransitionLink = ({ 
  href, 
  children, 
  className = '',
  transitionOptions = {},
  ...props 
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    if (!document.startViewTransition) {
      window.location.href = href;
      return;
    }

    const transition = document.startViewTransition(async () => {
      try {
        const response = await fetch(href);
        const html = await response.text();
        
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        if (bodyMatch) {
          document.body.innerHTML = bodyMatch[1];
        }
        
        const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
        if (titleMatch) {
          document.title = titleMatch[1];
        }
      } catch (error) {
        console.error('Transition failed:', error);
        window.location.href = href;
      }
    });

    transition.ready.then(() => {
      window.scrollTo(0, 0);
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

// Main Page Transition Component
const PageTransition = ({ 
  children, 
  direction = 'bottom-to-top',
  duration = 1500,
  easing = 'cubic-bezier(0.87, 0, 0.13, 1)',
  moveDistance = '35%',
  opacity = 0.5
}) => {
  usePageTransitions({
    direction,
    duration,
    easing,
    moveDistance,
    opacity
  });

  return <>{children}</>;
};

export default PageTransition;