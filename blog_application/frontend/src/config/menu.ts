import {routes} from "./routes.ts";



export type MenuItemType = {
    id:number,
    displayText:string,
    route: string
}

export const menuItems:MenuItemType[] = [


    {
        id:1,
        displayText:"All posts",
        route:routes.allPosts.main
    },

    {
        id:2,
        displayText:"Own posts",
        route:routes.ownPosts.main
    },

]