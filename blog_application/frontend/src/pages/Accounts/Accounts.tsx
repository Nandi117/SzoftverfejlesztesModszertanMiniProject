import {Badge, Card, Flex, Heading} from "@chakra-ui/react"
import {AccountList} from "./components/AccountList.tsx";
import {SeparatorHorizontal} from "lucide-react";

const Accounts = () =>{



    return <>
        <Flex mx={"auto"} width={"50vh"} alignItems={"center"} flexDirection={"column"} mt={"10vh"}>
            <Card width={"100%"} p={"2em"}>
                <Heading fontSize={24}>Accounts</Heading>

                <hr/>
                <AccountList/>
            </Card>

        </Flex>
    </>
}


export default Accounts;