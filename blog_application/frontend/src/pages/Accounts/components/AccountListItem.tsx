import {memo} from "react";
import {Avatar, Flex, Text} from "@chakra-ui/react";


type AccountListItemProps = {
    data:any
}
export const AccountListItem = memo(({data}:AccountListItemProps) =>{




    return <Flex gap={2}>
        <Avatar name={data.username}/>
        <Flex flexDirection={"column"}>
            <Text fontWeight={"700"} fontSize={18}>{data.username}</Text>
            <Text>{data.email}</Text>
        </Flex>
    </Flex>
});