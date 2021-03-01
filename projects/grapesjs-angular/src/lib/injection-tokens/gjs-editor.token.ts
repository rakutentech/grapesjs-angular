import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_EDITOR = new InjectionToken<grapesjs.Editor>('GJS_EDITOR');
