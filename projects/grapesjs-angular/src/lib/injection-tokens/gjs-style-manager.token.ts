import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_STYLE_MANAGER = new InjectionToken<grapesjs.StyleManager>('GJS_STYLE_MANAGER');
