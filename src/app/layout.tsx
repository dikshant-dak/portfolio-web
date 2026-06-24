import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://dikshantdak-portfolio.vercel.app"),
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: `${personalInfo.name} is a ${personalInfo.title} specializing in React 19, Next.js 16, TypeScript, Backend Development, PostgreSQL, Apache Kafka, AWS, Google Cloud Platform, and Agentic AI/RAG.`,
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer",
    "Dikshant Dak",
    "Dikshant Dak Portfolio",
    "Dikshant Dak Developer",
    "Dikshant Dak Senior Full Stack Engineer",
    "System Architect",
    "SaaS Developer",
    "Kafka Engineer",
  ],
  authors: [{ name: personalInfo.name }],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.valueProp,
    url: "https://dikshantdak-portfolio.vercel.app",
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
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich Structured JSON-LD Data for SEO indexing
  const jsonLd = [
    {
      "@context": "https://schema.org" as const,
      "@type": "Person",
      "@id": "https://dikshantdak-portfolio.vercel.app/#person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      url: "https://dikshantdak-portfolio.vercel.app",
      email: personalInfo.email,
      telephone: personalInfo.phone,
      image: "https://dikshantdak-portfolio.vercel.app/icon.png",
      sameAs: [personalInfo.github, personalInfo.linkedin],
      description: personalInfo.valueProp,
      knowsAbout: [
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
        "Agentic AI",
      ],
    },
    {
      "@context": "https://schema.org" as const,
      "@type": "WebSite",
      "@id": "https://dikshantdak-portfolio.vercel.app/#website",
      url: "https://dikshantdak-portfolio.vercel.app",
      name: `${personalInfo.name} Portfolio`,
      description: personalInfo.valueProp,
      publisher: {
        "@id": "https://dikshantdak-portfolio.vercel.app/#person",
      },
    },
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased bg-background text-foreground overflow-x-hidden w-full`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground antialiased overflow-x-hidden w-full"
        style={{ backgroundColor: "#030014" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
