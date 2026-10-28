'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// useLayoutEffect on the client (runs synchronously in React's commit phase,
// before the browser paints) so the shell is never painted with a stale
// transform while the effect attaches.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// The label travels with the pull but only part of the way, so the text lags
// behind the leading edge of the button instead of moving as one solid block.
const LABEL_COUNTER_SCALE = 0.55;

// The scale applied while the pointer is engaged. It matches the
// :focus-visible scale in app/styles/magnetic-cta.css, so a keyboard user and
// a mouse user get the same affordance.
const ENGAGED_SCALE = 1.04;

/**
 * MagneticCTA — a call to action that is pulled towards the cursor.
 *
 * WHY the root is a <span> wrapper and not the control itself: GSAP owns the
 * `transform` on the wrapper while the inner <a>/<button> owns its own
 * hover/focus transform. Splitting the two stops the transforms from
 * overwriting each other, and it keeps the control a plain, tabbable element
 * for keyboards and assistive tech.
 *
 * WHY the pointer listeners are native and not React props: the magnetic
 * behaviour is gated on a fine pointer and on motion being welcome, and that
 * gate has to be resolved in JS before any pointer handling is attached. The
 * media queries are re-checked on change (the same pattern as
 * components/CursorBubble.jsx) so the effect switches off live.
 *
 * WHY the quickTo setters are rebuilt after every spring-back: a quickTo
 * tween and the spring-back tween both write `transform` on the same element,
 * so only one of them may be alive at a time.
 */
export default function MagneticCTA({
    href,
    onClick,
    label,
    download,
    variant = 'ghost',
    className = '',
    icon = null,
    strength = 0.35,
    radius = 120,
    children = null
}) {
    const shellRef = useRef(null);
    const labelRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const shell = shellRef.current;
        const labelEl = labelRef.current;

        if (!shell || !labelEl) return;

        const mqFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        const mqReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        let teardown = null;

        const setup = () => {
            if (teardown) return;
            if (!mqFinePointer.matches || mqReducedMotion.matches) return;

            // quickTo keeps a single tween alive and re-targets it on every
            // call, which is what gives the follow its buttery feel. The
            // scale is driven through scaleX/scaleY because quickTo cannot
            // handle the `scale` shorthand — it splits into two properties and
            // is silently dropped.
            let setters = null;

            const createSetters = () => {
                setters = {
                    x: gsap.quickTo(shell, 'x', { duration: 0.4, ease: 'power3' }),
                    y: gsap.quickTo(shell, 'y', { duration: 0.4, ease: 'power3' }),
                    scaleX: gsap.quickTo(shell, 'scaleX', { duration: 0.4, ease: 'power3' }),
                    scaleY: gsap.quickTo(shell, 'scaleY', { duration: 0.4, ease: 'power3' }),
                    labelX: gsap.quickTo(labelEl, 'x', { duration: 0.55, ease: 'power3' }),
                    labelY: gsap.quickTo(labelEl, 'y', { duration: 0.55, ease: 'power3' })
                };
            };

            const onPointerMove = (e) => {
                if (!setters) {
                    // The spring-back tween still owns the transform: hand over
                    // to a fresh set of quickTo setters so the two never fight.
                    gsap.killTweensOf(shell);
                    gsap.killTweensOf(labelEl);
                    createSetters();
                }

                const rect = shell.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                const distance = Math.hypot(dx, dy);

                // Linear falloff — the pull is strongest at the centre of the
                // magnetic field and fades to nothing `radius` px away from it.
                const falloff = Math.max(0, 1 - distance / radius);
                const pull = strength * falloff;

                setters.x(dx * pull);
                setters.y(dy * pull);
                setters.scaleX(ENGAGED_SCALE);
                setters.scaleY(ENGAGED_SCALE);

                setters.labelX(dx * pull * LABEL_COUNTER_SCALE);
                setters.labelY(dy * pull * LABEL_COUNTER_SCALE);
            };

            const onPointerLeave = () => {
                setters = null;
                gsap.killTweensOf(shell);
                gsap.killTweensOf(labelEl);

                gsap.to(shell, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)' });
                gsap.to(labelEl, { x: 0, y: 0, duration: 0.7, ease: 'back.out(1.6)' });
            };

            shell.addEventListener('pointermove', onPointerMove);
            shell.addEventListener('pointerleave', onPointerLeave);

            teardown = () => {
                shell.removeEventListener('pointermove', onPointerMove);
                shell.removeEventListener('pointerleave', onPointerLeave);
                gsap.killTweensOf(shell);
                gsap.killTweensOf(labelEl);
                gsap.set(shell, { x: 0, y: 0, scale: 1 });
                gsap.set(labelEl, { x: 0, y: 0 });
                setters = null;
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
    }, [strength, radius]);

    const controlClassName = `magnetic-cta__btn magnetic-cta__btn--${variant}`;

    // `download` is forwarded only when it is set — React renders a string
    // attribute, so `download={false}` would become download="false".
    const controlProps = href
        ? { href, download: download || undefined }
        : { type: 'button', onClick };

    const content = (
        <span ref={labelRef} className="magnetic-cta__label">
            {icon}
            <span className="magnetic-cta__text">{label}</span>
            {children}
        </span>
    );

    return (
        <span ref={shellRef} className={`magnetic-cta ${className}`.trim()}>
            {href ? (
                <a className={controlClassName} {...controlProps}>
                    {content}
                </a>
            ) : (
                <button className={controlClassName} {...controlProps}>
                    {content}
                </button>
            )}
        </span>
    );
}
