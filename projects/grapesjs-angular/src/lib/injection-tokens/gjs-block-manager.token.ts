import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_BLOCK_MANAGER = new InjectionToken<grapesjs.BlockManager>('GJS_BLOCK_MANAGER');
