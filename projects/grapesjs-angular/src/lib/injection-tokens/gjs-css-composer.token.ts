import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_CSS_COMPOSER = new InjectionToken<grapesjs.CssComposer>('GJS_CSS_COMPOSER');
