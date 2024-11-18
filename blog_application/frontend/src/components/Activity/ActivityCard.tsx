import {Avatar, Box, Card, CardBody, CardFooter, CardHeader, IconButton, Link, Text} from "@chakra-ui/react"
import {TimeIcon, ViewOffIcon} from "@chakra-ui/icons";
import "./ActivityCard.css";
import {ActivityType} from "./@types/activity.type.ts";
import {routes} from "../../config/routes.ts";
import {useCallback} from "react";
import {getApi} from "../../config/api.ts";


const routesForObject:{[key:string]:string} = {
    "BlogPost" : routes.posts,
    "User": ""
}

type ActivityCardProps = {
    data:ActivityType
}
export const ActivityCard = ({data}:ActivityCardProps) => {


    const elementRoute = routesForObject[data.referredObjectType]


    const hideActivity = useCallback(async ()=>{
        try{
            const response = await getApi().put("/activities/hide" + `?activityId=${data._id}`)
            const activityId = response.data;
        }
        catch (e){

        }
    },[]);



    return <Card className={"activity-card"} variant={"elevated"} width={"100%"} mx={2} boxShadow={""}>
        <CardHeader display={"flex"} p={0}>
            <Link href={elementRoute + "/" + data.referredObjectId} color={"blue.200"}>{data.description}</Link>
        </CardHeader>
        <CardBody p={0} pr={10} mt={1}>
            <Text fontSize={12} textAlign={"justify"}>
                {data.referredObjectContent}
            </Text>
            <Box display={"flex"} alignItems={"center"} mt={2} gap={2}>
                <Avatar size={"sm"} src={"https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"}/>
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