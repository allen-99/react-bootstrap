import {useMemo} from "react";

export const UseSortedPost = (todos, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...todos].sort((a,b) => a[sort].localeCompare(b[sort]));
        }
        return todos;
    }, [sort, todos]);

    return sortedPosts;
}

export const usePosts = (todos, sort, query) => {
    const sortedPosts = UseSortedPost(todos, sort);
    const sortedAndSearchMessage = useMemo(() => {
        return sortedPosts.filter(post => post.header.toLowerCase().includes(query))
    },[query, sortedPosts]);

    console.log(sortedPosts)
    console.log(query)
    return sortedAndSearchMessage;
}