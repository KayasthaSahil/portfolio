import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { toast } from '../hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Calendar,
  Award,
  Star,
  Eye,
  Send,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Trophy,
  Target
} from 'lucide-react';

import { portfolioData } from '../data/mock';
import ProjectModal from './ProjectModal';
import TypewriterEffect from './TypewriterEffect';
import AnimatedSection from './AnimatedSection';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const typewriterWords = [
    "AI/ML Developer",
    "Full-Stack Enthusiast", 
    "Data Scientist",
    "Problem Solver"
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-gray-900 to-orange-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(27,156,252,0.1),transparent)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="relative z-10 text-center max-w-4xl">
          <AnimatedSection delay={200}>
            <img
              src={portfolioData.personal.avatar}
              alt="Sahil Kayastha"
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-teal-500/30 shadow-lg shadow-teal-500/20"
            />
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
              {portfolioData.personal.name}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <div className="text-2xl md:text-3xl mb-8 h-12">
              <TypewriterEffect 
                words={typewriterWords}
                className="text-gray-300 font-light"
              />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {portfolioData.personal.tagline}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={1000}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-teal-500/25"
              >
                <Eye className="mr-2 h-5 w-5" />
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {portfolioData.personal.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="h-5 w-5 text-teal-500" />
                    <span>{portfolioData.personal.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone className="h-5 w-5 text-teal-500" />
                    <span>{portfolioData.personal.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="h-5 w-5 text-teal-500" />
                    <span>{portfolioData.personal.location}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Specializations</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-teal-500/50 transition-colors">
                    <h4 className="font-semibold text-teal-400 mb-2">Machine Learning & AI</h4>
                    <p className="text-gray-400 text-sm">Model development, Generative AI, and LLM implementation</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-orange-500/50 transition-colors">
                    <h4 className="font-semibold text-orange-400 mb-2">Data-Centric Solutions</h4>
                    <p className="text-gray-400 text-sm">Python development, Power BI, and SQL integration</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-teal-500/50 transition-colors">
                    <h4 className="font-semibold text-teal-400 mb-2">Full-Stack Development</h4>
                    <p className="text-gray-400 text-sm">End-to-end web application development</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Skills & Tools
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.skills.map((category, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <Card className="bg-gray-800/50 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="text-sm text-gray-300">{skill.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;