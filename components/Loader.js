import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function usePageLoader() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 8000);
        return () => clearTimeout(timer);
    }, [router.pathname]);

    return loading;
}

export default function Loader({ visible }) {
    if (!visible) return null;
    return (
        <div className="page-loader">
            <div className="loader-inner">
                <img
                    src="/images/loader.gif"
                    alt="Loading…"
                    className="loader-gif"
                />
            </div>
        </div>
    );
}
