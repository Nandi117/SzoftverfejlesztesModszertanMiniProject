import {Flex} from "@chakra-ui/react";
import {OwnPostsHeader} from "../OwnPostsHeader/OwnPostsHeader.tsx";
import {OwnPostsBody} from "../OwnPostsBody/OwnPostsBody.tsx";


export const OwnPostsWrapper = ()  =>{



    return <Flex flexDirection={"column"} align={"center"} width={"100%"}>
        <OwnPostsHeader/>
        <OwnPostsBody/>
    </Flex>

}