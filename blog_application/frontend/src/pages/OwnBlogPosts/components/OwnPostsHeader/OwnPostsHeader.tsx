
import {Box, Button, Flex, Heading, Input} from '@chakra-ui/react'
import {PlusSquareIcon, SearchIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../config/routes.ts";



export const OwnPostsHeader = () =>{


    const navigate = useNavigate();


    return  <Box width={"50%"}>
        <Heading as={"h4"} textAlign={"center"}>Own posts</Heading>
        <Flex mt={4} gap={2} width={"100%"} flexGrow={"1"}>
            <Input placeholder={"Search posts..."} />
            <Button leftIcon={<SearchIcon/>}>Search</Button>
            <Button leftIcon={<PlusSquareIcon/>} colorScheme={"teal"} onClick={()=>navigate(routes.ownPosts.new)}>New post</Button>
        </Flex>



    </Box>


}