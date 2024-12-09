import {Box, Flex, Heading, Input} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";
import {useCallback, useRef} from "react";
import {getApi} from "../../../../config/api.ts";
import {useDispatch} from "react-redux";
import {setAllPosts} from "../../../../store/allPosts/allPostsSlice.ts";

/**
 * AllPostsHeader Component
 *
 * This component is responsible for rendering the header section of the "All Posts" page. It includes a title and a search bar
 * that allows users to search for posts by a keyword. The search functionality fetches filtered posts from the backend based on
 * the search expression entered in the input field.
 *
 * Features:
 * - Displays a search bar that allows users to search for blog posts.
 * - Uses a debounce mechanism to delay the API request by 1.5 seconds after the user stops typing.
 * - Fetches and updates the posts list in the Redux store based on the search query.
 *
 * State:
 * - The search term is controlled through the `searchInputRef` reference.
 *
 * Methods:
 * 1. **searchPosts**:
 *    - A `useCallback` hook that sends an HTTP request to the backend to fetch posts that match the search expression.
 *    - It triggers an API call to the `/blogs/search` endpoint and updates the Redux store with the fetched posts.
 * 2. **onSearchExpValueChange**:
 *    - A handler for input changes that invokes the `searchPosts` method with a delay of 1.5 seconds to optimize the number of API calls.
 *
 * Components:
 * - **Heading**: Displays the title "All posts".
 * - **Input**: The search input field where users can type their query.
 * - **Box** and **Flex**: Chakra UI components to layout and style the header and search bar.
 *
 * Usage:
 * ```tsx
 * <AllPostsHeader />
 * ```
 *
 * Notes:
 * - The search bar triggers a search every time the user types, but the search function is delayed by 1.5 seconds to avoid too many API calls.
 * - The `searchPosts` method updates the Redux store (`setAllPosts`) with the results of the search.
 * - The backend endpoint used for search is `GET /blogs/search`, which expects a query parameter `searchExpression`.
 *
 * Dependencies:
 * - `@chakra-ui/react`: For Box, Flex, Heading, and Input components.
 * - `react-router-dom`: For navigation (although unused here, possibly for future routes).
 * - `react-redux`: For dispatching actions to the Redux store.
 * - `../../config/api.ts`: For API requests through the `getApi` function.
 * - `../../store/allPosts/allPostsSlice.ts`: For dispatching the `setAllPosts` action to update the posts in the Redux store.
 */


export const AllPostsHeader = () =>{


    const navigate = useNavigate();

    const searchInputRef = useRef<HTMLInputElement>(null);
    //const abortControllerRef = useRef<AbortController | null>(null);
    const dispatch = useDispatch();

    const searchPosts = useCallback(async () =>{
        const searchExpression = searchInputRef.current?.value;

        try{
            const response = await getApi().get(`blogs/search?searchExpression=${searchExpression}`);
            dispatch(setAllPosts(response.data));
        }
        catch (e){

        }
    },[]);


    const onSearchExpValueChange = () =>{
        setTimeout(()=>{
            searchPosts();
        }, 1500);
    }


    return  <Box width={"45%"}>
        <Heading as={"h4"} textAlign={"center"}>All posts</Heading>
        <Flex mt={4} gap={2} width={"100%"} flexGrow={"1"}>
            <Input ref={searchInputRef} placeholder={"Search posts..."} onChange={onSearchExpValueChange}/>
        </Flex>
    </Box>


}