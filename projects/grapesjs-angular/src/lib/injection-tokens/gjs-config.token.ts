import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_CONFIG = new InjectionToken<grapesjs.Config>('GJS_CONFIG');
