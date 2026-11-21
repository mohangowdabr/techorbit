"use client";

import { useState } from "react";
import { storageService } from "@/lib/services/storage";
import { User, ShieldCheck, Globe, Lock, Github, Linkedin, ExternalLink, Award, Plus, Sparkles } from "lucide-react";

export default function PassportPage() {
  const [profile, setProfile] = useState(() => storageService.getProfile());
  const [isPublic, setIsPublic] = useState(profile.privacyLevel === 'public');

  const togglePrivacy = () => {
    const newLevel = isPublic ? 'private' : 'public';
    setIsPublic(!isPublic);
    storageService.updateProfile({ privacyLevel: newLevel });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="h-20 w-20 rounded-2xl object-cover border-2 border-blue-500/40 shadow-lg shadow-blue-500/20"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{profile.fullName}</h1>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified Dev
                </span>
              </div>
              <p className="text-xs font-medium text-blue-400">{profile.headline}</p>
              <p className="text-xs text-slate-400">{profile.location} • @{profile.githubHandle}</p>
            </div>
          </div>

          {/* Privacy Switch */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={togglePrivacy}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold border transition ${
                isPublic
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {isPublic ? <Globe className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
              <span>{isPublic ? "Public Passport (Shareable)" : "Private (Hidden)"}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          {profile.bio}
        </p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 text-xs">
          {profile.githubHandle && (
            <a
              href={`https://github.com/${profile.githubHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white"
            >
              <Github className="h-4 w-4" /> <span>github.com/{profile.githubHandle}</span>
            </a>
          )}
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white"
            >
              <Linkedin className="h-4 w-4" /> <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>

      {/* Grid: Verified Achievements & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Verified Achievements */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">Verified Achievements</h3>
            </div>
            <span className="text-[11px] text-slate-400">Cryptographically Attested</span>
          </div>

          <div className="space-y-3">
            {profile.achievements.map((ach) => (
              <div
                key={ach.id}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{ach.title}</span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Confirmed
                  </span>
                </div>
                <div className="text-xs text-blue-400 font-medium">{ach.eventName}</div>
                <div className="text-[10px] text-slate-500 font-mono">Hash: {ach.verificationHash}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <h3 className="text-base font-bold text-white">Verified Skill Matrix</h3>
            </div>
            <span className="text-[11px] text-slate-400">{profile.skills.length} Evaluated</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs flex items-center justify-between gap-2"
              >
                <span className="font-semibold text-slate-200">{skill.name}</span>
                <span className="text-[10px] font-mono capitalize px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Portfolio */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Showcase Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{proj.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{proj.description}</p>
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.map((t) => (
                    <span key={t} className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80 text-xs">
                {proj.demoUrl && (
                  <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium">
                    Live Demo <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1 font-medium">
                    <Github className="h-3.5 w-3.5" /> Repository
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
