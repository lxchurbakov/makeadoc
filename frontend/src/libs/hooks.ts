import React from 'react';

export const useQuery = (query, deps) => {
    const [value, setValue] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        query().then(setValue).catch(setError).then(() => setLoading(false));
    }, deps);

    return [value, loading, error];
};

export const useForceUpdate = () => {
    const [_, ss] = React.useState(true);
    return React.useCallback(() => ss(v => !v), [ss]);
};

export const useTicker = () => {
    const [data, setData] = React.useState(true);
    const update = React.useCallback(() => {
        setData(d => !d);
    }, [data, setData]);

    return React.useMemo(() => ({ update }), [update]);
};
