import { ExampleConfigCtrl } from './legacy/config';
import { AppPlugin } from '@grafana/data';
import { PresoAppSettings } from './types';

export { ExampleConfigCtrl as ConfigCtrl };
import { RootPage } from './RootPage';

export const plugin = new AppPlugin<PresoAppSettings>().setRootPage(RootPage);
