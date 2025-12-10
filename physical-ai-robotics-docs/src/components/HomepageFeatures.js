import React from 'react';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

const FeatureList = [
  {
    title: 'Physical AI Concepts',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: 'Learn fundamental concepts of Physical AI - AI systems that interact with the physical world, combining perception, cognition, and action.',
    link: '/docs/why-physical-ai-matters',
    isAI: true,
    color: '#667eea'
  },
  {
    title: 'ROS 2 Integration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: 'Master Robot Operating System 2 (ROS 2) - middleware connecting all robotic components, enabling seamless communication between subsystems.',
    link: '/docs/module-1-ros2-nervous-system/overview',
    isAI: false,
    color: '#48bb78'
  },
  {
    title: 'Humanoid Robotics',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: 'Explore humanoid robotics - robots with human-like form and capabilities, designed to operate and interact in human environments.',
    link: '/docs/module-4-vision-language-action/overview',
    isAI: true,
    color: '#ed8936'
  },
  {
    title: 'Computer Vision',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: 'Deep dive into computer vision techniques for robotic perception including object detection, SLAM, and scene understanding.',
    link: '/docs/module-2-computer-vision-perception/overview',
    isAI: true,
    color: '#9f7aea'
  },
  {
    title: 'Motion Planning',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: 'Learn advanced motion planning algorithms for robotic navigation and manipulation in complex environments.',
    link: '/docs/module-3-motion-planning-control/overview',
    isAI: false,
    color: '#4299e1'
  },
  {
    title: 'AI Chatbots for Robotics',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: 'Integrate AI chatbots for natural language interaction with robotic systems and human-robot collaboration.',
    link: '/docs/module-5-ai-chatbots-robotics/overview',
    isAI: true,
    color: '#f56565'
  },
];

function Feature({ Svg, title, description, link, isAI, color }) {
  const { colorMode } = useColorMode();

  return (
    <div className={`${styles.featureCard} ${isAI ? styles.aiFeature : ''}`}>
      {isAI && (
        <div className={styles.aiIndicator}>
          <span>🤖</span> AI-Powered
        </div>
      )}
      
      <div className={styles.featureIconContainer}>
        <Svg 
          className={styles.featureSvg} 
          role="img"
          style={{
            filter: colorMode === 'dark' 
              ? `drop-shadow(0 10px 20px ${color}40)`
              : undefined
          }}
        />
      </div>
      
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
      
      <Link to={link} className={styles.learnMore}>
        Learn More
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Explore Physical AI</h2>
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

// /**
//  * Copyright (c) 2017-present, Facebook, Inc.
//  *
//  * This source code is licensed under the MIT license found in the
//  * LICENSE file in the root directory of this source tree.
//  */

// import React from 'react';
// import clsx from 'clsx';
// import styles from './HomepageFeatures.module.css';
// import Link from '@docusaurus/Link';

// const FeatureList = [
//   {
//     title: 'Physical AI Concepts',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Learn the fundamental concepts of Physical AI - AI systems that interact 
//         with and operate within the physical world, combining perception, 
//         cognition, and action.
//       </>
//     ),
//     link: '/docs/why-physical-ai-matters'
//   },
//   {
//     title: 'ROS 2 Integration',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Master Robot Operating System 2 (ROS 2) - the middleware that connects 
//         all components of a robotic system, enabling communication between 
//         different robot subsystems.
//       </>
//     ),
//     link: '/docs/module-1-ros2-nervous-system/overview'
//   },
//   {
//     title: 'Humanoid Robotics',
//     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         Explore humanoid robotics - robots with human-like form and capabilities, 
//         designed to operate in human environments and interact with human tools.
//       </>
//     ),
//     link: '/docs/module-4-vision-language-action/overview'
//   },
// ];

// function Feature({Svg, title, description, link}) {
//   return (
//     <div className="col col--4">
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <h3><Link to={link}>{title}</Link></h3>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// export default function HomepageFeatures() {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//           {FeatureList.map((props, idx) => (
//             <Feature key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }