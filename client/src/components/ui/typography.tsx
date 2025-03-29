import { cn } from "@/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn(
      "text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-primary leading-tight",
      className
    )}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(
      "text-3xl font-montserrat font-bold text-primary mb-4",
      className
    )}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn(
      "text-xl font-montserrat font-semibold mb-2",
      className
    )}>
      {children}
    </h3>
  );
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-neutral-700",
      className
    )}>
      {children}
    </p>
  );
}

export function Logo() {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-2">
        <span className="text-white font-bold font-montserrat text-xl">SP</span>
      </div>
      <span className="text-primary font-bold font-montserrat text-xl">
        SideProject<span className="text-[#ccff00]">.com</span>
      </span>
    </div>
  );
}
