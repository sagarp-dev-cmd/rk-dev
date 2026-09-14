
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const featureData = [
  {
    title: "Comprehensive Job Tracking",
    desc: "Add, edit, and categorize your applications. Store every detail about roles, companies, and contacts.",
    icon: "📋",
    color: "bg-blue-50 dark:bg-blue-900/10",
  },
  {
    title: "Visual Analytics Dashboard",
    desc: "Spot trends, monitor applications, and make smarter moves with beautifully visualized progress.",
    icon: "📊",
    color: "bg-indigo-50 dark:bg-indigo-900/10",
  },
  {
    title: "Status Management",
    desc: "Easily drag jobs between stages: applied, interview, offer, or rejected. Stay organized at every turn.",
    icon: "🚦",
    color: "bg-amber-50 dark:bg-amber-900/10",
  },
  {
    title: "Personal Notes & Contacts",
    desc: "Add recruiter details and tips for each job. Your research and preparation, all in one spot.",
    icon: "✍️",
    color: "bg-rose-50 dark:bg-rose-900/10",
  },
  {
    title: "Modern, Accessible UI",
    desc: "A responsive interface with buttery-smooth interactions, keyboard navigation, and full dark mode support.",
    icon: "✨",
    color: "bg-green-50 dark:bg-green-900/10",
  },
];

const Features = () => (
  <section className="min-h-[80vh] py-12 app-container max-w-5xl mx-auto animate-fade-in">
    <div className="mx-auto mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 tracking-tight select-none">
        Powerful <span className="text-primary">Features</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mx-auto max-w-3xl">
        Everything you need to master your job search – thoughtfully designed, endlessly helpful.
      </p>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
      {featureData.map((feature, idx) => (
        <Card
          key={feature.title}
          className="feature-card overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-gray-800"
          style={{ animationDelay: `${0.13 * idx + 0.2}s` }}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-start gap-3">
              <div className={`text-4xl mb-3 p-3 rounded-lg ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default Features;
