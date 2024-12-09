import {Button, Flex, FormControl, FormLabel, Heading, Input, Select, Box, Stack, Text, Toast} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import {CheckIcon} from "@chakra-ui/icons";
import {useNewBlogPost} from "./hooks/useNewBlogPost.ts";
import "./NewBlogPost.css";

export const gradients:any = [
    {
        key: "oceanBreeze",
        displayName: "Ocean Breeze",
        value: "linear-gradient(135deg, #a2d9ff, #79c8ff, #4fb8ff, #1aa8ff)"
    },
    {
        key: "sunsetGlow",
        displayName: "Sunset Glow",
        value: "linear-gradient(135deg, #ff9a8b, #ff6f61, #ff3d3d, #ff1a1a)"
    },
    {
        key: "forestWhisper",
        displayName: "Forest Whisper",
        value: "linear-gradient(135deg, #a3d39c, #8cbc85, #70a270, #558857)"
    },
    {
        key: "lavenderDream",
        displayName: "Lavender Dream",
        value: "linear-gradient(135deg, #e0b0ff, #c898ff, #af81ff, #956aff)"
    },
    {
        key: "desertDunes",
        displayName: "Desert Dunes",
        value: "linear-gradient(135deg, #ffc77d, #ffb265, #ff9d4c, #ff8828)"
    },
    {
        key: "iceCrystal",
        displayName: "Ice Crystal",
        value: "linear-gradient(135deg, #ccefff, #b2e3ff, #97d8ff, #79c8ff)"
    },
    {
        key: "amberTwilight",
        displayName: "Amber Twilight",
        value: "linear-gradient(135deg, #ffdb8b, #ffc96a, #ffb448, #ff9d1f)"
    },
    {
        key: "midnightSky",
        displayName: "Midnight Sky",
        value: "linear-gradient(135deg, #4b79a1, #355c85, #1f4169, #0b284e)"
    }
];

const NewBlogPost = () => {


    const {
        saveNewPost,
        loading,
        titleRef,
        quillEditorRef,
        fileUploaderRef,
        backgroundTemplate,
        setBackroundTemplate
    } = useNewBlogPost();

    return <>
        <Flex flexDirection={"column"} alignItems={"center"} mx={"auto"} width={"50%"} mt={"5vh"}>

            <Heading as={"h5"}>New Post</Heading>
            <FormControl>
                <Input type='text' data-testid={"post-title"} ref={titleRef} placeholder={"Enter title"}/>
            </FormControl>

            <ReactQuill data-testid={"post-content"} ref={quillEditorRef} theme="snow" style={{height:600, marginTop:"1em", width:"100%"}}/>

            <Text alignSelf={"start"} fontWeight={"medium"} mt={20} >Select background template</Text>
            <Flex width={"100%"} height={200} justifyContent={"start"} gap={4} mt={2} wrap={"wrap"}>

                {
                    gradients.map((e:any)=>{

                        return <Stack key={e.key} alignItems={"center"} className={`background-template-wrapper ${e.key === backgroundTemplate ? "active" : ""}`} onClick={()=>setBackroundTemplate(e.key)}>
                            <Box className={"background-template"} background={e.value} width={40} height={20} borderRadius={"0.4em"}/>
                            <Text className={"bg-template-text"}>{e.displayName}</Text>
                        </Stack>
                    })
                }
            </Flex>

            <Button data-testid={"save-post-btn"}  isLoading={loading}  loadingText='Submitting' alignSelf={"end"} rightIcon={<CheckIcon/>} colorScheme={"teal"} onClick={saveNewPost}>Save</Button>

        </Flex>
    </>

}


export default NewBlogPost;