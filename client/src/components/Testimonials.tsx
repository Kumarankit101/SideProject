import { H2, Paragraph } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "SideProject.com helped me find the perfect co-founder for my app idea. Six months later, we've launched and have our first 5,000 users!",
      name: "Alexandra Chen",
      project: "HealthTrack App",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    {
      quote: "The feedback I received from the community helped me pivot my idea in a direction that actually solved a real problem. Now we've secured $300K in seed funding!",
      name: "Marcus Johnson",
      project: "CodeBuddy",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
      quote: "I was hesitant to share my idea at first, but the supportive community here gave me the confidence to pursue it. Now my side project has become my full-time business!",
      name: "Priya Patel",
      project: "EcoSwap",
      avatar: "https://randomuser.me/api/portraits/women/86.jpg"
    }
  ];

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <H2>Success Stories</H2>
          <Paragraph className="max-w-2xl mx-auto">
            Hear from entrepreneurs who turned their side projects into successful ventures.
          </Paragraph>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-md relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-[#fcccc9] rounded-full flex items-center justify-center">
                <Quote className="h-4 w-4 text-primary" />
              </div>
              <CardContent className="p-6">
                <p className="text-neutral-600 italic mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <h4 className="font-montserrat font-medium text-primary">{testimonial.name}</h4>
                    <p className="text-xs text-neutral-500">{testimonial.project}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
