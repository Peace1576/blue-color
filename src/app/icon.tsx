import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: '#f97316',
            fontFamily: 'sans-serif',
            lineHeight: 1,
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size }
  );
}
