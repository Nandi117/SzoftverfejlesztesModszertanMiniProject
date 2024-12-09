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
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import {CalendarIcon} from "@chakra-ui/icons";
import {ActivityCard} from "./ActivityCard.tsx";
import {useActivities} from "./hooks/useActivities.ts";
import {ActivityType} from "./@types/activity.type.ts";

/**
 * Activity Component
 *
 * This component displays a user's activity in a popover. It uses Chakra UI for styling and 
 * interactivity and integrates with the `useActivities` hook to fetch and manage activity data.
 *
 * Features:
 * - Popover to show activities with a trigger button.
 * - Filter options to view activities based on time periods (All, Today, 1 Week, 1 Month).
 * - Tabs to separate unhidden and hidden activities.
 * - Spinner to indicate loading state while fetching activities.
 * - Displays activity details using the `ActivityCard` component.
 *
 * Dependencies:
 * - `useActivities` hook for managing activity state and fetching data.
 * - `ActivityCard` component for rendering individual activity items.
 * - Chakra UI components for layout, styling, and interactivity.
 *
 * Usage:
 * - This component is designed to be used wherever activity tracking or management is needed
 *   within an application.
 *
 * Behavior:
 * - On opening the popover, the `getActivities` function is called to fetch activity data.
 * - Activities are filtered into two categories: hidden (`!isActive`) and unhidden (`isActive`).
 * - The user can filter activities by time period using the dropdown (`Select`).
 * - Activities are displayed in a scrollable `Flex` container with a tabbed interface.
 *
 * Structure:
 * - Popover:
 *   - Trigger: Button with "Activity" text and `CalendarIcon`.
 *   - Content:
 *     - Header: Displays a title with an icon.
 *     - Body: Displays either a loading spinner or the filtered activity content.
 * - Tabs:
 *   - Unhidden Tab: Lists all unhidden activities.
 *   - Hidden Tab: Lists all hidden activities.
 *
 * Props:
 * - None. Data and behavior are managed via the `useActivities` hook.
 */
export const Activity = () => {

    const {
        getActivities,
        loading,
        activities,
        setActivities,
        filteredRecords,
        setFilter
    } = useActivities();


    const hidden = filteredRecords.filter((x: ActivityType) => !x.isActive);
    const unhidden = filteredRecords.filter((x: ActivityType) => x.isActive);

    console.log(filteredRecords)

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
                    <Select placeholder='How many do you like to see?' onChange={(e) => setFilter(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='today'>Today</option>
                        <option value='week'>1 Week</option>
                        <option value="month">1 Month</option>
                    </Select>

                    <Tabs width={"100%"} mt={2}>
                        <TabList>
                            <Tab>Unhidden</Tab>
                            <Tab>Hidden</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Flex mt={4} flexDirection={"column"} py={2} maxHeight={"80vh"} overflowX={"hidden"}
                                      gap={6}>
                                    {unhidden.map((e: ActivityType) => {
                                        return <ActivityCard key={e._id} data={e} setActivities={setActivities}/>
                                    })}
                                </Flex>
                            </TabPanel>
                            <TabPanel>
                                <Flex mt={4} flexDirection={"column"} py={2} maxHeight={"80vh"} overflowX={"hidden"}
                                      gap={6}>
                                    {hidden.map((e: ActivityType) => {
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