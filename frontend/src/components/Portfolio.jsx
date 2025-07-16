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
  Target,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Globe,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

import { usePortfolioData, useContactSubmission } from '../hooks/usePortfolio';
import { LoadingSection, ErrorMessage, SkeletonGrid } from './Loading';
import ProjectModal from './ProjectModal';
import TypewriterEffect from './TypewriterEffect';
import AnimatedSection from './AnimatedSection';
import Navigation from './Navigation';

const Portfolio = () => {
  const { data: portfolioData, loading, error, refetch } = usePortfolioData();
  const { submitContact, loading: contactLoading } = useContactSubmission();
  
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
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
    "Problem Solver",
    "Innovation Driver"
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
        <Navigation />
        <LoadingSection title="Loading portfolio..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
        <Navigation />
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
        <Navigation />
        <ErrorMessage 
          message="No portfolio data available"
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-gray-900 to-orange-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.15),transparent)]"></div>
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fHxibHVlfDE3NTI2NDA2Mzl8MA&ixlib=rb-4.1.0&q=85"
            alt="AI Innovation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-gray-950/30"></div>
        </div>
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-2 h-2 bg-teal-500 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-orange-500 rounded-full opacity-80 animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-70 animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-orange-400 rounded-full opacity-60 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl">
          <AnimatedSection delay={200}>
            <div className="relative inline-block mb-8">
              <img
                src={portfolioData.personal.avatar}
                alt="Sahil Kayastha"
                className="w-36 h-36 rounded-full mx-auto border-4 border-teal-500/40 shadow-2xl shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-500 hover:scale-105"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
              {portfolioData.personal.name}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <div className="text-2xl md:text-3xl lg:text-4xl mb-8 h-16 flex items-center justify-center">
              <TypewriterEffect 
                words={typewriterWords}
                className="text-gray-300 font-light"
              />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {portfolioData.personal.tagline}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={1000}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 border-0"
                onClick={() => scrollToSection('projects')}
              >
                <Eye className="mr-2 h-5 w-5" />
                Explore My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={1200}>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Available for opportunities</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{portfolioData.personal.location}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-b from-gray-900/50 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                Passionate about building the future through code and innovation
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-orange-500 rounded-full"></div>
                  <p className="text-lg text-gray-300 leading-relaxed pl-8">
                    {portfolioData.personal.description}
                  </p>
                </div>
                
                <div className="space-y-4 pl-8">
                  <div className="flex items-center gap-4 text-gray-400 hover:text-teal-400 transition-colors p-3 rounded-lg hover:bg-gray-800/50">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-teal-500" />
                    </div>
                    <span className="text-lg">{portfolioData.personal.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 hover:text-teal-400 transition-colors p-3 rounded-lg hover:bg-gray-800/50">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-teal-500" />
                    </div>
                    <span className="text-lg">{portfolioData.personal.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 hover:text-teal-400 transition-colors p-3 rounded-lg hover:bg-gray-800/50">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-teal-500" />
                    </div>
                    <span className="text-lg">{portfolioData.personal.location}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Zap className="h-8 w-8 text-teal-500" />
                  Specializations
                </h3>
                <div className="space-y-6">
                  <div className="group p-6 bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                        <Code className="h-6 w-6 text-teal-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-teal-400 mb-2 text-xl">Machine Learning & AI</h4>
                        <p className="text-gray-400">Model development, Generative AI, and LLM implementation</p>
                      </div>
                    </div>
                  </div>
                  <div className="group p-6 bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                        <Trophy className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-400 mb-2 text-xl">Data-Centric Solutions</h4>
                        <p className="text-gray-400">Python development, Power BI, and SQL integration</p>
                      </div>
                    </div>
                  </div>
                  <div className="group p-6 bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                        <Monitor className="h-6 w-6 text-teal-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-teal-400 mb-2 text-xl">Full-Stack Development</h4>
                        <p className="text-gray-400">End-to-end web application development</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-24 px-4 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Skills & Tools
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                Technologies I work with to bring ideas to life
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.skills.map((category, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/10 h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-teal-500" />
                      </div>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {category.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{skill.icon}</span>
                            <span className="text-gray-300 font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative">
                          <Progress value={skill.level} className="h-3 bg-gray-700/50" />
                          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-orange-500 rounded-full transition-all duration-1000 ease-out" 
                               style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                Showcasing innovative solutions and creative implementations
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 150}>
                <Card 
                  className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden group h-full shadow-lg hover:shadow-2xl hover:shadow-teal-500/10"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="bg-teal-500/90 hover:bg-teal-600 text-white rounded-full">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 border-0">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-teal-500/20 text-teal-400 border-0">
                          +{project.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">View Details</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="py-24 px-4 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Experience
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                Professional journey and key achievements
              </p>
            </div>
          </AnimatedSection>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 via-orange-500 to-teal-500"></div>
            
            {portfolioData.experience.map((exp, index) => (
              <AnimatedSection key={exp.id} delay={index * 200}>
                <div className={`relative mb-16 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full border-4 border-gray-950 flex items-center justify-center shadow-lg">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="ml-16 md:ml-0">
                    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                            <p className="text-teal-400 font-medium text-lg">{exp.company}</p>
                            <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-gray-700/50 text-gray-300 border-0">
                            {exp.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">{exp.description}</p>
                        <div className="space-y-3">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-400 leading-relaxed">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                Ready to collaborate on your next big idea? Let's create something amazing together.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <Mail className="h-7 w-7 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Email</h3>
                      <p className="text-gray-400">{portfolioData.personal.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Phone className="h-7 w-7 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Phone</h3>
                      <p className="text-gray-400">{portfolioData.personal.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-7 w-7 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Location</h3>
                      <p className="text-gray-400">{portfolioData.personal.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-white font-semibold mb-6 text-lg">Connect With Me</h3>
                  <div className="flex gap-4">
                    {Object.entries(portfolioData.socialLinks).map(([platform, url]) => (
                      <Button
                        key={platform}
                        asChild
                        size="sm"
                        variant="outline"
                        className="w-12 h-12 p-0 border-gray-600 hover:border-teal-500 hover:bg-teal-500/10 transition-all duration-300 hover:scale-110"
                      >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {platform === 'github' && <Github className="h-5 w-5" />}
                          {platform === 'linkedin' && <Linkedin className="h-5 w-5" />}
                          {platform === 'geeksforgeeks' && <Code className="h-5 w-5" />}
                          {platform === 'leetcode' && <Target className="h-5 w-5" />}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right">
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10">
                <CardContent className="p-8">
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white text-lg">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500 focus:ring-teal-500 h-12 text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white text-lg">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500 focus:ring-teal-500 h-12 text-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white text-lg">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500 focus:ring-teal-500 h-12 text-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white text-lg">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500 focus:ring-teal-500 text-lg resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={contactLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white disabled:opacity-50 h-14 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-teal-500/25"
                    >
                      {contactLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-4 border-t border-gray-800/50 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-lg">
            © 2024 {portfolioData.personal.name}. Crafted with ❤️ using React, FastAPI & AI Innovation
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Badge variant="secondary" className="bg-gray-800/50 text-gray-400 border-0">
              <Globe className="w-3 h-3 mr-1" />
              Available Worldwide
            </Badge>
            <Badge variant="secondary" className="bg-gray-800/50 text-gray-400 border-0">
              <Zap className="w-3 h-3 mr-1" />
              Fast Response
            </Badge>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Portfolio;