
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const aboutItems = [
  {
    title: "Our Mission",
    desc: "To simplify the job hunting process and help candidates organize their search effectively.",
    emoji: "🎯",
    color: "bg-blue-50 dark:bg-blue-900/10",
  },
  {
    title: "Why JobTrackly?",
    desc: "Built by job seekers who understand the challenges of managing multiple applications in today's competitive market.",
    emoji: "💼",
    color: "bg-purple-50 dark:bg-purple-900/10",
  },
  {
    title: "Data Privacy First",
    desc: "Your job search data stays private and secure. We never share your information with third parties.",
    emoji: "🔒",
    color: "bg-green-50 dark:bg-green-900/10",
  },
  {
    title: "Constant Improvement",
    desc: "We regularly add new features based on user feedback to make your job search experience better.",
    emoji: "📈",
    color: "bg-amber-50 dark:bg-amber-900/10",
  },
];

const teamMembers = [
  {
    name: "Rohit Kshirsagar",
    role: "Founder & Developer",
    bio: "Former recruiter turned developer who wanted to solve job hunting challenges.",
  },
  // {
  //   name: "Taylor Smith",
  //   role: "UX/UI Designer",
  //   bio: "Passionate about creating intuitive interfaces that make complex tasks simple.",
  // },
  {
    name: "PK",
    role: "Founder & Developer",
    bio: "Focused on building features that truly address job seekers' pain points.",
  },
]; 

const About = () => (
  <section className="min-h-[80vh] app-container py-12 max-w-5xl mx-auto animate-fade-in">
    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-gray-900/80 dark:to-gray-800/80 rounded-xl p-8 mb-10 shadow-sm border border-slate-100 dark:border-gray-800 relative overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-100 tracking-tight select-none">
        About <span className="text-primary">JobTrackly</span>
      </h1>
      
      <div className="mt-3 mb-8 text-center text-lg text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto">
        <p className="mb-4">
          <span className="font-bold text-primary">JobTrackly</span> helps job seekers organize and optimize their job search process.
        </p>
        <p>
          Our platform emerged from real frustrations with tracking applications, managing follow-ups, and organizing job search information. 
          We built JobTrackly to bring clarity and efficiency to the job hunting journey.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-10 shadow-sm border border-slate-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Story</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Started in 2025, JobTrackly has grown from a simple spreadsheet alternative to a comprehensive job application 
          management platform. We understand the emotional rollercoaster of job hunting - the excitement of finding the 
          perfect role, the anxiety of waiting for responses, and the challenge of staying organized through it all.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Our platform is designed to eliminate the chaos and bring structure to your job search, letting you focus on 
          what matters most: landing your dream job.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {aboutItems.map((item, i) => (
          <Card
            key={item.title}
            className="feature-card rounded-xl overflow-hidden"
            style={{ animationDelay: `${0.1 * i + 0.2}s` } as React.CSSProperties}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`text-3xl p-3 rounded-lg ${item.color}`}>{item.emoji}</div>
                <div>
                  <h3 className="text-lg font-semibold text-primary dark:text-primary">{item.title}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">The Team Behind JobTrackly</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {teamMembers.map((member, i) => (
          <Card
            key={member.name}
            className="feature-card rounded-xl overflow-hidden"
            style={{ animationDelay: `${0.1 * i + 0.4}s` } as React.CSSProperties}
          >
            <CardContent className="p-5 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mx-auto mb-3">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{member.role}</p>
              <p className="text-base text-gray-600 dark:text-gray-300">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Version 1.0 &mdash; Built by the JobTrackly Team with ❤️ for job seekers everywhere.
      </div>
    </div>
  </section>
);

export default About;
