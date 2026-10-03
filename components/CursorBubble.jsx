'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function CursorBubble() {
    useEffect(() => {
        const cursorBubble = document.querySelector('.cursor-bubble');
        if (!cursorBubble) return;

        // Only run on fine-pointer devices and when motion is allowed.
        const mqFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        const mqReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        let isHoveringClickable = false;
        let teardown = null;

        const setup = () => {
            if (teardown) return;
            if (!mqFinePointer.matches || mqReducedMotion.matches) return;

            const xTo = gsap.quickTo(cursorBubble, 'x', { duration: 0.5, ease: 'power3' });
            const yTo = gsap.quickTo(cursorBubble, 'y', { duration: 0.5, ease: 'power3' });

            gsap.set(cursorBubble, { rotation: -30 });

            const onMouseMove = (e) => {
                xTo(e.clientX + 13);
                yTo(e.clientY - 43);
            };

            const hideBubble = () => {
                if (isHoveringClickable) {
                    isHoveringClickable = false;
                    gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                    gsap.to(cursorBubble, { opacity: 0, scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
                }
            };

            const onMouseOver = (e) => {
                const targetSelector = '.footer-column h3, .footer-map-link span, .footer-email, .footer-whatsapp, .single-social, .logo-omar, .nav-work-btn';
                const found = e.target.closest(targetSelector);

                if (found && !isHoveringClickable) {
                    isHoveringClickable = true;
                    if (found.matches('.logo-omar')) cursorBubble.textContent = 'to home';
                    else if (found.matches('.nav-work-btn')) cursorBubble.textContent = 'click';
                    else cursorBubble.textContent = 'click';
                    gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                    gsap.to(cursorBubble, { opacity: 1, scale: 1, rotation: 0, duration: 1.7, delay: 0.1, ease: 'elastic.out(1, 0.4)' });
                } else if (!found && isHoveringClickable) {
                    hideBubble();
                }
            };

            window.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseover', onMouseOver);
            document.addEventListener('mouseleave', hideBubble);

            teardown = () => {
                window.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseover', onMouseOver);
                document.removeEventListener('mouseleave', hideBubble);
                gsap.killTweensOf(cursorBubble);
                gsap.set(cursorBubble, { opacity: 0, scale: 0 });
                teardown = null;
            };
        };

        const onChange = () => {
            if (mqFinePointer.matches && !mqReducedMotion.matches) setup();
            else if (teardown) teardown();
        };

        setup();
        mqFinePointer.addEventListener('change', onChange);
        mqReducedMotion.addEventListener('change', onChange);

        return () => {
            if (teardown) teardown();
            mqFinePointer.removeEventListener('change', onChange);
            mqReducedMotion.removeEventListener('change', onChange);
        };
    }, []);

    return <div className="cursor-bubble" aria-hidden="true">click</div>;
}
