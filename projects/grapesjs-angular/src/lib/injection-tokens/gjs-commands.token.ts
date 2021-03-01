import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_COMMANDS = new InjectionToken<grapesjs.Commands>('GJS_COMMANDS');
