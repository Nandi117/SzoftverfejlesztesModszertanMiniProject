import {Box, Card, CardBody, CardFooter, CardHeader, IconButton, Link, Text, Avatar} from "@chakra-ui/react"
import {TimeIcon, ViewOffIcon} from "@chakra-ui/icons";
import "./ActivityCard.css";
import {ActivityType} from "./@types/activity.type.ts";
import {routes} from "../../config/routes.ts";
import {useCallback} from "react";
import {getApi} from "../../config/api.ts";


import { useToast } from "@chakra-ui/react";
import {useSelector} from "react-redux";



const routesForObject:{[key:string]:string} = {
    "BlogPost" : routes.posts,
    "User": ""
}

type ActivityCardProps = {
    data:ActivityType,
    setActivities:any
}
export const ActivityCard = ({data, setActivities}:ActivityCardProps) => {


    const elementRoute = routesForObject[data.referredObjectType]
    const user = useSelector(state=>state.auth.user);

    const toast = useToast();



    const hideActivity = useCallback(async ()=>{
        try{
            const response = await getApi().put("/activities/hide" + `?activityId=${data._id}`)
            const activityId = response.data;
            setActivities((prevState:ActivityType[])=>{
                return prevState.map((e:ActivityType)=>{
                    if (e._id === activityId){
                        return {...e, isActive:false}
                    }
                    return e;
                })
            });

            toast({
                title: "Action completed.",
                description: "Activity is successfully hid.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
            })
        }
        catch (e){
            console.error(e);
        }
    },[]);



    return <Card className={"activity-card"} variant={"elevated"} width={"100%"} mx={2} boxShadow={""}>
        <CardHeader display={"flex"} p={0}>
            {elementRoute ?  <Link href={elementRoute + "/" + data.referredObjectId} color={"blue.200"}>{data.description}</Link> : <Text>{data.description}</Text>}

        </CardHeader>
        <CardBody p={0} pr={10} mt={1}>
            <Text fontSize={12} textAlign={"justify"}>
                {data.referredObjectContent}
            </Text>
            <Box display={"flex"} alignItems={"center"} mt={2} gap={2}>
                <Avatar size={"sm"} name={user?.username}/>
                <Text fontWeight={"medium"}>{data.referredObjectCreatorId?.username}</Text>
            </Box>

        </CardBody>
        <CardFooter p={0} display={"flex"} width={"100%"} alignItems={"center"} gap={2}>
            <TimeIcon/>
            <Text>{new Date(data.createdAt)?.toLocaleDateString()}</Text>

            {
                data.isActive ?    <IconButton
                    justifySelf={"end"}
                    variant={"ghost"}
                    aria-label="Hide activity"
                    colorScheme={"red"}
                    onClick={hideActivity}
                    icon={<ViewOffIcon/>}
                    size={"sm"}
                    title={"Hide activity"}>
                </IconButton> : null
            }

        </CardFooter>
    </Card>


}