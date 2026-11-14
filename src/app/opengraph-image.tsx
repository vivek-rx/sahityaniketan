import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई — Sahitya Niketan Public Library, Ambajogai (Est. 1945)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Devanagari-capable font for the library name
  const fontPath = path.join(process.cwd(), "public/fonts/AMS_Vasudeva.ttf");
  const fontBuffer = await fs.readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4A000E 0%, #800020 55%, #5E0017 100%)",
          color: "#FAF2E8",
          position: "relative",
        }}
      >
        {/* top border flourish */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "linear-gradient(90deg, #E5B869, #FAF2E8, #E5B869)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "linear-gradient(90deg, #E5B869, #FAF2E8, #E5B869)",
          }}
        />

        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: 2,
            display: "flex",
          }}
        >
          साहित्य निकेतन
        </div>
        <div
          style={{
            fontSize: 40,
            marginTop: 18,
            color: "#E5B869",
            display: "flex",
          }}
        >
          सार्वजनिक ग्रंथालय, अंबाजोगाई
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 30,
            color: "rgba(250,242,232,0.85)",
            display: "flex",
            gap: 24,
          }}
        >
          <div style={{ display: "flex" }}>स्थापना १९४५</div>
          <div style={{ display: "flex", color: "#E5B869" }}>।</div>
          <div style={{ display: "flex" }}>३९,९५३ ग्रंथ</div>
          <div style={{ display: "flex", color: "#E5B869" }}>।</div>
          <div style={{ display: "flex" }}>दुर्मीळ हस्तलिखिते</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "vasudeva",
          data: fontBuffer,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
