import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'The Great Expanse - Track Every Space Launch';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a1a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(59, 130, 246, 0.1) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 100,
            }}
          >
            🚀
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
            }}
          >
            The Great Expanse
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#a8a29e',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Track every space launch. Free forever, no accounts, no paywalls.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
