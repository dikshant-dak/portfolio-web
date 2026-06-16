import { ImageResponse } from 'next/og';
import { personalInfo } from '@/data/portfolioData';

export const runtime = 'edge';
export const contentType = 'image/png';
export const alt = 'Dikshant Dak | Senior Full Stack Engineer';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0) 60%), linear-gradient(to bottom right, #090d16, #020408)',
          fontFamily: 'sans-serif',
          color: '#f8fafc',
          padding: '60px 80px',
          boxSizing: 'border-box',
          border: '12px solid #0f172a',
          position: 'relative',
        }}
      >
        {/* Abstract Accent Lines */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            opacity: 0.15,
            borderBottomLeftRadius: '100%',
            border: '2px dashed #10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '100%',
              border: '2px solid #10b981',
            }}
          />
        </div>

        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                background: 'linear-gradient(135deg, #34d399, #10b981)',
              }}
            />
            <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px', color: '#10b981' }}>
              PORTFOLIO
            </span>
          </div>
          {/* Availability Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ fontSize: '14px', color: '#34d399', fontWeight: 600, letterSpacing: '0.5px' }}>
              {personalInfo.availability}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 800,
              margin: 0,
              padding: 0,
              letterSpacing: '-2px',
              color: '#ffffff',
            }}
          >
            {personalInfo.name}
          </h1>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 600,
              color: '#cbd5e1',
              margin: 0,
              padding: 0,
              marginTop: '-8px',
            }}
          >
            {personalInfo.title}
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#94a3b8',
              maxWidth: '850px',
              margin: 0,
              padding: 0,
              marginTop: '8px',
            }}
          >
            {personalInfo.valueProp}
          </p>
        </div>

        {/* Footer Row */}
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
          {/* Social / Contact Links */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '16px', color: '#64748b' }}>
            <span>github.com/dikshant-dak</span>
            <span>•</span>
            <span>linkedin.com/in/dikshant-dak</span>
          </div>
          {/* Live Link */}
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>
            dikshantdak-portfolio.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
