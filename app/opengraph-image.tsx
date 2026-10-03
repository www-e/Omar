import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

// File-based metadata convention: Next generates and serves this as the site's
// og:image / twitter:image, so app/layout.jsx deliberately declares neither.
export const alt = 'Omar Ashraf — Senior Full-Stack Engineer & Tech Solution Architect';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

// Render with the same two faces the site itself loads (app/styles/base.css
// @font-face), so the card looks like the portfolio instead of a generic
// social preview.
//
// These come from fonts/og/, NOT public/fonts/, because satori (the engine
// behind next/og) crashes on the source variable TTFs. scripts/build-og-fonts.py
// pins the axes and subsets to latin, producing the static weights listed here.
// Re-run that script after adding a weight to this design.
// `as const` keeps the weights literal — next/og types FontOptions.weight as a
// union of the CSS numeric weights, so a widened `number` would not type check.
const FONT_FILES = [
    { file: 'DM-Sans-700.ttf', name: 'DM Sans', weight: 700 },
    { file: 'Epilogue-400.ttf', name: 'Epilogue', weight: 400 },
    { file: 'Epilogue-600.ttf', name: 'Epilogue', weight: 600 },
] as const;

function loadFonts() {
    return FONT_FILES.map(({ file, name, weight }) => ({
        name,
        weight,
        data: readFileSync(path.join(process.cwd(), 'fonts', 'og', file)),
    }));
}

const TEXT = { display: 'flex', width: '100%' };

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    padding: 72,
                    backgroundColor: '#f0ebe6',
                    fontFamily: 'Epilogue',
                    color: '#1a1a1a',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: 700,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            padding: '12px 26px',
                            borderRadius: 999,
                            backgroundColor: '#1a1a1a',
                            color: '#f0ebe6',
                            fontSize: 21,
                            fontWeight: 600,
                            letterSpacing: 1.4,
                            textTransform: 'uppercase',
                        }}
                    >
                        Available for opportunities
                    </div>

                    <div
                        style={{
                            ...TEXT,
                            marginTop: 34,
                            fontFamily: 'DM Sans',
                            fontSize: 96,
                            fontWeight: 700,
                            letterSpacing: -3,
                            lineHeight: 1.02,
                        }}
                    >
                        Omar Ashraf
                    </div>

                    <div
                        style={{
                            ...TEXT,
                            marginTop: 18,
                            fontSize: 31,
                            fontWeight: 600,
                            lineHeight: 1.25,
                            color: '#f5693c',
                        }}
                    >
                        Senior Full-Stack Engineer &amp; Tech Solution Architect
                    </div>

                    <div
                        style={{
                            ...TEXT,
                            marginTop: 24,
                            fontSize: 26,
                            lineHeight: 1.55,
                            color: '#6b625c',
                        }}
                    >
                        5+ years architecting scalable web platforms. Next.js, React,
                        Node.js, Python, cloud infrastructure.
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 44,
                            fontSize: 26,
                            fontWeight: 600,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                width: 14,
                                height: 14,
                                borderRadius: 999,
                                backgroundColor: '#f5693c',
                                marginRight: 14,
                            }}
                        />
                        omarashraf.online
                    </div>
                </div>

                {/* Mark echoes app/icon.svg: dark plate, cream ring, orange core. */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 300,
                        height: 300,
                        borderRadius: 66,
                        backgroundColor: '#1a1a1a',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 160,
                            height: 160,
                            borderRadius: 999,
                            border: '34px solid #f0ebe6',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                width: 42,
                                height: 42,
                                borderRadius: 999,
                                backgroundColor: '#f5693c',
                            }}
                        />
                    </div>
                </div>
            </div>
        ),
        { ...size, fonts: loadFonts() }
    );
}
