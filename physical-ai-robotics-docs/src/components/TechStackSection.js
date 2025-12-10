import React from 'react';
import styles from './TechStackSection.module.css';
import Link from '@docusaurus/Link';

const TechStackSection = () => {
  const quadrants = [
    {
      id: 1,
      name: 'Core Development',
      icon: '⚙️',
      description: 'Essential tools and languages for building robust Physical AI systems',
      technologies: [
        {
          name: 'Python UV',
          description: 'Fast Python package installer & resolver',
          icon: '🐍',
          type: 'pythonIcon'
        },
        {
          name: 'TypeScript',
          description: 'Type-safe JavaScript for scalable applications',
          icon: 'TS',
          type: 'tsIcon'
        },
        {
          name: 'JavaScript',
          description: 'Dynamic language for interactive interfaces',
          icon: 'JS',
          type: 'jsIcon'
        }
      ]
    },
    {
      id: 2,
      name: 'AI & Machine Learning',
      icon: '🧠',
      description: 'Cutting-edge AI frameworks and models for intelligent systems',
      technologies: [
        {
          name: 'OpenAI Agents SDK',
          description: 'Build, test, and deploy AI agents',
          icon: '🤖',
          type: 'aiIcon'
        },
        {
          name: 'Cohere',
          description: 'Advanced language AI models',
          icon: '✨',
          type: 'aiIcon'
        },
        {
          name: 'Speckit Plus',
          description: 'AI-powered documentation assistant',
          icon: '📚',
          type: 'frameworkIcon'
        }
      ]
    },
    {
      id: 3,
      name: 'Documentation & UI',
      icon: '📖',
      description: 'Tools for creating beautiful documentation and interfaces',
      technologies: [
        {
          name: 'Docusaurus',
          description: 'Modern documentation framework',
          icon: '📄',
          type: 'frameworkIcon'
        },
        {
          name: 'React',
          description: 'UI library for interactive interfaces',
          icon: '⚛️',
          type: 'jsIcon'
        },
        {
          name: 'MDX',
          description: 'Markdown with JSX components',
          icon: '📝',
          type: 'frameworkIcon'
        }
      ]
    },
    {
      id: 4,
      name: 'Robotics Framework',
      icon: '🤖',
      description: 'Specialized tools for robotics and physical AI',
      technologies: [
        {
          name: 'ROS 2',
          description: 'Robot Operating System 2',
          icon: '🔄',
          type: 'frameworkIcon'
        },
        {
          name: 'PyTorch',
          description: 'Deep learning framework',
          icon: '🔥',
          type: 'pythonIcon'
        },
        {
          name: 'Docker',
          description: 'Containerization for deployment',
          icon: '🐳',
          type: 'frameworkIcon'
        }
      ]
    }
  ];

  const ecosystemItems = [
    {
      icon: '🚀',
      title: 'Rapid Development',
      description: 'Python UV provides lightning-fast package management, reducing setup time by 90% compared to traditional pip'
    },
    {
      icon: '🔗',
      title: 'Seamless Integration',
      description: 'All tools work together in a cohesive ecosystem, from Cohere AI models to Docusaurus documentation'
    },
    {
      icon: '📈',
      title: 'Enterprise Ready',
      description: 'TypeScript ensures type safety at scale, while OpenAI Agents SDK provides production-grade AI capabilities'
    }
  ];

  return (
    <section className={styles.techStackSection}>
      <div className={styles.gridBackground}></div>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tech Stack & Ecosystem</h2>
          <p className={styles.sectionSubtitle}>
            Built with cutting-edge technologies for scalable Physical AI development
          </p>
        </div>

        <div className={styles.quadrantGrid}>
          {quadrants.map((quadrant) => (
            <div key={quadrant.id} className={styles.quadrant}>
              <div className={styles.quadrantTitle}>
                <div className={styles.quadrantIcon}>{quadrant.icon}</div>
                <h3 className={styles.quadrantName}>{quadrant.name}</h3>
              </div>
              <p className={styles.quadrantDescription}>{quadrant.description}</p>
              <div className={styles.techCards}>
                {quadrant.technologies.map((tech, idx) => (
                  <div key={idx} className={styles.techCard}>
                    <div className={`${styles.techIcon} ${styles[tech.type]}`}>
                      {tech.icon}
                    </div>
                    <div className={styles.techInfo}>
                      <h4 className={styles.techName}>{tech.name}</h4>
                      <p className={styles.techDescription}>{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ecosystem}>
          <div className={styles.pythonUvBadge}>
            <span>⚡</span> Powered by Python UV
          </div>
          <h3 className={styles.ecosystemTitle}>Integrated Development Ecosystem</h3>
          <div className={styles.ecosystemGrid}>
            {ecosystemItems.map((item, idx) => (
              <div key={idx} className={styles.ecosystemItem}>
                <div className={styles.ecosystemIcon}>{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              to="/docs/getting-started/installation"
              className="button button--primary button--lg"
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '12px'
              }}
            >
              🚀 Start Building with Our Stack
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;