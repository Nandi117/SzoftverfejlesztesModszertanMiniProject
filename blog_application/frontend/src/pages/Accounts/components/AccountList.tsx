import {Badge, Flex, List, Spinner} from "@chakra-ui/react";
import {useAccounts} from "../hooks/useAccounts.ts";
import {AccountListItem} from "./AccountListItem.tsx";


export const AccountList = () => {


    const {loading, accounts} = useAccounts();

    if (loading){
        return <Spinner/>
    }

    return <Flex height={"80vh"} flexDirection={"column"} overflowX={"hidden"}>
        <Flex flexDirection={"column"} gap={4} mt={4}>
            {
                accounts.map((e)=>{
                    return <AccountListItem key={e._id} data={e}/>
                })
            }
        </Flex>
    </Flex>
}