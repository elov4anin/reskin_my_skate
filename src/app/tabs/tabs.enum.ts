export enum TabsEnum {
    SKATEPARKS = 'SKATEPARKS',
    SPOTS = 'SPOTS',
    GAME = 'GAME',
    STORES = 'STORES',
    EVENTS = 'EVENTS',
    // not show in tabs footer
    TEAM = 'TEAM',
}

export const tabsEnum2LabelMapping:  Record<TabsEnum, string> = {
    SKATEPARKS: '',
    SPOTS: '',
    GAME: '',
    STORES: '',
    EVENTS: '',
    TEAM: '',
}

export const tabsEnum2RouteMapping:  Record<TabsEnum, string> = {
    SKATEPARKS: 'skateparks',
    SPOTS: 'spots',
    GAME: 'game',
    STORES: 'stores',
    EVENTS: 'events',
    TEAM: 'team',
}

export const tabsEnum2IconMapping:  Record<TabsEnum, string> = {
    SKATEPARKS: 'search.svg',
    SPOTS: 'spots.svg',
    GAME: 'game.svg',
    STORES: 'store.svg',
    EVENTS: 'events.svg',
    TEAM: '',
}

export const tabsEnum2IconActiveMapping:  Record<TabsEnum, string> = {
    SKATEPARKS: 'search-active.svg',
    SPOTS: 'spots-active.svg',
    GAME: 'game-active.svg',
    STORES: 'store-active.svg',
    EVENTS: 'events-active.svg',
    TEAM: '',
}

export const TABS_MAIN_ROUTE = 'tabs'
