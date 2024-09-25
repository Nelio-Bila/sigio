// const useSorting = (initialParams, setParams) => {
//     const sort = (column) => {
//         setParams((prevParams) => ({
//             ...prevParams,
//             col: column,
//             sort: prevParams.sort ? (prevParams.sort === 'asc' ? 'desc' : 'asc') : 'asc',
//         }));
//     };

//     return { sort };
// };

// export default useSorting;



interface SortParams {
    col?: string;
    sort?: 'asc' | 'desc';
    [key: string]: any;
}

type SetParamsFunction = React.Dispatch<React.SetStateAction<SortParams>>;

const useSorting = (initialParams: SortParams, setParams: SetParamsFunction) => {
    const sort = (column: string) => {
        setParams((prevParams) => ({
            ...prevParams,
            col: column,
            sort: prevParams.sort ? (prevParams.sort === 'asc' ? 'desc' : 'asc') : 'asc',
        }));
    };

    return { sort };
};

export default useSorting;
