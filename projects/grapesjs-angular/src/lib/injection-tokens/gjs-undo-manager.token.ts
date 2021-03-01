import { InjectionToken } from '@angular/core';
import { grapesjs } from 'grapesjs';

export const GJS_UNDO_MANAGER = new InjectionToken<grapesjs.UndoManager>('GJS_UNDO_MANAGER');
