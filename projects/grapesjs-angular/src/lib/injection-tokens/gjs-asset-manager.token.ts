import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_ASSET_MANAGER = new InjectionToken<grapesjs.AssetManager>('GJS_ASSET_MANAGER');
