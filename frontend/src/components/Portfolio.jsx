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
    "Problem Solver"
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navigation />
        <LoadingSection title="Loading portfolio..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
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
      <div className="min-h-screen bg-gray-950 text-white">
        <Navigation />
        <ErrorMessage 
          message="No portfolio data available"
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
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
                onClick={() => scrollToSection('projects')}
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
      <section id="about" className="py-20 px-4">
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
      <section id="skills" className="py-20 px-4 bg-gray-900/50">
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 150}>
                <Card 
                  className="bg-gray-800/50 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden group"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500/90 text-white">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">View Details</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Experience
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-500 to-orange-500"></div>
            
            {portfolioData.experience.map((exp, index) => (
              <AnimatedSection key={exp.id} delay={index * 200}>
                <div className={`relative mb-12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-teal-500 rounded-full border-4 border-gray-950 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  
                  <div className="ml-12 md:ml-0">
                    <Card className="bg-gray-800/50 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                            <p className="text-teal-400 font-medium">{exp.company}</p>
                            <p className="text-gray-400 text-sm">{exp.location}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {exp.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-4">{exp.description}</p>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-400">{achievement}</span>
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

      {/* Certifications Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Certifications
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.certifications.map((cert, index) => (
              <AnimatedSection key={cert.id} delay={index * 150}>
                <Card className="bg-gray-800/50 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{cert.title}</h3>
                    <p className="text-teal-400 text-xs mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{cert.date}</span>
                      <GraduationCap className="h-4 w-4 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Achievements
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.achievements.map((achievement, index) => (
              <AnimatedSection key={achievement.id} delay={index * 150}>
                <Card className="bg-gray-800/50 border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.date}
                    </Badge>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Coding Profiles Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Coding Profiles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.codingProfiles.map((profile, index) => (
              <AnimatedSection key={profile.platform} delay={index * 150}>
                <Card className="bg-gray-800/50 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {profile.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{profile.platform}</h3>
                    <p className="text-teal-400 text-sm mb-4">@{profile.username}</p>
                    <div className="space-y-2">
                      {Object.entries(profile.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs text-gray-400 capitalize">{key}:</span>
                          <span className="text-xs text-white font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      asChild 
                      size="sm" 
                      className="mt-4 bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      <a href={profile.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Profile
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and AI.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-400">{portfolioData.personal.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <p className="text-gray-400">{portfolioData.personal.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-400">{portfolioData.personal.location}</p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-white font-semibold mb-4">Follow Me</h3>
                  <div className="flex gap-4">
                    {Object.entries(portfolioData.socialLinks).map(([platform, url]) => (
                      <Button
                        key={platform}
                        asChild
                        size="sm"
                        variant="outline"
                        className="w-10 h-10 p-0 border-gray-600 hover:border-teal-500 hover:bg-teal-500/10"
                      >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {platform === 'github' && <Github className="h-4 w-4" />}
                          {platform === 'linkedin' && <Linkedin className="h-4 w-4" />}
                          {platform === 'geeksforgeeks' && <Code className="h-4 w-4" />}
                          {platform === 'leetcode' && <Target className="h-4 w-4" />}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right">
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardContent className="p-6">
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="bg-gray-900/50 border-gray-600 text-white focus:border-teal-500"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={contactLoading}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50"
                    >
                      {contactLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
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

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 {portfolioData.personal.name}. Crafted with ❤️ using React & FastAPI
          </p>
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