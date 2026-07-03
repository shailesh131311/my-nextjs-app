/**
 * useExperiences.js
 *
 * Shared data hook for the Experiences / Occasions section.
 *
 * Usage:
 *   const { experiences, loading, error } = useExperiences();          // all items
 *   const { experiences, loading, error } = useExperiences("std");     // std only
 *   const { experiences, loading, error } = useExperiences("tall");    // tall only
 */

import { useState, useEffect } from "react";
import BASE_URL from "../services/config.js";

const API_EXPERIENCES = `${BASE_URL}/api/experiences/`;

export function useExperiences(layoutFilter = null) {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(API_EXPERIENCES);
                if (!res.ok) throw new Error(`API error: ${res.status}`);

                const json = await res.json();
                const raw = Array.isArray(json) ? json : json.data ?? [];

                // Sort by id ASC — newest additions go to the end
                const sorted = [...raw].sort((a, b) => Number(a.id) - Number(b.id));

                // Apply optional layout filter
                const filtered = layoutFilter
                    ? sorted.filter((item) => item.layout === layoutFilter)
                    : sorted;

                if (!cancelled) setExperiences(filtered);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [layoutFilter]);

    return { experiences, loading, error };
}