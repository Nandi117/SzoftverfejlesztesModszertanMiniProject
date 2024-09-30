import {Box, Button, Flex, Spacer} from "@chakra-ui/react";
import {menuItems} from "../../config/menu.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer} from "../../store/drawer/drawer.slice.ts";


export const Menu = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenuItemClick = (route:string) =>{
        navigate(route);
        dispatch(closeDrawer());
    };

    return <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
        {
            menuItems.map((menuItem)=>{
               return <Box key={menuItem.id} width={"100%"} pt={2}>
                   <Button width={"100%"} onClick={()=>handleMenuItemClick(menuItem.route)}>{menuItem.displayText}</Button>
               </Box>
            })
        }
        <Spacer/>
        <Box>
            <Button width={"100%"} colorScheme={"teal"}>Version information</Button>
        </Box>
    </Flex>;


}