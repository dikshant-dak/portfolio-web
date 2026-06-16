import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageContent from './PageContent';
import { projects, personalInfo } from '@/data/portfolioData';

export const unstable_instant = {
  prefetch: 'static',
  samples: [
    { params: { slug: 'astro-analysts' } },
    { params: { slug: 'wealth-builders' } },
    { params: { slug: 'skytrek-adventure' } },
    { params: { slug: 'nextinnings' } },
    { params: { slug: 'luxorae-detailing' } },
    { params: { slug: 'cinematic-suite' } },
    { params: { slug: 'youtube-clone' } }
  ]
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} | ${personalInfo.name} Project`;
  const description = `${project.role} for ${project.title}. ${project.description}`;
  const url = `https://dikshantdak-portfolio.vercel.app/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: `${personalInfo.name} Portfolio`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-background text-white flex items-center justify-center font-mono text-sm">
          <div className="flex flex-col items-center gap-3">
            <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Resolving Blueprint Caches...</span>
          </div>
        </div>
      }
    >
      {params.then(({ slug }) => {
        const project = projects.find((p) => p.slug === slug);
        const jsonLd = project
          ? {
              "@context": "https://schema.org" as const,
              "@type": "SoftwareApplication",
              "name": project.title,
              "description": project.description,
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "creator": {
                "@type": "Person",
                "name": personalInfo.name,
                "url": "https://dikshantdak-portfolio.vercel.app"
              },
              "screenshot": project.screenshots ? project.screenshots.map((s) => `https://dikshantdak-portfolio.vercel.app${s}`) : undefined,
            }
          : null;

        return (
          <>
            {jsonLd && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
            )}
            <PageContent slug={slug} />
          </>
        );
      })}
    </Suspense>
  );
}
