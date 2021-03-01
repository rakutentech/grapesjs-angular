import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_STORAGE_MANAGER = new InjectionToken<grapesjs.StorageManager>('GJS_STORAGE_MANAGER');
