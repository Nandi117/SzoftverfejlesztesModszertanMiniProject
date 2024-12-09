import {Badge, Box, Button, Flex, Spacer, Text} from "@chakra-ui/react";
import {menuItems} from "../../config/menu.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {closeDrawer} from "../../store/drawer/drawer.slice.ts";
import {Logo} from "../Logo/Logo.tsx";

export const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenuItemClick = (route: string) => {
        navigate(route);
        dispatch(closeDrawer());
    };

    return (
        <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
            <Flex alignItems={"center"} width={"100%"} justifyContent={"space-around"} py={4}>
                <Logo/>
                <Text fontSize={14}>Where words find their wings.</Text>
            </Flex>
            <hr/>
            {menuItems.map((menuItem) => {
                return (
                    <Box key={menuItem.id} width={"100%"} pt={2}>
                        <Button width={"100%"} onClick={() => handleMenuItemClick(menuItem.route)}>
                            {menuItem.displayText}
                        </Button>
                    </Box>
                );
            })}
            <Spacer />
            <Box>
                <Badge>v1.0.2</Badge>
                <Button width={"100%"} colorScheme={"teal"} onClick={() => handleMenuItemClick("/version-information")}>
                    Version information
                </Button>

            </Box>
        </Flex>
    );
};