import {
    Button,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Select,
    Spinner, Tab, TabList, TabPanel, TabPanels, Tabs,
    Text
} from "@chakra-ui/react";
import {CalendarIcon} from "@chakra-ui/icons";
import {ActivityCard} from "./ActivityCard.tsx";
import {useActivities} from "./hooks/useActivities.ts";
import {ActivityType} from "./@types/activity.type.ts";


export const Activity = () => {

    const {getActivities, loading, activities, setActivities} = useActivities();


    const hidden = activities.filter((x:ActivityType)=>!x.isActive);
    const unhidden = activities.filter((x:ActivityType)=>x.isActive);

    return <Popover id={"activity-popover"} preventOverflow={true} placement={"left"} onOpen={getActivities}>
        <PopoverTrigger>
            <Button variant={"ghost"} leftIcon={<CalendarIcon/>}>Activity</Button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow/>
            <PopoverCloseButton/>
            <PopoverHeader display={"flex"} alignItems={"center"}><CalendarIcon mr={2}/><Text fontWeight={"bold"}>Your
                activity</Text></PopoverHeader>

            {
                loading ? <Spinner mx={"auto"} my={5}/> : <PopoverBody>
                    <Select placeholder='How many do you like to see?'>
                        <option value='option1'>All</option>
                        <option value='option2'>Today</option>
                        <option value='option3'>1 Week</option>
                        <option value="option4">1 Month</option>
                    </Select>

                    <Tabs width={"100%"} mt={2}>
                        <TabList>
                            <Tab>Unhidden</Tab>
                            <Tab>Hidden</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Flex mt={4} flexDirection={"column"} py={2} maxHeight={"80vh"} overflowX={"hidden"} gap={6}>
                                    {unhidden.map((e:ActivityType) => {
                                        return <ActivityCard key={e._id} data={e} setActivities={setActivities}/>
                                    })}
                                </Flex>
                            </TabPanel>
                            <TabPanel>
                                <Flex mt={4} flexDirection={"column"} py={2} maxHeight={"80vh"} overflowX={"hidden"} gap={6}>
                                    {hidden.map((e:ActivityType) => {
                                        return <ActivityCard key={e._id} data={e} setActivities={setActivities}/>
                                    })}
                                </Flex>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </PopoverBody>


            }

        </PopoverContent>
    </Popover>


}