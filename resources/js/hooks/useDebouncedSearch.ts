// import { useCallback, useEffect, useState } from 'react';
// import { debounce, pickBy } from 'lodash';
// import { router } from '@inertiajs/react';
// import usePrevious from "@/hooks/usePrevious.js";

// const useDebouncedSearch = (url, initialParams, initialTimeDebounce = 50) => {
//     const [params, setParams] = useState(initialParams);
//     const [timeDebounce, setTimeDebounce] = useState(initialTimeDebounce);
//     const prevParams = usePrevious(params);

//     const search = useCallback(
//         debounce((params) => {
//             router.get(url, pickBy(params), {
//                 replace: true,
//                 preserveScroll: true,
//                 preserveState: true,
//                 queryStringArrayFormat: 'indices',
//             });
//         }, timeDebounce),
//         [timeDebounce]
//     );

//     useEffect(() => {
//         if (prevParams) {
//             search(params);
//         }
//     }, [params]);

//     return { params, setParams, setTimeDebounce };
// };

// export default useDebouncedSearch;






// import { useCallback, useEffect, useState } from 'react';
// import { debounce, pickBy } from 'lodash';
// import { router } from '@inertiajs/react';
// import usePrevious from "@/hooks/usePrevious";

// interface Params {
//     [key: string]: any;
// }

// const useDebouncedSearch = (url: string, initialParams: Params, initialTimeDebounce: number = 50) => {
//     const [params, setParams] = useState<Params>(initialParams);
//     const [timeDebounce, setTimeDebounce] = useState<number>(initialTimeDebounce);
//     const prevParams = usePrevious(params);

//     const search = useCallback(
//         debounce((params: Params) => {
//             router.get(url, pickBy(params), {
//                 replace: true,
//                 preserveScroll: true,
//                 preserveState: true,
//                 queryStringArrayFormat: 'indices',
//             });
//         }, timeDebounce),
//         [timeDebounce]
//     );

//     useEffect(() => {
//         if (prevParams) {
//             search(params);
//         }
//     }, [params, search]);

//     return { params, setParams, setTimeDebounce };
// };

// export default useDebouncedSearch;


import { useCallback, useEffect, useState } from 'react';
import { debounce, pickBy } from 'lodash';
import { router } from '@inertiajs/react';
import usePrevious from "@/hooks/usePrevious";

interface Params {
    [key: string]: any;
}

const useDebouncedSearch = (url: string, initialParams: Params, initialTimeDebounce: number = 50) => {
    const [params, setParams] = useState<Params>(initialParams);
    const [timeDebounce, setTimeDebounce] = useState<number>(initialTimeDebounce);
    const prevParams = usePrevious(params);

    // Define the debounced search function
    const search = useCallback(
        debounce((params: Params) => {
            router.get(url, pickBy(params), {
                replace: true,
                preserveScroll: true,
                preserveState: true,
                queryStringArrayFormat: 'indices',
            });
        }, timeDebounce),
        [url, timeDebounce]  // Include 'url' in dependencies if it can change
    );

    useEffect(() => {
        if (prevParams !== undefined && JSON.stringify(prevParams) !== JSON.stringify(params)) {
            search(params);
        }
    }, [params, search, prevParams]);  // Include 'prevParams' in dependencies

    return { params, setParams, setTimeDebounce };
};

export default useDebouncedSearch;
