import React, { useState, useMemo } from 'react';
import styles from './FAQsSection.module.css';
import Link from '@docusaurus/Link';

const FAQsSection = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      question: 'What is Physical AI and how is it different from traditional AI?',
      answer: 'Physical AI refers to AI systems that interact with and operate in the physical world through sensors, actuators, and robotics. Unlike traditional AI that operates in digital spaces, Physical AI combines perception (vision, sensors), cognition (decision-making), and action (movement, manipulation) to create embodied intelligence.',
      tags: ['ai', 'basics'],
      category: 'concepts'
    },
    {
      id: 2,
      question: 'Why use ROS 2 instead of ROS 1 for robotics?',
      answer: 'ROS 2 offers significant improvements over ROS 1 including real-time capabilities, DDS-based communication for better reliability, multi-platform support (Linux, Windows, macOS), improved security, and better quality of service. It\'s designed for production systems and supports modern robotic applications.',
      tags: ['ros', 'robotics'],
      category: 'technical'
    },
    {
      id: 3,
      question: 'How does Python UV improve robotics development?',
      answer: 'Python UV provides blazing-fast package installation and dependency resolution, making it perfect for robotics projects with complex dependencies. It offers reproducible environments, parallel downloads, and a modern package management experience that significantly speeds up development workflows.',
      tags: ['python', 'tools'],
      category: 'development'
    },
    {
      id: 4,
      question: 'What AI models work best with physical robots?',
      answer: 'For physical robots, we recommend models that balance performance with computational efficiency: Vision Transformers (ViT) for perception, Reinforcement Learning with human feedback (RLHF) for control, and lightweight LLMs like Phi-2 or Mistral-7B for reasoning. OpenAI\'s Agents SDK provides excellent tools for building AI agents that can control robots.',
      tags: ['ai', 'models'],
      category: 'ai'
    },
    {
      id: 5,
      question: 'Can I use this documentation for commercial projects?',
      answer: 'Yes! All documentation and code examples are provided under open-source licenses (MIT for code, CC BY 4.0 for documentation). You can use them for personal, academic, and commercial projects. Attribution is appreciated but not required for most use cases.',
      tags: ['license'],
      category: 'general'
    },
    {
      id: 6,
      question: 'How do I get started with humanoid robotics?',
      answer: 'Start with our comprehensive beginner\'s guide that covers: 1) Understanding kinematics and dynamics, 2) Learning ROS 2 basics, 3) Setting up simulation environments (Gazebo, Isaac Sim), 4) Working with common humanoid platforms, 5) Implementing basic locomotion and manipulation.',
      tags: ['robotics', 'beginner'],
      category: 'getting-started'
    },
    {
      id: 7,
      question: 'What hardware is recommended for Physical AI development?',
      answer: 'We recommend: NVIDIA Jetson series for edge computing, Intel RealSense or Azure Kinect for depth sensing, Robotis Dynamixel servos for actuation, and any modern ROS-compatible robotic platform. For simulation, a GPU with at least 8GB VRAM is recommended.',
      tags: ['hardware'],
      category: 'technical'
    },
    {
      id: 8,
      question: 'How does Cohere integrate with robotics systems?',
      answer: 'Cohere provides state-of-the-art language models that can be integrated with ROS 2 via our provided bridge packages. This enables natural language understanding for robot commands, scene description generation, human-robot dialogue systems, and intelligent task planning.',
      tags: ['ai', 'cohere'],
      category: 'ai'
    },
    {
      id: 9,
      question: 'What are the system requirements for running these examples?',
      answer: 'Minimum: Ubuntu 22.04, 8GB RAM, 20GB storage, ROS 2 Humble. Recommended: Ubuntu 22.04, 16GB+ RAM, NVIDIA GPU with 8GB+ VRAM, 50GB+ storage, ROS 2 Humble with GPU acceleration. Docker containers are also available for easier setup.',
      tags: ['requirements'],
      category: 'development'
    },
    {
      id: 10,
      question: 'How do I contribute to this documentation?',
      answer: 'We welcome contributions! Visit our GitHub repository, check the contribution guidelines, and submit pull requests. You can contribute by: fixing typos, adding new examples, improving documentation, translating content, or reporting issues.',
      tags: ['community'],
      category: 'general'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📚', count: faqData.length },
    { id: 'concepts', name: 'Concepts', icon: '🧠', count: faqData.filter(f => f.category === 'concepts').length },
    { id: 'technical', name: 'Technical', icon: '⚙️', count: faqData.filter(f => f.category === 'technical').length },
    { id: 'development', name: 'Development', icon: '💻', count: faqData.filter(f => f.category === 'development').length },
    { id: 'ai', name: 'AI & ML', icon: '🤖', count: faqData.filter(f => f.category === 'ai').length },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀', count: faqData.filter(f => f.category === 'getting-started').length },
    { id: 'general', name: 'General', icon: 'ℹ️', count: faqData.filter(f => f.category === 'general').length }
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = searchTerm === '' || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const getTagClass = (tag) => {
    switch(tag) {
      case 'ros': return styles.ros;
      case 'ai': return styles.ai;
      case 'python': return styles.python;
      default: return '';
    }
  };

  return (
    <section className={styles.faqsSection} id="faqs">
      <div className={styles.backgroundElements}>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>
      
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionSubtitle}>
            Find answers to common questions about Physical AI, Robotics, and our ecosystem
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>🔍</div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search questions, topics, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span>({category.count})</span>
            </button>
          ))}
        </div>

        {/* FAQs Grid */}
        <div className={styles.faqsGrid}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`${styles.faqItem} ${activeFaq === faq.id ? styles.active : ''}`}
              >
                <div className={styles.faqHeader} onClick={() => toggleFaq(faq.id)}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <div className={styles.faqIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.faqContent}>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                  <div className={styles.faqTags}>
                    {faq.tags.map((tag, idx) => (
                      <span key={idx} className={`${styles.faqTag} ${getTagClass(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>No questions found</h3>
              <p>Try searching with different keywords or browse all questions</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{faqData.length}</div>
            <div className={styles.statLabel}>Questions Answered</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>7</div>
            <div className={styles.statLabel}>Categories</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Updated</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Open Source</div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h3>Still have questions?</h3>
          <p>
            Join our community of developers, researchers, and robotics enthusiasts. 
            Get help, share your projects, and contribute to the future of Physical AI.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/docs/getting-started" className={styles.ctaButton}>
              📚 Read Documentation
            </Link>
            <a 
              href="https://github.com/your-repo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.ctaButton}
              style={{ background: 'linear-gradient(45deg, #48bb78, #38a169)' }}
            >
              💬 Join Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;