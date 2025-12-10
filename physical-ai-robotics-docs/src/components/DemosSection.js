import React, { useState, useEffect } from 'react';
import styles from './DemosSection.module.css';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

const DemosSection = () => {
  const { colorMode } = useColorMode();
  const [codeOutput, setCodeOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  useEffect(() => {
    // Create binary stream background
    const container = document.createElement('div');
    container.className = styles.binaryBackground;
    
    for (let i = 0; i < 50; i++) {
      const stream = document.createElement('div');
      stream.className = styles.binaryStream;
      stream.style.left = `${Math.random() * 100}%`;
      stream.style.animationDelay = `${Math.random() * 20}s`;
      stream.style.animationDuration = `${15 + Math.random() * 10}s`;
      stream.textContent = generateBinaryString(50);
      container.appendChild(stream);
    }
    
    const section = document.querySelector(`.${styles.demosSection}`);
    if (section) {
      section.appendChild(container);
    }
    
    return () => {
      if (section && container.parentNode === section) {
        section.removeChild(container);
      }
    };
  }, []);

  const generateBinaryString = (length) => {
    return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join('');
  };

  const demos = [
    {
      id: 1,
      title: 'AI Object Detection',
      description: 'Real-time object detection using YOLOv8 with ROS 2 integration. See how AI identifies and tracks objects in simulated environments.',
      icon: '👁️',
      status: 'live',
      tags: ['Computer Vision', 'Real-time'],
      link: '/demos/object-detection'
    },
    {
      id: 2,
      title: 'Robot Arm Control',
      description: 'Interactive control of a 6-DOF robotic arm with inverse kinematics. Move sliders to control joint positions in real-time.',
      icon: '🤖',
      status: 'interactive',
      tags: ['Robotics', 'Control'],
      link: '/demos/robot-arm'
    },
    {
      id: 3,
      title: 'Path Planning',
      description: 'Visualize A*, RRT, and other path planning algorithms in action. Watch how robots navigate complex environments.',
      icon: '🗺️',
      status: 'simulation',
      tags: ['Navigation', 'Algorithms'],
      link: '/demos/path-planning'
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Run ROS 2 Node',
      description: 'Start a basic publisher/subscriber',
      command: 'ros2 run demo_nodes_cpp talker'
    },
    {
      id: 2,
      title: 'Train AI Model',
      description: 'Start training with PyTorch',
      command: 'python train.py --model yolov8n'
    },
    {
      id: 3,
      title: 'Simulate Robot',
      description: 'Launch Gazebo simulation',
      command: 'ros2 launch robot_sim.launch.py'
    },
    {
      id: 4,
      title: 'API Request',
      description: 'Query Cohere AI model',
      command: 'curl -X POST https://api.cohere.ai/v1/generate'
    }
  ];

  const sampleCode = `#!/usr/bin/env python3
"""
Physical AI Robot Control Example
Using ROS 2 and OpenAI Agents SDK
"""

import rclpy
from rclpy.node import Node
from openai import OpenAI
from geometry_msgs.msg import Twist
import numpy as np

class AIControlledRobot(Node):
    def __init__(self):
        super().__init__('ai_robot_controller')
        
        # Initialize OpenAI client
        self.client = OpenAI(api_key="your-api-key")
        
        # Create publisher for velocity commands
        self.publisher = self.create_publisher(Twist, '/cmd_vel', 10)
        
        # Timer for AI decision making
        self.timer = self.create_timer(0.1, self.ai_control_loop)
        
        self.get_logger().info('🤖 AI Robot Controller Started!')
    
    def get_sensor_data(self):
        """Simulate getting sensor data"""
        return {
            'position': np.random.randn(3),
            'velocity': np.random.randn(3),
            'obstacles': np.random.rand(5, 3)
        }
    
    def ai_control_loop(self):
        """Main AI control loop"""
        try:
            # Get current sensor data
            sensor_data = self.get_sensor_data()
            
            # Create prompt for AI
            prompt = f"""
            Control robot based on sensor data:
            Position: {sensor_data['position']}
            Velocity: {sensor_data['velocity']}
            Obstacles detected: {len(sensor_data['obstacles'])}
            
            Provide velocity commands (linear.x, angular.z):
            """
            
            # Get AI decision
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Parse AI response and publish commands
            self.execute_command(response.choices[0].message.content)
            
        except Exception as e:
            self.get_logger().error(f'AI Control Error: {str(e)}')
    
    def execute_command(self, command):
        """Execute AI-generated command"""
        twist = Twist()
        # Parse and set velocities from AI command
        # Implementation depends on your AI response format
        twist.linear.x = 0.1  # Example value
        twist.angular.z = 0.05  # Example value
        
        self.publisher.publish(twist)

def main():
    rclpy.init()
    node = AIControlledRobot()
    
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`;

  const runCode = () => {
    setIsRunning(true);
    setCodeOutput('🚀 Running Physical AI control script...\n');
    
    setTimeout(() => {
      setCodeOutput(prev => prev + '✅ ROS 2 node initialized\n');
      setTimeout(() => {
        setCodeOutput(prev => prev + '🤖 AI agent connected successfully\n');
        setTimeout(() => {
          setCodeOutput(prev => prev + '📡 Publishing velocity commands...\n');
          setTimeout(() => {
            setCodeOutput(prev => prev + '🎯 Simulation running smoothly\n');
            setIsRunning(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const executeQuickAction = (command) => {
    setCodeOutput(`$ ${command}\nExecuting command...\n✅ Command executed successfully!`);
  };

  return (
    <section className={styles.demosSection} id="demos">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Live Demos & Sandbox</h2>
          <p className={styles.sectionSubtitle}>
            Interact with Physical AI systems in real-time. Run code, control robots, and experiment with AI models directly in your browser.
          </p>
        </div>

        {/* Demo Cards */}
        <div className={styles.demosGrid}>
          {demos.map((demo) => (
            <div 
              key={demo.id} 
              className={styles.demoCard}
              onClick={() => setSelectedDemo(demo)}
            >
              <div className={styles.demoIcon}>{demo.icon}</div>
              <h3>{demo.title}</h3>
              <p>{demo.description}</p>
              <div className={styles.demoStatus}>
                <span className={demo.status === 'live' ? styles.live : ''}></span>
                {demo.status.charAt(0).toUpperCase() + demo.status.slice(1)}
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {demo.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    padding: '0.3rem 0.8rem',
                    background: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    color: colorMode === 'dark' ? '#a0aec0' : '#718096'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Code Playground */}
        <div className={styles.playground}>
          <div className={styles.playgroundHeader}>
            <div className={styles.playgroundTitle}>
              <span>💻</span>
              Physical AI Code Playground
            </div>
            <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>
              Python • ROS 2 • OpenAI SDK
            </div>
          </div>
          
          <div className={styles.editorContainer}>
            <div className={styles.codeEditor}>
              {sampleCode.split('\n').map((line, index) => (
                <div key={index} className={styles.codeLine}>
                  <span className={styles.lineNumber}>{index + 1}</span>
                  <span>
                    {line
                      .replace(/import|from|class|def|try|except|if|else|return/g, '<span class="' + styles.codeKeyword + '">$&</span>')
                      .replace(/__init__|ai_control_loop|get_sensor_data|execute_command/g, '<span class="' + styles.codeFunction + '">$&</span>')
                      .replace(/'.*?'/g, '<span class="' + styles.codeString + '">$&</span>')
                      .replace(/#.*$/g, '<span class="' + styles.codeComment + '">$&</span>')
                      .replace(/self\.\w+/g, '<span class="' + styles.codeVariable + '">$&</span>')
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.playgroundControls}>
            <button 
              className={styles.runButton}
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? '🔄 Running...' : '🚀 Run Code'}
            </button>
            <div style={{ color: colorMode === 'dark' ? '#a0aec0' : '#718096', fontSize: '0.9rem' }}>
              {codeOutput ? 'Output:' : 'Click Run to execute the code'}
            </div>
          </div>
          
          {codeOutput && (
            <div style={{
              padding: '1rem 2rem',
              background: colorMode === 'dark' ? '#1a202c' : '#f7fafc',
              borderTop: `1px solid ${colorMode === 'dark' ? '#2d3748' : '#e2e8f0'}`,
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: colorMode === 'dark' ? '#a0aec0' : '#4a5568',
              whiteSpace: 'pre-wrap'
            }}>
              {codeOutput}
            </div>
          )}
        </div>

        {/* AI Assistant */}
        <div className={styles.aiAssistant}>
          <div className={styles.aiHeader}>
            <div className={styles.aiAvatar}>🤖</div>
            <div className={styles.aiGreeting}>
              <h3>AI Robotics Assistant</h3>
              <p>Ask me anything about Physical AI or run quick commands</p>
            </div>
          </div>
          
          <div className={styles.quickActions}>
            {quickActions.map((action) => (
              <div 
                key={action.id}
                className={styles.quickAction}
                onClick={() => executeQuickAction(action.command)}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  {action.id === 1 ? '🚀' : action.id === 2 ? '🧠' : action.id === 3 ? '🤖' : '🔗'}
                </div>
                <h4 style={{ marginBottom: '0.25rem', color: colorMode === 'dark' ? 'white' : '#2d3748' }}>
                  {action.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: colorMode === 'dark' ? '#a0aec0' : '#718096' }}>
                  {action.description}
                </p>
              </div>
            ))}
          </div>
          
          <div style={{
            background: colorMode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
            padding: '1rem',
            borderRadius: '12px',
            border: `1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            fontSize: '0.9rem',
            color: colorMode === 'dark' ? '#a0aec0' : '#4a5568'
          }}>
            💡 <strong>Try asking:</strong> "How do I implement SLAM with ROS 2?" or "Show me object detection code"
          </div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>15,328</div>
            <div className={styles.statLabel}>Demos Run Today</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>2.4s</div>
            <div className={styles.statLabel}>Avg. Response Time</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>99.8%</div>
            <div className={styles.statLabel}>Uptime</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>42</div>
            <div className={styles.statLabel}>Active AI Models</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2.5rem',
          background: `linear-gradient(135deg, ${colorMode === 'dark' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)'} 0%, ${colorMode === 'dark' ? 'rgba(118, 75, 162, 0.2)' : 'rgba(118, 75, 162, 0.1)'} 100%)`,
          borderRadius: '24px',
          border: `2px solid ${colorMode === 'dark' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}`
        }}>
          <h3 style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem',
            color: colorMode === 'dark' ? 'white' : '#2d3748' 
          }}>
            Ready to Build Your Own?
          </h3>
          <p style={{ 
            color: colorMode === 'dark' ? '#a0aec0' : '#718096',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Clone our examples, modify the code, and deploy your own Physical AI systems.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/docs/demos/getting-started"
              className="button button--primary button--lg"
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '12px'
              }}
            >
              📚 All Demos
            </Link>
            <a 
              href="https://github.com/your-repo/demos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="button button--outline button--lg"
              style={{
                borderColor: '#667eea',
                color: '#667eea',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '12px'
              }}
            >
              💻 View Source Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemosSection;