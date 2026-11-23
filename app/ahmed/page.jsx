'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';

// What /ahmed actually is
// ----------------------
// A static, self-contained study-plan app (tabs, search, tick-boxes, Arabic/English toggle) generated at
// D:\mybrain\ahmed-track\tools\hub\build-hub.js and copied into public/ahmed/ by sync-portfolio.js.
// It is served inside an iframe on purpose:
//   * it ships ~1.1 MB of inline payload and its own CSS/JS reset — the portfolio's globals would fight it;
//   * its deep links (#library, #roadmap, week anchors) must not disturb the portfolio router;
//   * ticking progress writes to localStorage for this origin, which the iframe shares with the page.
// Not SmoothScroll/Lenis here: wheel events over the iframe belong to the hub's own document.

const HUB_SRC = '/ahmed/index.html';

// The six tabs the hub understands, straight out of its own [data-tab] buttons (build-hub.js emits them).
// A URL like /ahmed#verify is what the start-page banner and any shared link use, and it has to land on
// that tab rather than on "01 ابدأ هنا".
const HUB_TABS = ['start', 'roadmap', 'library', 'documents', 'sources', 'verify'];

export default function AhmedPage() {
    const frame = useRef(null);
    const [ready, setReady] = useState(false);
    // The iframe starts on the plain URL so a no-JS visitor still gets the hub. When the incoming link
    // carries a tab, this state re-points src and the `key` below forces a fresh iframe element whose
    // document boots with the hash already in its URL.
    const [hubSrc, setHubSrc] = useState(HUB_SRC);

    // The hub renders instantly, but telling that apart from a slow first paint is impossible from the
    // outside, so the veil clears on the iframe's load event and a timer covers a blocked/404 file.
    useEffect(() => {
        const bail = setTimeout(() => setReady(true), 3000);
        const tab = () => {
            const raw = (window.location.hash || '').replace('#', '');
            return HUB_TABS.includes(raw) ? raw : null;
        };

        // Decided at mount, and it has to be the *load URL*: the hub picks its tab from its OWN
        // location.hash while booting, so writing the hash into a child that is still booting just gets
        // overwritten by the boot — which is how arriving at /ahmed#sources could leave tab 02 on screen.
        const initial = tab();
        if (initial) setHubSrc(HUB_SRC + '#' + initial);

        return () => clearTimeout(bail);
    }, []);

    // Once the document is up, later hash changes still have to reach it. Writing the child's hash is a
    // same-document navigation — no second 2 MB download — and covers someone moving to /ahmed#library
    // while already on the page.
    useEffect(() => {
        const el = frame.current;
        const passHashDown = () => {
            const raw = (window.location.hash || '').replace('#', '');
            if (!HUB_TABS.includes(raw) || !el || !el.contentWindow) return;
            try {
                el.contentWindow.location.hash = '#' + raw;
            } catch {
                /* detached or blocked: the hub keeps whatever tab it is on */
            }
        };

        el && el.addEventListener('load', passHashDown);
        window.addEventListener('hashchange', passHashDown);
        window.addEventListener('popstate', passHashDown);

        return () => {
            el && el.removeEventListener('load', passHashDown);
            window.removeEventListener('hashchange', passHashDown);
            window.removeEventListener('popstate', passHashDown);
        };
    }, [hubSrc]);

    return (
        <>
            <SvgSymbols />
            <CursorBubble />
            <Navbar />

            <main id="main-content" tabIndex={-1} className="ahmed-page">
                <h1 className="ahmed-offscreen">
                    Ahmed Track: a 26-week Arabic-first industrial automation and IIoT study plan
                </h1>

                <header className="ahmed-head">
                    <p className="ahmed-eyebrow">Ahmed Track · 26 weeks · 572 hours</p>
                    <h2 className="ahmed-title" dir="rtl" lang="ar">
                        خطة أحمد للتدريب والتوظيف — الأتمتة الصناعية و IIoT
                    </h2>
                    <p className="ahmed-sub" dir="rtl" lang="ar">
                        <b>126</b> مصدرًا للتعلّم، منها <b>120</b> بالعربية (<b>95%</b>)، و<b>62</b> أداة ومحاكي —
                        المكتبة كلها <b>194</b> صفاً فيها <b>7</b> صفوف معزولة لا تُفتح. و<b>26</b> أسبوعًا بخطة
                        ساعة بساعة، و<b>سجلّ أدلة</b> لكل رابط. وفيه كمان تبويب جديد اسمه <b>«التحقّق»</b>: كل
                        مهارة في الخطة متقارنة بـ<b>39</b> إعلان وظيفة فتحناه وقرأناه فعلاً — <b>19</b>
                        إعلانًا بيسمّيها والخطة بتدرّسها فعلًا، و<b>33</b> إعلانًا بطلبها والخطة لسه ناقصاها،
                        و<b>169</b> صفاً من <b>194</b> عليه علامة تحقّق. افتح «المكتبة» أو «الأسابيع» وابدأ
                        التأشير — كل علامة تختارها تُحفظ في هذا المتصفح وحده، ولا تُرسل إلى أي مكان.
                    </p>
                    <p className="ahmed-sub">
                        Read it in Arabic, tick as you go, and the evidence ledger shows how each link was
                        checked. A sixth tab, <b>التحقّق / Verify</b>, tests every skill in the plan against
                        <b>39</b> job ads we opened and read: <b>19</b> the ads name that the plan already
                        teaches, <b>33</b> the ads ask for that the plan does not cover yet. Progress is
                        stored in this browser only — nothing is sent anywhere.
                    </p>
                </header>

                <div className="ahmed-framebox">
                    <div className={`ahmed-veil ${ready ? 'ahmed-veil-up' : ''}`} aria-hidden="true">
                        <span className="ahmed-veil-mark">◈</span>
                        <span className="ahmed-veil-text">
                            يفتح ملف أحمد &nbsp;·&nbsp; opening the plan
                        </span>
                    </div>

                    <iframe
                        key={hubSrc}
                        ref={frame}
                        className="ahmed-frame"
                        src={hubSrc}
                        title="خطة أحمد: 26 أسبوعًا للأتمتة الصناعية و IIoT / Ahmed's 26-week automation and IIoT plan"
                        onLoad={() => setReady(true)}
                        allow="fullscreen"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* one line of honest fallback: the hub is a single file, so if the iframe is ever
                    blocked (old browser, strict extension) the printable roadmap is still reachable. */}
                <p className="ahmed-fallback">
                    لا تظهر الخطة؟ افتح{' '}
                    <a className="ahmed-fallback-link" href="/ahmed/roadmap.html" target="_blank" rel="noopener">
                        خريطة الطريق القابلة للطباعة
                    </a>{' '}
                    <span className="ahmed-fallback-en">Plan not showing? Open the printable roadmap.</span>
                </p>
            </main>
        </>
    );
}
