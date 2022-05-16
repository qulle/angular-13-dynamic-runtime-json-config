import { MetaConfig } from './meta.model';

export interface BaseConfig {
    meta: MetaConfig,
    showMenu: boolean,
    headerBackgroundColor: string,
    disableSelections: boolean,
    disableZoom: boolean,
    disableContextmenu: boolean
}