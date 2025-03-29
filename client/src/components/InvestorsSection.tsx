import { H2, Paragraph } from "@/components/ui/typography";

export default function InvestorsSection() {
  const investors = [
    "Y Combinator",
    "Sequoia",
    "Andreessen",
    "Google VC",
    "Accel",
    "Techstars"
  ];

  return (
    <section className="py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <H2 className="text-white">Backed By Industry Leaders</H2>
          <Paragraph className="text-neutral-400 max-w-2xl mx-auto">
            Our platform has gained recognition from top investors and companies.
          </Paragraph>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {investors.map((investor, index) => (
            <div key={index} className="flex justify-center">
              <div className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white bg-opacity-20 h-full rounded flex items-center justify-center px-4">
                  <span className="text-white font-montserrat font-bold">{investor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
