import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check } from "lucide-react";

interface WaitlistFormProps {
  onSuccess: () => void;
}

export const WaitlistForm = ({ onSuccess }: WaitlistFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both username and email.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ username: username.trim(), email: email.trim() }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            variant: "destructive",
            title: "Already registered",
            description: "This email is already on the waitlist!",
          });
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast({
          title: "Welcome aboard! 🎉",
          description: "You've successfully joined the waitlist.",
        });
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-card border-border text-foreground"
        disabled={isLoading || isSuccess}
      />
      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-card border-border text-foreground"
        disabled={isLoading || isSuccess}
      />
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        disabled={isLoading || isSuccess}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining...
          </>
        ) : isSuccess ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Joined!
          </>
        ) : (
          "Join Waitlist"
        )}
      </Button>
    </form>
  );
};
