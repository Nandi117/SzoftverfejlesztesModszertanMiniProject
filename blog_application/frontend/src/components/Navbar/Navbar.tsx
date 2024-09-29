import {Avatar, Box, Button, Flex, IconButton, Spacer, useColorMode,} from "@chakra-ui/react";
import {ArrowForwardIcon, HamburgerIcon, MoonIcon, SunIcon, UnlockIcon} from '@chakra-ui/icons';
import {useDispatch} from "react-redux";
import {toggleDrawer} from "../../store/drawer/drawer.slice.ts";

export const Navbar = () => {

    const dispatch = useDispatch();


    const {toggleColorMode, colorMode} = useColorMode()
    const handleBurgerClick = () => {
        dispatch(toggleDrawer());
    }


    return <Flex p={"4"}>
        <Box>
            <IconButton aria-label={"Toggle menu"} icon={<HamburgerIcon/>} onClick={handleBurgerClick}/>
        </Box>
        <Spacer/>
        <Flex gap={2} width={"300px"}>
            <IconButton aria-label={"Theme change button"} icon={colorMode === "light" ? <SunIcon/> : <MoonIcon/>} variant={"ghost"} onClick={toggleColorMode}/>
            <Button leftIcon={<UnlockIcon/>} colorScheme={"teal"}>Sign In</Button>
            <Button leftIcon={<ArrowForwardIcon/>} colorScheme={"teal"} variant='outline'>Sign Up</Button>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
        </Flex>

    </Flex>

}
