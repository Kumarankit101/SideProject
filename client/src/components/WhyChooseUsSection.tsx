import React from "react";
import { ThumbsUp, Zap, Brain } from "lucide-react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="relative group perspective-1000">
      {/* Glowing border overlay that animates on hover */}
      <div
        className="absolute inset-0 border border-[#DDF695]/20 rounded-lg transition-all duration-500 
        group-hover:border-[#DDF695] group-hover:border-2 group-hover:scale-105
        before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-[#DDF695]/0 before:via-[#DDF695]/30 before:to-[#DDF695]/0
        before:opacity-0 before:transition-opacity before:duration-1000 group-hover:before:opacity-100
        before:blur-xl before:transform before:animate-pulse-slow"
      ></div>

      {/* Card content with 3D transform effect */}
      <div
        className="bg-[#1E1E1E] rounded-lg p-8 h-full transition-all duration-500 group-hover:scale-105 
        transform-gpu group-hover:shadow-[0_0_40px_rgba(221,246,149,0.2)] group-hover:-translate-y-4 group-hover:rotate-y-3
        relative z-10 backface-hidden"
      >
        {/* Inner glow that appears on hover */}
        <div className="absolute inset-0 bg-gradient-radial from-[#DDF695]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>

        <div className="flex flex-col h-full relative z-20">
          {/* Icon with animation */}
          <div className="text-[#DDF695] mb-6 flex justify-center transition-transform duration-700 group-hover:scale-110 group-hover:transform">
            <div className="w-20 h-20 flex items-center justify-center transform transition-all duration-500 group-hover:rotate-6">
              {icon}
            </div>
          </div>

          {/* Text content with animations */}
          <h3 className="text-white text-xl font-bold mb-4 transition-colors duration-500 group-hover:text-[#DDF695]">
            {title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed transition-colors duration-500 group-hover:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: <ThumbsUp className="w-14 h-14" />,
      title: "Community-Driven Innovation",
      description:
        "We foster a supportive environment where entrepreneurs can share ideas, receive feedback, and connect with like-minded collaborators to turn concepts into reality.",
    },
    {
      icon: <Zap className="w-14 h-14" />,
      title: "Access to Resources",
      description:
        "Our platform provides connections to investors, mentors, and educational resources that help you transform your side project into a successful venture.",
    },
    {
      icon: <Brain className="w-14 h-14" />,
      title: "Idea Validation & Refinement",
      description:
        "Test your concept with our community of entrepreneurs and experts who provide valuable insights to help refine and improve your project before launch.",
    },
  ];

  return (
    <section className="py-64 bg-[#171817] ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Entrepreneurs Choose Us
          </h2>
          <p className="text-gray-400 text-lg">
            Our platform is designed to support entrepreneurs at every stage of
            their journey, from idea conception to successful launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
