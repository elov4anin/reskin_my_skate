import {CoreState} from './core.state';

export const selectLoggedIn = (state: CoreState) => state.loggedIn;

export const selectProfile = (state: CoreState) => state.profile;

export const selectEvent = (state: CoreState) => state.selectedEvent;

export const selectFeatures = (state: CoreState) => state.skateparkFeatures;
