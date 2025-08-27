import { useEffect, useRef } from 'react';


export default function InfiniteSentinel({ onHit, disabled }) {
    const ref = useRef(null);
    useEffect(() => {
        if (disabled) return;
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) onHit();
        }, { rootMargin: '300px' });
        io.observe(node);
        return () => io.disconnect();
    }, [onHit, disabled]);
    return <div ref={ref} className="h-8" />;
}