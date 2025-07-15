from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    description: str
    email: str
    phone: str
    location: str
    avatar: str

class SocialLinks(BaseModel):
    github: str
    linkedin: str
    geeksforgeeks: str
    leetcode: str

class SkillItem(BaseModel):
    name: str
    level: int
    icon: str

class SkillCategory(BaseModel):
    category: str
    items: List[SkillItem]

class Project(BaseModel):
    id: int
    title: str
    description: str
    longDescription: str
    image: str
    tags: List[str]
    liveUrl: str
    githubUrl: str
    featured: bool

class Experience(BaseModel):
    id: int
    title: str
    company: str
    duration: str
    location: str
    description: str
    achievements: List[str]

class Certification(BaseModel):
    id: int
    title: str
    issuer: str
    date: str
    image: str
    credentialId: str

class Achievement(BaseModel):
    id: int
    title: str
    description: str
    icon: str
    date: str

class CodingProfileStats(BaseModel):
    repositories: Optional[int] = None
    stars: Optional[int] = None
    followers: Optional[int] = None
    problems: Optional[int] = None
    rank: Optional[str] = None
    rating: Optional[int] = None
    connections: Optional[int] = None
    posts: Optional[int] = None
    score: Optional[int] = None

class CodingProfile(BaseModel):
    platform: str
    username: str
    stats: CodingProfileStats
    icon: str
    url: str

class PortfolioData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal: PersonalInfo
    socialLinks: SocialLinks
    skills: List[SkillCategory]
    projects: List[Project]
    experience: List[Experience]
    certifications: List[Certification]
    achievements: List[Achievement]
    codingProfiles: List[CodingProfile]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    submittedAt: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, responded

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class PortfolioDataCreate(BaseModel):
    personal: PersonalInfo
    socialLinks: SocialLinks
    skills: List[SkillCategory]
    projects: List[Project]
    experience: List[Experience]
    certifications: List[Certification]
    achievements: List[Achievement]
    codingProfiles: List[CodingProfile]

class PortfolioDataUpdate(BaseModel):
    personal: Optional[PersonalInfo] = None
    socialLinks: Optional[SocialLinks] = None
    skills: Optional[List[SkillCategory]] = None
    projects: Optional[List[Project]] = None
    experience: Optional[List[Experience]] = None
    certifications: Optional[List[Certification]] = None
    achievements: Optional[List[Achievement]] = None
    codingProfiles: Optional[List[CodingProfile]] = None