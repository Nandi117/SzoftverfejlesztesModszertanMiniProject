import { Flex } from "@chakra-ui/react";
import { AllPostsHeader } from "../AllPostsHeader/AllPostsHeader.tsx";
import { AllPostsBody } from "../AllPostsBody/AllPostsBody.tsx";

export const AllPostsWrapper = () => {
    return (
        <Flex flexDirection={"column"} align={"center"} width={"100%"} mt={"5vh"}>
            <AllPostsHeader />
            <AllPostsBody />
        </Flex>
    );
};