// import { useEffect, useState } from 'react';

// export function useMediaQuery(query) {
//     const [value, setValue] = useState(false)

//     useEffect(() => {
//         function onChange(event) {
//             setValue(event.matches)
//         }

//         const result = matchMedia(query)
//         result.addEventListener("change", onChange)
//         setValue(result.matches)

//         return () => result.removeEventListener("change", onChange)
//     }, [query])

//     return value
// }


import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
    const [value, setValue] = useState<boolean>(false);

    useEffect(() => {
        function onChange(event: MediaQueryListEvent): void {
            setValue(event.matches);
        }

        const result: MediaQueryList = window.matchMedia(query);
        result.addEventListener("change", onChange);
        setValue(result.matches);

        return () => result.removeEventListener("change", onChange);
    }, [query]);

    return value;
}
