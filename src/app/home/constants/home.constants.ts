import { IPopoverButton } from "../models/home.models";

export const CHECKBOX_ID_PREFIX: string = 'checkbox_';

export const POPOVER_BTN_DOWNLOAD_ID = 'download';
export const POPOVER_BTN_WATCH_ID = 'watch';
export const POPOVER_BTN_DETAILS_ID = 'details';

export const POPOVER_BUTTONS: IPopoverButton[] = [{
    text: 'Letöltés',
    id: POPOVER_BTN_DOWNLOAD_ID,
    disabled: false
}, {
    text: 'Megtekintés',
    id: POPOVER_BTN_WATCH_ID,
    disabled: false
}, {
    text: 'Részletek',
    id: POPOVER_BTN_DETAILS_ID,
    disabled: false
}];