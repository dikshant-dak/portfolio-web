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

import { Suspense } from 'react';
import PageContent from './PageContent';

export default async function ProjectPage({
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
      {params.then(({ slug }) => (
        <PageContent slug={slug} />
      ))}
    </Suspense>
  );
}
