import { ImageResponse } from 'next/og';
import { projects, personalInfo } from '@/data/portfolioData';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#020408',
            color: '#f8fafc',
            fontFamily: 'sans-serif',
          }}
        >
          <h1>Project Blueprint Not Found</h1>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0) 50%), linear-gradient(to bottom right, #090d16, #020408)',
          fontFamily: 'sans-serif',
          color: '#f8fafc',
          padding: '60px 80px',
          boxSizing: 'border-box',
          border: '12px solid #0f172a',
          position: 'relative',
        }}
      >
        {/* Dynamic Project Details Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#94a3b8', letterSpacing: '1px' }}>
              {personalInfo.name}
            </span>
            <span style={{ fontSize: '18px', color: '#475569' }}>/</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#34d399', letterSpacing: '1px' }}>
              PROJECTS
            </span>
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #1e293b',
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#94a3b8',
              letterSpacing: '0.5px',
            }}
          >
            CASE STUDY
          </div>
        </div>

        {/* Project Meta Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#10b981', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {project.role}
          </span>
          <h1
            style={{
              fontSize: '68px',
              fontWeight: 800,
              margin: 0,
              padding: 0,
              letterSpacing: '-1.5px',
              color: '#ffffff',
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#94a3b8',
              maxWidth: '920px',
              margin: 0,
              padding: 0,
              marginTop: '6px',
            }}
          >
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {project.technologies.slice(0, 6).map((tech, idx) => (
              <div
                key={idx}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
            {project.technologies.length > 6 && (
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  border: '1px solid #1e293b',
                  color: '#64748b',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                +{project.technologies.length - 6} more
              </div>
            )}
          </div>
        </div>

        {/* Footer Link Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid #1e293b',
            paddingTop: '30px',
            marginTop: '20px',
          }}
        >
          <span style={{ fontSize: '15px', color: '#475569', fontWeight: 500 }}>
            Architecture Blueprint & Metrics Details
          </span>
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>
            dikshantdak-portfolio.vercel.app/projects/{project.slug}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
