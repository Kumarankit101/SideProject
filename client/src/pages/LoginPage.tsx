import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { H2, Paragraph, Logo } from "@/components/ui/typography";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

export default function LoginPage() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate login for demo
    setTimeout(() => {
      setIsLoading(false);
      
      // Check hardcoded credentials
      if ((data.username === "alexchen" || 
           data.username === "mjohnson" || 
           data.username === "ppatel") && 
          data.password === "password123") {
        toast({
          title: "Login successful",
          description: "Welcome back to SideProject.com",
        });
        setLocation("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try: alexchen/password123, mjohnson/password123, or ppatel/password123",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="py-16 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <H2>Welcome Back</H2>
          <Paragraph>Sign in to your SideProject.com account</Paragraph>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <h3 className="text-lg font-medium">Sign In</h3>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t p-6">
            <div className="text-center">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
                  onClick={() => setLocation("/register")}
                >
                  Sign up
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
        
        <div className="max-w-md mx-auto mt-8 text-center">
          <p className="text-xs text-gray-500">
            Note: Use one of the following demo accounts:<br />
            alexchen/password123, mjohnson/password123, or ppatel/password123
          </p>
        </div>
      </div>
    </div>
  );
}
