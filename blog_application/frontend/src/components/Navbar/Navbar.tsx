import {Avatar, Box, Button, Flex, IconButton, Spacer, useColorMode,} from "@chakra-ui/react";
import {ArrowForwardIcon, HamburgerIcon, MoonIcon, SunIcon, UnlockIcon} from '@chakra-ui/icons';
import {useDispatch} from "react-redux";
import {toggleDrawer} from "../../store/drawer/drawer.slice.ts";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const dispatch = useDispatch();


    const {toggleColorMode, colorMode} = useColorMode()
    const navigate = useNavigate();

    const handleBurgerClick = () => {
        dispatch(toggleDrawer());
    }

    const handleSignInClick = () => {
        navigate("/login");
    }

    const handleSignUpClick = () => {
        navigate("/signup");
    }


    return <Flex p={"4"}>
        <Box>
            <IconButton aria-label={"Toggle menu"} icon={<HamburgerIcon/>} onClick={handleBurgerClick}/>
        </Box>
        <Spacer/>
        <Flex gap={2} width={"300px"}>
            <IconButton aria-label={"Theme change button"} icon={colorMode === "light" ? <SunIcon/> : <MoonIcon/>} variant={"ghost"} onClick={toggleColorMode}/>
            <Button leftIcon={<UnlockIcon/>} colorScheme={"teal"} onClick={handleSignInClick}>Sign In</Button>
            <Button leftIcon={<ArrowForwardIcon/>} colorScheme={"teal"} onClick={handleSignUpClick()} variant='outline'>Sign Up</Button>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
        </Flex>

    </Flex>

}
