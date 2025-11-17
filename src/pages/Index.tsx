import { WaitlistButton } from "@/components/WaitlistButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Experience the Future
            <br />
            <span className="text-muted-foreground">of Innovation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Transform the way you work with our revolutionary platform.
            Join thousands of early adopters.
          </p>

          <div className="pt-8">
            <WaitlistButton />
          </div>
        </div>
      </section>

      {/* Demo Section - Images */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">See it in Action</h2>
            <p className="text-xl text-muted-foreground">
              Beautiful design meets powerful functionality
            </p>
          </div>

          {/* Placeholder for demo images - users can replace these */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-muted-foreground">
                  Add your demo image here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload via chat or replace in code
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-muted-foreground">
                  Add your demo image here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload via chat or replace in code
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section - GIFs/Videos */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Watch it Work</h2>
            <p className="text-xl text-muted-foreground">
              Live demonstrations of key features
            </p>
          </div>

          {/* Placeholder for demo GIFs/videos */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-muted-foreground">
                  Add your demo GIF or video here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload via chat or embed video URL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">
              Built for the modern world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h3 className="text-2xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Experience unparalleled speed and performance in everything you do.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h3 className="text-2xl font-bold">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security measures.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h3 className="text-2xl font-bold">Easy to Use</h3>
              <p className="text-muted-foreground">
                Intuitive interface designed for users of all skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join our community of innovators today
          </p>
          <WaitlistButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Your App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
