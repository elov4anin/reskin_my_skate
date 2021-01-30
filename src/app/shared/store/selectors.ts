import {CoreState} from './core.state';

export const selectStore = (state: CoreState) => state.selectedStore;

export const selectEvent = (state: CoreState) => state.selectedEvent;

export const selectFeatures = (state: CoreState) => state.skateparkFeatures;
