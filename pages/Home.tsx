import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Globe, Layers, ArrowRight, BookOpen, CheckCircle, Award, Lock, FileText } from 'lucide-react';
import { DEPARTMENTS, BENEFITS, PRINCIPLES, INTRO_TEXT, TEAM_CULTURE, CONFIDENTIALITY_POINTS } from '../constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "CODEON | Official Portal";
  }, []);

  return (
    <div className="flex flex-col gap-0 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-codeon-secondary/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-codeon-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-codeon-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-codeon-accent"></span>
            </span>
            <span className="text-slate-300 text-xs font-mono font-bold uppercase tracking-wider">Recruitment Phase 1.0</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-none"
          >
            CODEON
          </motion.h1>
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
             className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-codeon-accent via-emerald-200 to-codeon-secondary mb-8"
          >
            The English-Based Compiler Ecosystem
          </motion.h2>
          
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            We are building the future of syntax-free programming. Join the team constructing the IDE, Docs, and Ecosystem around the core engine.
          </motion.p>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/apply" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-codeon-accent text-codeon-dark font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center">
              Initialize Application <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="#mission" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center backdrop-blur-sm">
              View Documentation
            </a>
          </motion.div>
        </div>
      </section>

      {/* 1. Introduction (Mission) */}
      <section id="mission" className="py-24 border-t border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-12 top-0 text-9xl font-black text-white/5 -z-10 select-none">01</div>
            <h2 className="text-4xl font-bold text-white mb-8">System Overview</h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
              {INTRO_TEXT.content.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? "text-xl text-white font-normal" : ""}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Guiding Principles */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="text-3xl font-bold text-white mb-12 text-center"
        >
          <span className="text-codeon-secondary">02.</span> Guiding Principles
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:border-codeon-secondary/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-codeon-secondary/10 rounded-xl text-codeon-secondary group-hover:scale-110 transition-transform">
                  <principle.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">{principle.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{principle.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Departments */}
      <section id="departments" className="py-24 bg-gradient-to-b from-slate-900 to-codeon-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Open Roles</h2>
            <p className="text-slate-400">Select a department to begin your application.</p>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {DEPARTMENTS.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/5 rounded-3xl p-1 hover:bg-white/10 transition-colors group"
              >
                <div className="bg-codeon-dark rounded-[20px] p-8 h-full flex flex-col relative overflow-hidden">
                   {/* Glow effect on hover */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-codeon-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-codeon-accent/20 transition-all" />
                   
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white group-hover:text-codeon-accent transition-colors z-10 shrink-0">
                      <dept.icon className="w-7 h-7" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-white z-10">{dept.title}</h3>
                       <span className="text-sm font-mono text-slate-500 block uppercase tracking-wider">{dept.subtitle || "Contributor Role"}</span>
                     </div>
                   </div>
                   
                   <p className="text-slate-300 text-base mb-8 leading-relaxed border-b border-white/5 pb-6">{dept.description}</p>
                   
                   <div className="grid md:grid-cols-2 gap-8 mb-8 flex-grow">
                     {/* Responsibilities */}
                     <div>
                       <h4 className="text-codeon-secondary font-semibold text-sm mb-3 uppercase tracking-wider flex items-center">
                         <Layers className="w-4 h-4 mr-2" /> Responsibilities
                       </h4>
                       <ul className="space-y-2">
                         {dept.responsibilities.map((resp, i) => (
                           <li key={i} className="text-slate-400 text-sm flex items-start leading-snug">
                             <span className="text-slate-600 mr-2 mt-1.5 w-1 h-1 bg-slate-500 rounded-full shrink-0"></span>
                             {resp}
                           </li>
                         ))}
                       </ul>
                     </div>

                     {/* Skills */}
                     <div>
                       <h4 className="text-codeon-accent font-semibold text-sm mb-3 uppercase tracking-wider flex items-center">
                         <Award className="w-4 h-4 mr-2" /> Skill Requirements
                       </h4>
                       <ul className="space-y-2">
                         {dept.skills.map((skill, i) => (
                           <li key={i} className="text-slate-400 text-sm flex items-start leading-snug">
                             <CheckCircle className="w-4 h-4 text-codeon-accent/50 mr-2 mt-0.5 shrink-0" />
                             {skill}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                   
                   <Link 
                    to="/apply" 
                    state={{ preselectedDept: dept.id }} 
                    className="w-full py-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-codeon-accent hover:text-codeon-dark hover:border-codeon-accent transition-all text-center text-base font-bold flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] mt-auto"
                  >
                    Apply for this Role <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Confidentiality */}
      <section className="py-24 px-6">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-slate-900 border border-red-500/20 rounded-2xl p-1 overflow-hidden relative"
          >
          {/* Top Secret Stripe */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          
          <div className="bg-codeon-dark/80 backdrop-blur rounded-xl p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
              <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Confidentiality Protocol</h2>
                <p className="text-red-400 text-sm font-mono uppercase tracking-widest mt-1">Level 4 Clearance Required</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {CONFIDENTIALITY_POINTS.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
                  <p className="text-slate-300 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5 & 6. Benefits & Culture */}
      <section id="benefits" className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
         {/* Benefits */}
         <div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Award className="w-6 h-6 text-emerald-400 mr-3" /> Benefits
            </h2>
            <div className="space-y-4">
              {BENEFITS.slice(0, 5).map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-bold text-white text-sm mb-1">{benefit.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
         </div>

         {/* Culture */}
         <div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Globe className="w-6 h-6 text-codeon-secondary mr-3" /> Culture
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
               <ul className="space-y-6">
                 {TEAM_CULTURE.map((item, idx) => (
                   <li key={idx} className="flex items-center text-slate-300">
                     <div className="w-6 h-6 rounded-full bg-codeon-secondary/20 flex items-center justify-center mr-4 text-codeon-secondary text-xs shrink-0">
                       {idx + 1}
                     </div>
                     {item.text}
                   </li>
                 ))}
               </ul>
               <div className="mt-8 pt-8 border-t border-slate-800">
                 <p className="text-slate-500 italic text-sm">"We assist ecosystem development, not language construction."</p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. CTA */}
      <section className="py-32 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-codeon-accent/5"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-codeon-accent/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Contribute?</h2>
          <p className="text-slate-400 text-lg mb-10">
            Contributors who join during this early development stage will be noted as part of CODEON’s foundational team.
          </p>
          
          <Link to="/apply" className="inline-flex items-center space-x-2 bg-white text-codeon-dark px-10 py-5 rounded-xl font-bold text-xl hover:bg-slate-200 transition-all transform hover:scale-105 shadow-xl">
            <span>Launch Application</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;