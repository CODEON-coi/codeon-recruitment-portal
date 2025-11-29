import { LucideIcon } from 'lucide-react';

export interface Department {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  icon: LucideIcon;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CulturePoint {
  text: string;
}

export enum ApplicationStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  education: string;
  ageConfirm: boolean;
  
  department: string;
  whyJoin: string;
  responsibilities: string[]; // Multi-select
  tools: string[]; // Multi-select
  toolsOther: string;
  
  proficiency: string;
  experience: string;
  teamExp: string; // "Yes" | "No"
  teamRole: string;
  portfolioLinks: string;
  problemSolving: string;
  motivation: string;
  deadlineComfort: string;
  followGuidelines: string; // "Yes" | "No"
  
  availability: string;
  timeline: string;
  structuredWorkflow: string;
  
  // Agreements
  agreeCore: boolean;
  agreeEcosystem: boolean;
  agreeIP: boolean;
  agreeConfidential: boolean;
  agreeNonCompete: boolean;
  agreeZeroComp: boolean;
  agreeRespect: boolean;
  
  ackBenefits: boolean;
  ackViolation: boolean;
  ackLegal: boolean;
  
  declFinal: boolean;
  signature: string;
  date: string;
}