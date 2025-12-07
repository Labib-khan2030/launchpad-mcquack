import { WaitlistButton } from "@/components/WaitlistButton";
import { MatrixRain } from "@/components/MatrixRain";
import { LightningEffect } from "@/components/LightningEffect";
import { MistEffect } from "@/components/MistEffect";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-light tracking-[0.2em]">CORETEX</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Gallery</a>
            <a href="#reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <Button size="sm" className="rounded-full text-xs">
              Get Started <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Matrix Rain Background */}
        <MatrixRain />

        {/* Lightning Effects */}
        <LightningEffect />

        {/* Central Glow Effect */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="w-[800px] h-[600px] bg-gradient-to-t from-cyan-500 via-blue-500 to-transparent rounded-full glow-effect" style={{ bottom: '-200px' }} />
        </div>

        {/* Mist Effect at Bottom */}
        <MistEffect />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-16 max-w-4xl">
            <span className="text-gray-400">Where imagination</span>
            <br />
            <span className="text-gray-400">meets </span>
            <span className="text-gray-300">artificial</span>
            <br />
            <span className="text-white">intelligence</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-20 mb-32">
            <Button
              size="lg"
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 h-12 text-base font-medium border border-blue-500/50"
            >
              Try Coretex
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 text-base border-slate-600 hover:bg-slate-900/50"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              See Demo
            </Button>
          </div>

          {/* Waitlist Counter Here */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <WaitlistButton />
          </div>
        </div>
      </section>

      {/* Demo Section - Images */}
      <section id="gallery" className="container mx-auto px-6 py-24 relative z-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">See it in Action</h2>
            <p className="text-lg text-muted-foreground">
              Beautiful design meets powerful functionality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] hover:border-accent/50 transition-colors">
              <img 
                src="/demos/demo1.gif" 
                alt="Feature Demo 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] hover:border-accent/50 transition-colors">
              <img 
                src="/demos/demo2.gif" 
                alt="Feature Demo 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section - GIFs/Videos */}
      <section className="container mx-auto px-6 py-24 relative z-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">Watch it Work</h2>
            <p className="text-lg text-muted-foreground">
              Live demonstrations of key features
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-video hover:border-accent/50 transition-colors">
              <img 
                src="/demos/demo3.png" 
                alt="Feature Demo 3" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24 relative z-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">
              Built for the modern world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card/50 border border-border/50 rounded-xl p-10 space-y-4 hover:border-accent/50 transition-colors backdrop-blur-sm">
              <h3 className="text-2xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience unparalleled speed and performance in everything you do.
              </p>
            </div>
            <div className="bg-card/50 border border-border/50 rounded-xl p-10 space-y-4 hover:border-accent/50 transition-colors backdrop-blur-sm">
              <h3 className="text-2xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data is protected with enterprise-grade security measures.
              </p>
            </div>
            <div className="bg-card/50 border border-border/50 rounded-xl p-10 space-y-4 hover:border-accent/50 transition-colors backdrop-blur-sm">
              <h3 className="text-2xl font-semibold">Easy to Use</h3>
              <p className="text-muted-foreground leading-relaxed">
                Intuitive interface designed for users of all skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-32 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our community of innovators today
          </p>
          <WaitlistButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 relative z-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">© 2024 Your App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
