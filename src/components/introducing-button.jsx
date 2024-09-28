import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@components/ui/animated-gradient-text.jsx";

export function IntroducingButton() {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center">
      <AnimatedGradientText>
        
        
          Start Learning

        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </div>
  );
}
