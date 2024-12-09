import {Box, Button, Flex, Heading, Input} from '@chakra-ui/react'
import {PlusSquareIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../config/routes.ts";
import {useCallback, useRef} from "react";
import {getApi} from "../../../../config/api.ts";
import {useDispatch} from "react-redux";
import {setOwnPosts} from "../../../../store/ownPosts/ownPostsSlice.ts";


export const OwnPostsHeader = () =>{


    const navigate = useNavigate();

    const searchInputRef = useRef<HTMLInputElement>(null);
    //const abortControllerRef = useRef<AbortController | null>(null);
    const dispatch = useDispatch();

    const searchPosts = useCallback(async () =>{
        const searchExpression = searchInputRef.current?.value;

        try{
            const response = await getApi().get(`blogs/own/search?searchExpression=${searchExpression}`);
            dispatch(setOwnPosts(response.data));
        }
        catch (e){

        }
    },[]);


    const onSearchExpValueChange = () =>{
        setTimeout(()=>{
            searchPosts();
        }, 1500);
    }


    return  <Box width={"30%"}>
        <Heading as={"h4"} textAlign={"center"}>Own posts</Heading>
        <Flex mt={4} gap={2} width={"100%"} flexGrow={"1"}>
            <Input ref={searchInputRef} placeholder={"Search posts..."} onChange={onSearchExpValueChange}/>
            <Button leftIcon={<PlusSquareIcon/>} colorScheme={"teal"} data-testid={"add-post-btn"} onClick={()=>navigate(routes.ownPosts.new)}>New post</Button>
        </Flex>
    </Box>


}