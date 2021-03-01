import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_DOM_COMPONENTS = new InjectionToken<grapesjs.DomComponents>('GJS_DOM_COMPONENTS');
