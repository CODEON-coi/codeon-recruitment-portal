import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, CheckCircle, ArrowLeft, ArrowRight, Loader2, 
  AlertCircle, CheckSquare, Square, Shield, Briefcase, 
  Code2, User, FileText, Calendar, ChevronLeft, ChevronRight,
  Clock, Timer, Lock
} from 'lucide-react';
import { 
  DEPT_FULL_NAMES, 
  GOOGLE_FORM_ACTION_URL, 
  FORM_MAPPING, 
  RESPONSIBILITIES_OPTIONS, 
  TOOLS_OPTIONS,
  APPLICATION_DEADLINE,
  DEPARTMENTS
} from '../constants';
import { ApplicationStatus, ApplicationFormData } from '../types';

// Steps definition
const STEPS = [
  { id: 1, title: 'Identity', icon: User },
  { id: 2, title: 'Role', icon: Briefcase },
  { id: 3, title: 'Skills', icon: Code2 },
  { id: 4, title: 'Logistics', icon: FileText },
  { id: 5, title: 'Legal', icon: Shield },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ApplicationForm: React.FC = () => {
  const location = useLocation();
  const today = new Date().toISOString().split('T')[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  // Countdown State
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(APPLICATION_DEADLINE) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      const difference = +new Date(APPLICATION_DEADLINE) - +new Date();
      if (difference <= 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '', email: '', phone: '', linkedin: '', github: '', education: '', ageConfirm: false,
    department: '', whyJoin: '', responsibilities: [], tools: [], toolsOther: '',
    proficiency: '', experience: '', teamExp: 'No', teamRole: '', portfolioLinks: '',
    problemSolving: '', motivation: '', deadlineComfort: '', followGuidelines: 'Yes',
    availability: '', timeline: '', structuredWorkflow: '',
    agreeCore: false, agreeEcosystem: false, agreeIP: false, agreeConfidential: false,
    agreeNonCompete: false, agreeZeroComp: false, agreeRespect: false,
    ackBenefits: false, ackViolation: false, ackLegal: false, declFinal: false,
    signature: '', date: today
  });

  const [status, setStatus] = useState<ApplicationStatus>(ApplicationStatus.IDLE);
  const [error, setError] = useState('');

  // Handle department pre-selection and SEO title
  useEffect(() => {
    document.title = "Apply Now | CODEON Contributor Program";
    window.scrollTo(0, 0);
    const preselectedId = location.state?.preselectedDept;
    if (preselectedId && DEPT_FULL_NAMES[preselectedId as keyof typeof DEPT_FULL_NAMES]) {
      setFormData(prev => ({ 
        ...prev, 
        department: DEPT_FULL_NAMES[preselectedId as keyof typeof DEPT_FULL_NAMES] 
      }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (field: 'responsibilities' | 'tools', value: string) => {
    setFormData(prev => {
      const list = prev[field];
      return list.includes(value) 
        ? { ...prev, [field]: list.filter(item => item !== value) }
        : { ...prev, [field]: [...list, value] };
    });
  };

  // Helper to get selected department ID based on the long string value
  const getSelectedDeptId = (): string => {
    if (formData.department.includes("Frontend")) return 'frontend';
    if (formData.department.includes("Backend")) return 'backend';
    if (formData.department.includes("Documentation")) return 'docs';
    if (formData.department.includes("Testing")) return 'testing';
    if (formData.department.includes("Design")) return 'design';
    return '';
  };

  const selectedDeptId = getSelectedDeptId();

  // Validation Logic per Step
  const validateStep = (step: number) => {
    switch(step) {
      case 1: // Identity
        if (!formData.fullName) return "Full Name is required.";
        if (!formData.email) return "Email Address is required.";
        if (!formData.phone) return "Phone Number is required.";
        if (!formData.ageConfirm) return "You must confirm you are 18 years or older.";
        break;
      case 2: // Role
        if (!formData.department) return "Please select a department.";
        if (!formData.whyJoin) return "Please explain why this role fits your skillset.";
        if (selectedDeptId && formData.responsibilities.length === 0) return "Please select at least one responsibility.";
        if (formData.tools.length === 0 && !formData.toolsOther) return "Please select tools you are comfortable with.";
        break;
      case 3: // Skills
        if (!formData.proficiency) return "Please select your proficiency level.";
        if (!formData.experience) return "Please describe your relevant experience.";
        if (!formData.motivation) return "Please describe your motivation.";
        if (!formData.followGuidelines) return "Please confirm you agree to follow guidelines.";
        break;
      case 4: // Logistics
        if (!formData.deadlineComfort) return "Please select your comfort with deadlines.";
        if (!formData.availability) return "Please select your availability.";
        if (!formData.timeline) return "Please select your preferred timeline.";
        if (!formData.structuredWorkflow) return "Please indicate your comfort with structured workflows.";
        break;
      case 5: // Legal
        if (!formData.agreeCore || !formData.agreeEcosystem || !formData.agreeIP || !formData.agreeConfidential ||
            !formData.agreeNonCompete || !formData.agreeZeroComp || !formData.agreeRespect ||
            !formData.ackBenefits || !formData.ackViolation || !formData.ackLegal || !formData.declFinal || !formData.signature) {
          return "You must agree to all terms and sign the declaration.";
        }
        break;
    }
    return "";
  };

  const nextStep = () => {
    const errorMsg = validateStep(currentStep);
    if (errorMsg) {
      setError(errorMsg);
      // Auto-clear error after 3 seconds
      setTimeout(() => setError(''), 3000);
      return;
    }
    setError('');
    setDirection(1);
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setError('');
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isExpired) {
       setError("Applications are now closed.");
       return;
    }
    const errorMsg = validateStep(5);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setStatus(ApplicationStatus.SUBMITTING);

    const submitData = new FormData();
    
    // Mapping logic ensuring exact strings required by Google Forms
    // Text Fields
    submitData.append(FORM_MAPPING.fullName, formData.fullName);
    submitData.append(FORM_MAPPING.email, formData.email);
    submitData.append(FORM_MAPPING.phone, formData.phone);
    submitData.append(FORM_MAPPING.linkedin, formData.linkedin);
    submitData.append(FORM_MAPPING.github, formData.github);
    submitData.append(FORM_MAPPING.education, formData.education);
    
    // Department & Role
    submitData.append(FORM_MAPPING.department, formData.department);
    submitData.append(FORM_MAPPING.whyJoin, formData.whyJoin);
    
    // Responsibilities (Mapped by dept)
    if (selectedDeptId === 'frontend') formData.responsibilities.forEach(r => submitData.append(FORM_MAPPING.respFrontend, r));
    if (selectedDeptId === 'backend') formData.responsibilities.forEach(r => submitData.append(FORM_MAPPING.respBackend, r));
    if (selectedDeptId === 'docs') formData.responsibilities.forEach(r => submitData.append(FORM_MAPPING.respDocs, r));
    if (selectedDeptId === 'testing') formData.responsibilities.forEach(r => submitData.append(FORM_MAPPING.respTesting, r));
    if (selectedDeptId === 'design') formData.responsibilities.forEach(r => submitData.append(FORM_MAPPING.respDesign, r));
    
    // Tools
    formData.tools.forEach(t => submitData.append(FORM_MAPPING.tools, t));
    if (formData.toolsOther) submitData.append(FORM_MAPPING.toolsOther, formData.toolsOther);
    
    // Experience & Skills
    submitData.append(FORM_MAPPING.proficiency, formData.proficiency);
    submitData.append(FORM_MAPPING.experience, formData.experience);
    submitData.append(FORM_MAPPING.teamExp, formData.teamExp);
    submitData.append(FORM_MAPPING.teamRole, formData.teamRole);
    submitData.append(FORM_MAPPING.portfolioLinks, formData.portfolioLinks);
    submitData.append(FORM_MAPPING.problemSolving, formData.problemSolving);
    submitData.append(FORM_MAPPING.motivation, formData.motivation);
    submitData.append(FORM_MAPPING.deadlineComfort, formData.deadlineComfort);
    submitData.append(FORM_MAPPING.followGuidelines, formData.followGuidelines);
    
    // Logistics
    submitData.append(FORM_MAPPING.availability, formData.availability);
    submitData.append(FORM_MAPPING.timeline, formData.timeline);
    submitData.append(FORM_MAPPING.structuredWorkflow, formData.structuredWorkflow);
    
    // Booleans mapped to specific strings
    if (formData.ageConfirm) submitData.append(FORM_MAPPING.ageConfirm, "I confirm I am 18 years or older.");
    if (formData.agreeCore) submitData.append(FORM_MAPPING.agreeCore, "I agree");
    if (formData.agreeEcosystem) submitData.append(FORM_MAPPING.agreeEcosystem, "I agree");
    if (formData.agreeIP) submitData.append(FORM_MAPPING.agreeIP, "I agree");
    if (formData.agreeConfidential) submitData.append(FORM_MAPPING.agreeConfidential, "I agree");
    if (formData.agreeNonCompete) submitData.append(FORM_MAPPING.agreeNonCompete, "I agree");
    if (formData.agreeZeroComp) submitData.append(FORM_MAPPING.agreeZeroComp, "I agree");
    if (formData.agreeRespect) submitData.append(FORM_MAPPING.agreeRespect, "I agree");
    if (formData.ackBenefits) submitData.append(FORM_MAPPING.ackBenefits, "I acknowledge the benefits listed.");
    if (formData.ackViolation) submitData.append(FORM_MAPPING.ackViolation, "I understand");
    if (formData.ackLegal) submitData.append(FORM_MAPPING.ackLegal, "I understand");
    if (formData.declFinal) submitData.append(FORM_MAPPING.declFinal, "I agree to all statements in the Final Declaration.");
    
    submitData.append(FORM_MAPPING.signature, formData.signature);
    submitData.append(FORM_MAPPING.date, formData.date);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: submitData,
        mode: 'no-cors' // Google Forms requirement
      });
      setStatus(ApplicationStatus.SUCCESS);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      setStatus(ApplicationStatus.ERROR);
      setError("Failed to submit. Please check your internet connection and try again.");
    }
  };

  // Closed State
  if (isExpired) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Applications Closed</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            The deadline for the CODEON Contributor Program was December 14, 2025. We are no longer accepting responses. Thank you for your interest.
          </p>
          <Link to="/" className="inline-flex items-center text-codeon-accent font-bold hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  // Success State
  if (status === ApplicationStatus.SUCCESS) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-slate-900 border border-codeon-accent/30 rounded-3xl p-10 text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]"
        >
          <div className="w-20 h-20 bg-codeon-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-codeon-accent">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Application Received</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you for applying to the CODEON Foundational Team. We have received your submission securely. Our team will review your profile and contact you if shortlisted.
          </p>
          <Link to="/" className="inline-flex items-center text-codeon-accent font-bold hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-white mb-3">Official Contributor Application</h1>
        <p className="text-slate-400">Join the ecosystem team. Build the future.</p>
      </div>

      {/* Countdown Timer Banner */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="bg-slate-900/80 border border-codeon-accent/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.05)] backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-3 md:mb-0">
            <div className="p-2 bg-codeon-accent/10 rounded-lg">
              <Timer className="w-5 h-5 text-codeon-accent animate-pulse" />
            </div>
            <div>
               <h3 className="text-sm font-bold text-white uppercase tracking-wider">Application Deadline</h3>
               <p className="text-xs text-slate-400">14 Dec 2025, 11:59 PM</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="text-center">
                <span className="block text-2xl font-mono font-bold text-white leading-none">{timeLeft.days}</span>
                <span className="text-[10px] text-slate-500 uppercase">Days</span>
             </div>
             <span className="text-slate-600 font-bold">:</span>
             <div className="text-center">
                <span className="block text-2xl font-mono font-bold text-white leading-none">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-500 uppercase">Hrs</span>
             </div>
             <span className="text-slate-600 font-bold">:</span>
             <div className="text-center">
                <span className="block text-2xl font-mono font-bold text-white leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-500 uppercase">Min</span>
             </div>
             <span className="text-slate-600 font-bold">:</span>
             <div className="text-center">
                <span className="block text-2xl font-mono font-bold text-codeon-accent leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-500 uppercase">Sec</span>
             </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 transform -translate-y-1/2"></div>
          {STEPS.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center bg-codeon-dark px-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-codeon-accent bg-codeon-accent text-codeon-dark shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                      : isCompleted 
                        ? 'border-codeon-accent bg-codeon-dark text-codeon-accent' 
                        : 'border-slate-700 bg-codeon-dark text-slate-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`mt-2 text-xs font-bold uppercase tracking-wider hidden sm:block ${isActive ? 'text-codeon-accent' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <form className="bg-white/5 border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden min-h-[500px] flex flex-col">
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            {/* --- STEP 1: IDENTITY --- */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-codeon-secondary" /> Applicant Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="ABC"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="abc@example.com"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 1234567890"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Education / Profession</label>
                    <input 
                      type="text" 
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="B.Tech CSE 2nd Year / Developer"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">LinkedIn URL</label>
                    <input 
                      type="url" 
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="linkedin.com/in/abc"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">GitHub / Portfolio URL</label>
                    <input 
                      type="url" 
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="github.com/abc"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      name="ageConfirm"
                      checked={formData.ageConfirm}
                      onChange={handleChange}
                      className="hidden" 
                    />
                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${formData.ageConfirm ? 'bg-codeon-accent border-codeon-accent text-codeon-dark' : 'bg-slate-900 border-slate-600 text-transparent group-hover:border-slate-500'}`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-slate-300 text-sm">I confirm I am 18 years or older.</span>
                  </label>
                </div>
              </div>
            )}

            {/* --- STEP 2: ROLE --- */}
            {currentStep === 2 && (
              <div className="space-y-8">
                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-codeon-secondary" /> Role Selection
                </h2>

                {/* Dept Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300 block ml-1">Select Department</label>
                  <div className="grid gap-3">
                    {/* Iterate over DEPARTMENTS const to show friendly UI, map to DEPT_FULL_NAMES for logic */}
                    {DEPARTMENTS.map((dept) => {
                      const fullString = DEPT_FULL_NAMES[dept.id as keyof typeof DEPT_FULL_NAMES];
                      const isSelected = formData.department === fullString;
                      return (
                        <div 
                          key={dept.id}
                          onClick={() => setFormData(prev => ({ ...prev, department: fullString, responsibilities: [] }))}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center sm:items-center ${isSelected ? 'bg-codeon-accent/10 border-codeon-accent shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 shrink-0 ${isSelected ? 'border-codeon-accent' : 'border-slate-500'}`}>
                             {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-codeon-accent" />}
                          </div>
                          <div>
                            <span className={`${isSelected ? 'text-white font-semibold' : 'text-slate-300'}`}>{dept.title}</span>
                            <span className="block text-xs text-slate-500">{dept.subtitle}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Responsibilities */}
                {selectedDeptId && (
                  <div className="space-y-3 pt-4 border-t border-white/5">
                     <label className="text-sm font-semibold text-slate-300 block ml-1">
                        Select Responsibilities you can handle:
                     </label>
                     <div className="grid sm:grid-cols-2 gap-3">
                        {RESPONSIBILITIES_OPTIONS[selectedDeptId as keyof typeof RESPONSIBILITIES_OPTIONS].map((resp, i) => {
                           const isChecked = formData.responsibilities.includes(resp);
                           return (
                             <div 
                                key={i}
                                onClick={() => handleMultiSelect('responsibilities', resp)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start ${isChecked ? 'bg-codeon-secondary/10 border-codeon-secondary' : 'bg-slate-900/30 border-slate-700 hover:border-slate-600'}`}
                             >
                                <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center mr-3 shrink-0 ${isChecked ? 'bg-codeon-secondary border-codeon-secondary text-white' : 'border-slate-600'}`}>
                                   {isChecked && <CheckCircle className="w-3 h-3" />}
                                </div>
                                <span className="text-sm text-slate-300 leading-snug">{resp}</span>
                             </div>
                           );
                        })}
                     </div>
                  </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Why does this role fit your skillset?</label>
                    <textarea 
                      name="whyJoin"
                      value={formData.whyJoin}
                      onChange={handleChange}
                      placeholder="Briefly explain (3-5 lines)..."
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all h-24 resize-none"
                    />
                </div>

                {/* Tools */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300 block ml-1">Tools & Technologies</label>
                  <div className="flex flex-wrap gap-2">
                    {TOOLS_OPTIONS.map((tool) => {
                      const isSelected = formData.tools.includes(tool);
                      return (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => handleMultiSelect('tools', tool)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${isSelected ? 'bg-white text-codeon-dark border-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                        >
                          {tool}
                        </button>
                      );
                    })}
                  </div>
                  <input 
                      type="text" 
                      name="toolsOther"
                      value={formData.toolsOther}
                      onChange={handleChange}
                      placeholder="Other tools (specify)..."
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-codeon-accent transition-all mt-2"
                  />
                </div>
              </div>
            )}

            {/* --- STEP 3: SKILLS --- */}
            {currentStep === 3 && (
              <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Code2 className="w-6 h-6 mr-3 text-codeon-secondary" /> Skills & Experience
                </h2>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Proficiency Level</label>
                  <select 
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent"
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner — Just starting">Beginner — Just starting</option>
                    <option value="Intermediate — Can work independently on small tasks">Intermediate — Can work independently</option>
                    <option value="Advanced — Can handle full modules with minimal supervision">Advanced — Can handle full modules</option>
                    <option value="Expert — Can architect systems, design independently, mentor others">Expert — Can architect systems</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Relevant Experience</label>
                  <textarea 
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Describe projects, internships, contributions..."
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent h-32 resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Previous Team Experience?</label>
                    <div className="flex space-x-4">
                      {['Yes', 'No'].map(opt => (
                        <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="teamExp" 
                            value={opt} 
                            checked={formData.teamExp === opt} 
                            onChange={handleChange} 
                            className="text-codeon-accent focus:ring-codeon-accent bg-slate-900 border-slate-700"
                          />
                          <span className="text-slate-300">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {formData.teamExp === 'Yes' && (
                     <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-300 ml-1">Describe Role</label>
                      <input 
                        type="text" 
                        name="teamRole"
                        value={formData.teamRole}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-codeon-accent"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Portfolio Links</label>
                  <input 
                    type="text" 
                    name="portfolioLinks"
                    value={formData.portfolioLinks}
                    onChange={handleChange}
                    placeholder="GitHub, Behance, Drive Links..."
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Motivation</label>
                   <textarea 
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="What motivates you to contribute to CODEON?"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent h-24 resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Do you agree to follow CODEON’s quality & style guidelines?</label>
                    <div className="flex space-x-4">
                      {['Yes', 'No'].map(opt => (
                        <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="followGuidelines" 
                            value={opt} 
                            checked={formData.followGuidelines === opt} 
                            onChange={handleChange} 
                            className="text-codeon-accent focus:ring-codeon-accent bg-slate-900 border-slate-700"
                          />
                          <span className="text-slate-300">{opt}</span>
                        </label>
                      ))}
                    </div>
                </div>
              </div>
            )}

             {/* --- STEP 4: LOGISTICS --- */}
             {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-codeon-secondary" /> Work Availability
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Weekly Availability</label>
                    <select 
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent"
                    >
                      <option value="">Select Hours</option>
                      <option value="Less than 3 hours/week">Less than 3 hours/week</option>
                      <option value="3–5 hours/week">3–5 hours/week</option>
                      <option value="5–8 hours/week">5–8 hours/week</option>
                      <option value="8+ hours/week">8+ hours/week</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Preferred Start Date</label>
                    <select 
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent"
                    >
                      <option value="">Select Timeline</option>
                      <option value="Immediately">Immediately</option>
                      <option value="Within 1 week">Within 1 week</option>
                      <option value="Within 1 month">Within 1 month</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Comfort with Deadlines</label>
                     <select 
                      name="deadlineComfort"
                      value={formData.deadlineComfort}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent"
                    >
                      <option value="">Select Comfort Level</option>
                      <option value="Very comfortable">Very comfortable</option>
                      <option value="Comfortable">Comfortable</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Need improvement">Need improvement</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1">Comfort with Structured Workflows (GitHub/Notion)</label>
                     <select 
                      name="structuredWorkflow"
                      value={formData.structuredWorkflow}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-codeon-accent"
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Learning but willing">Learning but willing</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 5: LEGAL --- */}
            {currentStep === 5 && (
              <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center text-red-400">
                  <Shield className="w-6 h-6 mr-3" /> Legal & Confidentiality
                </h2>

                <div className="bg-slate-900/80 p-6 rounded-xl border border-red-500/20 max-h-[400px] overflow-y-auto space-y-6">
                   {/* Confidentiality */}
                   <div className="space-y-4">
                     <h3 className="text-white font-bold border-b border-white/10 pb-2">Confidentiality & Restrictions</h3>
                     
                     {[
                       { key: 'agreeCore', text: '1. Compiler Core Protection: I understand that CODEON’s compiler core is strictly private and will not be shared.' },
                       { key: 'agreeEcosystem', text: '2. Ecosystem-Only Contribution: I understand my role is limited to ecosystem tasks, not editing the core language.' },
                       { key: 'agreeIP', text: '3. Intellectual Property Assignment: I agree that all work I contribute becomes the exclusive property of CODEON.' },
                       { key: 'agreeConfidential', text: '4. Confidentiality Requirement: I agree not to disclose any internal information.' },
                       { key: 'agreeNonCompete', text: '5. Non-Compete Clause (Light): I agree not to replicate CODEON’s internal logic.' },
                       { key: 'agreeZeroComp', text: '6. Zero Compensation Clause: I understand this is an unpaid contribution role.' },
                       { key: 'agreeRespect', text: '7. Respect & Conduct: I will maintain professionalism and avoid misuse of resources.' },
                     ].map((item) => (
                       <label key={item.key} className="flex items-start space-x-3 cursor-pointer group">
                          <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${formData[item.key as keyof ApplicationFormData] ? 'bg-codeon-accent border-codeon-accent text-codeon-dark' : 'border-slate-600 group-hover:border-slate-400'}`}>
                             {formData[item.key as keyof ApplicationFormData] && <CheckCircle className="w-3 h-3" />}
                             <input type="checkbox" name={item.key} checked={!!formData[item.key as keyof ApplicationFormData]} onChange={handleChange} className="hidden" />
                          </div>
                          <span className="text-sm text-slate-300 leading-relaxed">{item.text}</span>
                       </label>
                     ))}
                   </div>

                   {/* Benefits */}
                   <div className="space-y-4 pt-4 border-t border-white/10">
                      <h3 className="text-white font-bold">Contributor Benefits</h3>
                      <label className="flex items-start space-x-3 cursor-pointer group">
                          <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${formData.ackBenefits ? 'bg-codeon-accent border-codeon-accent text-codeon-dark' : 'border-slate-600 group-hover:border-slate-400'}`}>
                             {formData.ackBenefits && <CheckCircle className="w-3 h-3" />}
                             <input type="checkbox" name="ackBenefits" checked={formData.ackBenefits} onChange={handleChange} className="hidden" />
                          </div>
                          <span className="text-sm text-slate-300 leading-relaxed">I acknowledge that contributors receive a professional Certificate, Portfolio recognition, and early-team status.</span>
                       </label>
                   </div>

                   {/* Legal Rights */}
                   <div className="space-y-4 pt-4 border-t border-white/10">
                      <h3 className="text-white font-bold">Termination & Legal Rights</h3>
                       {[
                         { key: 'ackViolation', text: 'I understand CODEON may remove me immediately for violating terms.' },
                         { key: 'ackLegal', text: 'I understand CODEON may take legal action if I leak or misuse protected systems.' }
                       ].map((item) => (
                        <label key={item.key} className="flex items-start space-x-3 cursor-pointer group">
                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${formData[item.key as keyof ApplicationFormData] ? 'bg-codeon-accent border-codeon-accent text-codeon-dark' : 'border-slate-600 group-hover:border-slate-400'}`}>
                              {formData[item.key as keyof ApplicationFormData] && <CheckCircle className="w-3 h-3" />}
                              <input type="checkbox" name={item.key} checked={!!formData[item.key as keyof ApplicationFormData]} onChange={handleChange} className="hidden" />
                            </div>
                            <span className="text-sm text-slate-300 leading-relaxed">{item.text}</span>
                        </label>
                       ))}
                   </div>
                   
                   {/* Declaration */}
                   <div className="space-y-4 pt-4 border-t border-white/10">
                      <h3 className="text-white font-bold">Final Declaration</h3>
                      <label className="flex items-start space-x-3 cursor-pointer group bg-codeon-accent/5 p-4 rounded-lg border border-codeon-accent/20">
                          <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${formData.declFinal ? 'bg-codeon-accent border-codeon-accent text-codeon-dark' : 'border-slate-600 group-hover:border-slate-400'}`}>
                             {formData.declFinal && <CheckCircle className="w-3 h-3" />}
                             <input type="checkbox" name="declFinal" checked={formData.declFinal} onChange={handleChange} className="hidden" />
                          </div>
                          <span className="text-sm text-slate-200 leading-relaxed font-semibold">I certify that all information is true; I agree to all terms; I confirm I am joining voluntarily.</span>
                       </label>
                   </div>

                   {/* Signature */}
                   <div className="grid grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">Digital Signature (Full Name)</label>
                        <input 
                          type="text" 
                          name="signature"
                          value={formData.signature}
                          onChange={handleChange}
                          placeholder="ABC"
                          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2 text-white font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono appearance-none focus:outline-none focus:border-codeon-accent focus:ring-1 focus:ring-codeon-accent transition-all"
                          />
                          <Calendar className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          <button 
            type="button" 
            onClick={prevStep}
            disabled={currentStep === 1 || status === ApplicationStatus.SUBMITTING}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Back
          </button>
          
          {currentStep < STEPS.length ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="flex items-center bg-codeon-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Next Step <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={status === ApplicationStatus.SUBMITTING}
              className="flex items-center bg-codeon-accent text-codeon-dark px-10 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === ApplicationStatus.SUBMITTING ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Submit Application <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;