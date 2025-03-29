import { useQuery } from "@tanstack/react-query";
import { H2, Paragraph } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { Stats } from "@shared/schema";

export default function StatsSection() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  return (
    <section className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <H2>Our Growing Community</H2>
          <Paragraph className="max-w-2xl mx-auto">
            Join thousands of entrepreneurs and innovators who are bringing their ideas to life every day.
          </Paragraph>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            value={isLoading ? 0 : stats?.users || 0} 
            label="Users" 
            isLoading={isLoading} 
          />
          <StatCard 
            value={isLoading ? 0 : stats?.ideas || 0} 
            label="Ideas Submitted" 
            isLoading={isLoading} 
          />
          <StatCard 
            value={isLoading ? 0 : stats?.collaborations || 0} 
            label="Collaborations" 
            isLoading={isLoading} 
          />
          <StatCard 
            value={isLoading ? "$0" : stats?.investments || "$0"} 
            label="Investment Secured" 
            isLoading={isLoading}
            isMonetary={true}
          />
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  value: number | string;
  label: string;
  isLoading: boolean;
  isMonetary?: boolean;
}

function StatCard({ value, label, isLoading, isMonetary = false }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(isMonetary ? value : 0);
  
  useEffect(() => {
    if (isLoading) return;
    
    if (isMonetary) {
      setDisplayValue(value);
      return;
    }
    
    const finalValue = typeof value === 'number' ? value : 0;
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepValue = finalValue / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.floor(stepValue * currentStep));
      
      if (currentStep >= steps) {
        setDisplayValue(finalValue);
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, isLoading, isMonetary]);
  
  return (
    <Card className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6 text-center">
        <div className="text-4xl font-bold text-primary mb-2">
          {isLoading ? (
            <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            displayValue
          )}
        </div>
        <div className="text-neutral-600 font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}
