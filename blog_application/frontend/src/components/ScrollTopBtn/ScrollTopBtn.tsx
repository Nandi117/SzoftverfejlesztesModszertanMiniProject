import {IconButton} from "@chakra-ui/react";
import {LucideArrowUp} from "lucide-react";


export const ScrollTopBtn = () =>{


    const handleClick = () =>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }


    return <IconButton colorScheme={"teal"} aria-label="Scroll top" position={"fixed"} bottom={0} right={0} margin={"4em"} borderRadius={"50%"} onClick={handleClick}>
        <LucideArrowUp />
    </IconButton>
}