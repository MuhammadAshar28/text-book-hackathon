
import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import HomepageLessonObjectives from '../components/HomepageLessonObjectives';
import TechStackSection from '../components/TechStackSection';
import FAQsSection from '../components/FAQsSection';
import DemosSection from '../components/DemosSection';
import { useColorMode } from '@docusaurus/theme-common';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

interface StatItem {
  number: string;
  label: string;
}

interface ButtonConfig {
  to?: string;
  href?: string;
  label: string;
  icon: string;
  variant: 'primary' | 'secondary';
  external?: boolean;
}

interface Particle {
  left: string;
  delay: string;
  size: number;
  opacity: number;
  color: string;
}

const HomepageHeader: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Stats data
  const stats: StatItem[] = [
    { number: '500+', label: 'Tutorials' },
    { number: '100+', label: 'AI Models' },
    { number: '50+', label: 'ROS 2 Packages' },
    { number: '24/7', label: 'Live Demos' },
  ];

  // Button configurations
  const buttons: ButtonConfig[] = [
    {
      to: '/docs/intro',
      label: 'Get Started Now',
      icon: '🚀',
      variant: 'primary',
    },
    {
      to: '/docs/why-physical-ai-matters',
      label: 'Learn More',
      icon: '📚',
      variant: 'secondary',
    },
    {
      href: 'https://github.com/your-repo',
      label: 'Star on GitHub',
      icon: '⭐',
      variant: 'secondary',
      external: true,
    },
  ];

  // Color palettes for particles based on theme
  const particleColors = {
    dark: ['#667eea', '#764ba2', '#48bb78', '#ed8936', '#9f7aea', '#4299e1'],
    light: ['#ffffff', '#a0aec0', '#cbd5e0', '#e2e8f0', '#f7fafc', '#edf2f7'],
  };

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    const colors = particleColors[colorMode as keyof typeof particleColors];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(newParticles);
  }, [colorMode]);

  const handleAIChatClick = (): void => {
    // In a real implementation, this would open a chat modal
    console.log('🤖 AI Chatbot clicked');
    // You could implement a modal or redirect here
    // alert('🤖 AI Chatbot coming soon! This will be a live chatbot that can answer questions about Physical AI and Robotics.');
  };

  const handleButtonHover = (label: string | null): void => {
    setHoveredButton(label);
  };

  // Render a button based on configuration
  const renderButton = (button: ButtonConfig, index: number) => {
    const buttonClass = clsx(
      styles.ctaButton,
      button.variant === 'primary' ? styles.primaryButton : styles.secondaryButton
    );

    const buttonProps = {
      className: buttonClass,
      onMouseEnter: () => handleButtonHover(button.label),
      onMouseLeave: () => handleButtonHover(null),
      style: {
        transform: hoveredButton === button.label ? 'translateY(-5px) scale(1.05)' : 'none',
        transition: 'transform 0.3s ease',
      } as React.CSSProperties,
    };

    const buttonContent = (
      <>
        <span>{button.icon}</span>
        {button.label}
        {button.variant === 'primary' && (
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            style={{ marginLeft: '0.5rem' }}
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        )}
      </>
    );

    if (button.external) {
      return (
        <a
          key={index}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          {...buttonProps}
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <Link
        key={index}
        to={button.to!}
        {...buttonProps}
      >
        {buttonContent}
      </Link>
    );
  };

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      {/* AI Chatbot Button */}
      {/* <button 
        className={styles.aiChatButton} 
        onClick={handleAIChatClick}
        aria-label="Open AI Chatbot"
        title="Chat with AI Assistant"
      >
        <span>🤖</span>
      </button> */}
      
      {/* Animated Background Particles */}
      <div className={styles.particles}>
        {particles.map((particle, index) => (
          <div
            key={index}
            className={styles.particle}
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              backgroundColor: particle.color,
            }}
          />
        ))}
      </div>
      
      <div className="container">
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            {siteConfig.title}
          </h1>
          
          <p className={styles.heroSubtitle}>
            Build the future with {siteConfig.title} - The most comprehensive platform 
            for Physical AI, Humanoid Robotics, and Intelligent Systems development. 
            From ROS 2 to AI Agents, everything you need in one place.
          </p>
          
          <div className={styles.buttons}>
            {buttons.map((button, index) => renderButton(button, index))}
          </div>
          
          {/* Stats Section */}
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div 
            className={styles.scrollIndicator}
            role="button"
            tabIndex={0}
            onClick={() => {
              // Scroll to next section
              const nextSection = document.querySelector('section:not(.hero)');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                const nextSection = document.querySelector('section:not(.hero)');
                nextSection?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore More
          </div>
        </div>
      </div>
    </header>
  );
};

// Add display name for better debugging
HomepageHeader.displayName = 'HomepageHeader';



export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <TechStackSection />
        < FAQsSection/>
        <DemosSection/>
      </main>
    </Layout>
  );
}
