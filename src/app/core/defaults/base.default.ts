import { BaseConfig } from '../models/base.config.model';

export const BaseConfigDefault = <BaseConfig> {
    meta: {
        about: 'Initial JSON-file controls the general Base configuration for the application',
        version: '1.0.0',
        date: '2022-05-14 12:00:00',
        author: 'Qulle'
    },
    showMenu: true,
    headerBackgroundColor: '#333852',
    disableSelections: false,
    disableZoom: false,
    disableContextmenu: false
}