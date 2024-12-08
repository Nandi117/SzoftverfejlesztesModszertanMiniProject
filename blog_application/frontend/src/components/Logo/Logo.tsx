import {memo} from "react";
import { Flex} from "@chakra-ui/react";


export const Logo = memo(() =>{



    return <Flex fontWeight={"bold"} textAlign={"center"} alignItems={"center"} justifyContent={"center"} height={"32px"} width={"32px"} borderRadius={"50%"} textShadow={"black"} background={"linear-gradient(45deg, #1488cc, #2b32b2)"}>Blogger</Flex>
});