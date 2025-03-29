import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  company?: string;
  image: string;
};

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "SideProject.com gave me the confidence to turn my idea into a real product. The feedback I received was invaluable.",
      name: "Emma Chen",
      company: "Founder, EcoShop",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      quote: "I found my technical co-founder through this platform. We've since raised our seed round!",
      name: "Michael Rodriguez",
      company: "CEO, TechStart",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      quote: "Impeccable service and even better results! The community here is incredibly supportive.",
      name: "Nick",
      company: "Digital Entrepreneur",
      image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      quote: "The validation I received helped me pivot my idea early, saving me months of work in the wrong direction.",
      name: "Sarah Johnson",
      company: "Product Designer",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  // Auto-advance testimonials
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000); // 6 seconds interval
    }
    
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);
  
  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoplay(false); // Pause autoplay when manually navigating
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoplay(true);
    }, 10000);
  };
  
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  return (
    <section className="py-24 bg-[#171817] overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-[#DDF695]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[5%] -left-[5%] w-[30%] h-[30%] bg-[#DDF695]/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading section */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            What Our Users Say
          </h2>
          <p className="text-gray-400 text-lg">
            Don't take our word for it - hear from the entrepreneurs who have brought their ideas to life with our platform.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial slider area */}
          <div className="relative min-h-[450px] sm:min-h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-[450px] sm:h-[550px] rounded-lg overflow-hidden"
              >
                {/* Background image */}
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Soft shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171817] via-[#171817]/50 to-transparent opacity-80" />
                
                {/* Quote box styled like in the screenshot */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute top-10 right-10 max-w-xs bg-white/95 backdrop-blur-sm rounded-md p-6 shadow-lg"
                >
                  <div className="flex flex-col">
                    <p className="text-[#171817] font-light italic text-sm leading-relaxed mb-3">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <div>
                        <p className="font-medium text-[#171817] text-sm">{testimonials[currentIndex].name}</p>
                        {testimonials[currentIndex].company && (
                          <p className="text-gray-500 text-xs">{testimonials[currentIndex].company}</p>
                        )}
                      </div>
                      
                      {/* Company Logo or Personal Mark - custom logo */}
                      <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.3 8.12C19.1275 7.79738 18.8843 7.51434 18.59 7.29C18.247 7.01531 17.8394 6.83571 17.41 6.77C16.8553 6.67141 16.286 6.76826 15.8 7.04C15.5267 7.18131 15.2929 7.38315 15.115 7.627C14.9372 7.87085 14.8195 8.15089 14.77 8.45C14.7168 8.75468 14.7283 9.06709 14.804 9.36627C14.8798 9.66545 15.0179 9.94473 15.21 10.19C15.4206 10.4656 15.6908 10.6921 16 10.85C16.319 11.0186 16.6719 11.112 17.03 11.12C17.3981 11.1405 17.7644 11.0333 18.07 10.82C18.3243 10.6589 18.5413 10.4444 18.7069 10.1904C18.8726 9.93639 18.9831 9.64907 19.03 9.35C19.0861 8.93473 19.0323 8.51151 18.87 8.12H19.3V8.12ZM18.11 9.17C18.0423 9.382 17.9175 9.57003 17.75 9.71C17.5675 9.8636 17.336 9.94937 17.1 9.95C16.8607 9.95648 16.6255 9.88472 16.43 9.74C16.2483 9.59899 16.1156 9.40222 16.05 9.18C15.9939 8.97508 15.9939 8.75992 16.05 8.555C16.1064 8.34651 16.2151 8.15701 16.3651 8.00741C16.5152 7.85781 16.7009 7.75345 16.905 7.705C17.1111 7.63176 17.3346 7.61727 17.5493 7.66306C17.764 7.70885 17.9589 7.8132 18.11 7.96C18.2584 8.10312 18.3661 8.28358 18.42 8.48C18.4811 8.68223 18.4811 8.89777 18.42 9.1L18.11 9.17Z" fill="#E94A35"/>
                          <path d="M12.22 5.11C12.0222 4.77005 11.7442 4.48457 11.41 4.28C11.0468 4.02277 10.6271 3.86692 10.19 3.83C9.88689 3.81481 9.58436 3.86459 9.30484 3.97575C9.02533 4.08691 8.77582 4.25655 8.57559 4.47276C8.37536 4.68897 8.22937 4.94674 8.14909 5.22731C8.06881 5.50788 8.05644 5.80287 8.11264 6.0887C8.16884 6.37454 8.29217 6.64273 8.47203 6.87344C8.65189 7.10415 8.88358 7.29122 9.15 7.42C9.41626 7.55977 9.70896 7.64383 10.01 7.66818C10.311 7.69253 10.614 7.65668 10.9 7.56324C11.186 7.46979 11.4478 7.32086 11.6673 7.12623C11.8868 6.9316 12.0593 6.69581 12.1738 6.43355C12.2883 6.17129 12.3423 5.88888 12.3323 5.60487C12.3223 5.32086 12.2485 5.04298 12.115 4.79L12.55 4.6L12.22 5.11ZM11.22 5.7C11.1548 5.90094 11.0375 6.08122 10.88 6.22C10.7225 6.35909 10.53 6.45189 10.32 6.49C10.1214 6.53187 9.91645 6.51975 9.7231 6.45499C9.52976 6.39023 9.3558 6.27514 9.22 6.12C9.07449 5.97524 8.9694 5.79591 8.91271 5.59853C8.85603 5.40114 8.84982 5.19233 8.89466 4.99166C8.9395 4.79098 9.03383 4.60566 9.16788 4.45171C9.30193 4.29777 9.4714 4.17978 9.66 4.11C9.85344 4.03496 10.063 4.01653 10.265 4.05659C10.467 4.09665 10.6542 4.19359 10.81 4.33818C10.9657 4.48277 11.0829 4.67009 11.1501 4.87938C11.2173 5.08867 11.2323 5.31205 11.194 5.53L11.22 5.7Z" fill="#E94A35"/>
                          <path d="M8.87999 19.9201C9.14999 19.9201 9.42502 19.8701 9.67502 19.7701C9.96176 19.6595 10.2154 19.4757 10.41 19.2401C10.6198 18.9822 10.7752 18.6848 10.865 18.3651C10.9548 18.0454 10.9769 17.7104 10.93 17.3801C10.8697 17.0297 10.7281 16.6977 10.515 16.4101C10.3041 16.144 10.0313 15.9355 9.71999 15.8101C9.48254 15.713 9.22981 15.6599 8.97399 15.6538C8.71817 15.6477 8.46364 15.6888 8.22086 15.7742C7.97809 15.8596 7.75195 15.9878 7.55494 16.1522C7.35794 16.3166 7.19326 16.5143 7.06999 16.7351C6.94671 16.9558 6.86692 17.1957 6.83504 17.444C6.80315 17.6922 6.81973 17.9443 6.88374 18.1864C6.94775 18.4284 7.05796 18.6561 7.20806 18.8562C7.35816 19.0563 7.54584 19.2253 7.76123 19.3542C7.97662 19.4831 8.21614 19.5693 8.46599 19.6082C8.71584 19.6471 8.97114 19.6379 9.21691 19.5812C9.46267 19.5244 9.69617 19.4212 9.90445 19.2769C10.1127 19.1326 10.2923 18.9498 10.435 18.7401C10.5776 18.5303 10.6809 18.2975 10.74 18.0501L10.38 17.9601C10.326 18.1695 10.224 18.3632 10.0821 18.5295C9.94021 18.6958 9.76143 18.8308 9.55795 18.9251C9.35447 19.0194 9.13084 19.0708 8.90443 19.0758C8.67802 19.0808 8.45269 19.0391 8.24519 18.9538C8.03769 18.8685 7.85295 18.7417 7.70353 18.5819C7.55411 18.4221 7.44321 18.2328 7.37908 18.0276C7.31495 17.8225 7.297 17.6064 7.32645 17.3931C7.3559 17.1798 7.43212 16.974 7.54999 16.7901C7.65872 16.6111 7.8035 16.4584 7.97533 16.3422C8.14717 16.2261 8.3417 16.1493 8.54667 16.1171C8.75164 16.0849 8.96143 16.0981 9.16112 16.1557C9.36081 16.2134 9.54542 16.3141 9.70303 16.4501C9.84823 16.5887 9.96246 16.7549 10.04 16.9401C10.1244 17.1409 10.1608 17.3579 10.1464 17.5746C10.132 17.7913 10.0673 18.0013 9.95614 18.189C9.84493 18.3767 9.69155 18.5369 9.50811 18.6562C9.32467 18.7756 9.11627 18.8509 8.89999 18.8751C8.69524 18.8757 8.49224 18.8392 8.30176 18.7673C8.11127 18.6955 7.93687 18.5897 7.78599 18.4551C7.65332 18.3372 7.53983 18.2001 7.44999 18.0481L7.13999 18.1581C7.23186 18.3534 7.36342 18.5268 7.52531 18.6672C7.6872 18.8075 7.87612 18.9116 8.07999 18.9731C8.33678 19.0589 8.60822 19.0903 8.87999 19.0651V19.9201Z" fill="#E94A35"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation arrows */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20 px-4">
              <button 
                onClick={goToPrevSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 pointer-events-auto"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={goToNextSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 pointer-events-auto"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Dot navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-10 h-2 bg-[#DDF695] rounded-full' 
                    : 'w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}