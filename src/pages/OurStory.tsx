import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import pagesData from "@/data/pages.json";

const OurStory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setContent(pagesData.our_story.content);
      setIsLoading(false);
    }, 1000);
  }, []);

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
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurStory;