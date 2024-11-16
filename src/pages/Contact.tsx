import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import pagesData from "@/data/pages.json";

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setContent(pagesData.contact.content);
      setIsLoading(false);
    }, 1000);
  }, []);

  const onSubmit = (data: ContactFormData) => {
    // Simulate form submission
    console.log(data);
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28">
        <div className="luxury-container py-12">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-[200px]" />
              <Skeleton className="h-64" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Content and Form */}
              <div className="space-y-8">
                <article className="prose prose-lg max-w-none">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </article>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-serif mb-6">Send us a Message</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                      )}
                    </div>
                    
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="w-full"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                      )}
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        {...register("message", { required: "Message is required" })}
                        className="w-full min-h-[150px]"
                      />
                      {errors.message && (
                        <span className="text-red-500 text-sm">{errors.message.message}</span>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Right Column - Map and Contact Details */}
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-serif mb-4">Visit Our Store</h3>
                  <div className="space-y-2 text-luxury-charcoal/80">
                    <p>{pagesData.contact.address}</p>
                    <p>Phone: {pagesData.contact.phone}</p>
                    <p>Email: {pagesData.contact.support_email}</p>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden shadow-md">
                  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={14}
                    >
                      <Marker position={center} />
                    </GoogleMap>
                  </LoadScript>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-serif mb-4">Business Hours</h3>
                  <div className="space-y-2 text-luxury-charcoal/80">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;