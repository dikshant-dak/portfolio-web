import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: `${personalInfo.name} is a ${personalInfo.title} specializing in React 19, Next.js 16, TypeScript, Node.js, Fastify, GraphQL, PostgreSQL, Apache Kafka, Supabase, AWS, Google Cloud Platform, and Agentic AI/RAG.`,
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer",
    "Dikshant Dak",
    "System Architect",
    "SaaS Developer",
    "Kafka Engineer"
  ],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.valueProp,
    url: "https://dikshantdak.com", // update with user's domain later
    siteName: `${personalInfo.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.valueProp,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich Structured JSON-LD Data for SEO indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "jobTitle": personalInfo.title,
    "url": "https://dikshantdak.com",
    "email": personalInfo.email,
    "telephone": personalInfo.phone,
    "sameAs": [
      personalInfo.github,
      personalInfo.linkedin
    ],
    "description": personalInfo.valueProp,
    "knowsAbout": [
      "Software Engineering",
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Fastify",
      "GraphQL",
      "PostgreSQL",
      "Apache Kafka",
      "AWS",
      "Google Cloud Platform",
      "RAG Systems",
      "Agentic AI"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased bg-background text-foreground`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-transparent text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
