import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_CODE_MANAGER = new InjectionToken<grapesjs.CodeManager>('GJS_CODE_MANAGER');
