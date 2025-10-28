"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarIcon, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const blogPosts = [
  {
    title: "10 SEO Strategies That Actually Work in 2025",
    excerpt: "Discover the most effective SEO techniques that are driving real results in today's competitive digital landscape.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Marcus Chen",
    date: "May 15, 2025",
    readTime: "8 min read",
    category: "SEO",
  },
  {
    title: "The Complete Guide to Content Marketing ROI",
    excerpt: "Learn how to measure and maximize the return on investment from your content marketing efforts.",
    image: "https://images.pexels.com/photos/6476805/pexels-photo-6476805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "David Williams",
    date: "May 8, 2025",
    readTime: "12 min read",
    category: "Content",
  },
  {
    title: "Social Media Trends Reshaping Digital Marketing",
    excerpt: "Explore the latest social media trends and how they're transforming the way brands connect with their audiences.",
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Sarah Johnson",
    date: "April 29, 2025",
    readTime: "10 min read",
    category: "Social Media",
  },
]

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="blog" className="py-24 bg-muted/30 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-black">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">
              Latest Marketing Insights
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay ahead of the curve with our latest articles, guides, and industry insights.
            </p>
          </div>
          <Button className="group w-fit" variant="outline">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className={cn(
                "overflow-hidden border-muted/60 transition-all duration-700 transform",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                isInView && `delay-${index * 200}`
              )}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-jakarta mb-3 line-clamp-2">
                  <Link href="#" className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
                <span className="text-sm font-medium">By {post.author}</span>
                <Button variant="ghost" size="sm" className="group">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}