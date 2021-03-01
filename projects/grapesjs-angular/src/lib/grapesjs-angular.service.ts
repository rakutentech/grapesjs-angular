import { Injectable, Injector, Type, ViewContainerRef } from '@angular/core';

import { grapesjs, GrapesEditor } from 'grapesjs';

import { DynamicComponentLoaderService } from '@rakutentech/angular-dynamic-component-loader';

import { GJS_EDITOR } from './injection-tokens/gjs-editor.token';
import { GJS_MODAL } from './injection-tokens/gjs-modal.token';
import { GJS_COMMANDS } from './injection-tokens/gjs-commands.token';
import { GJS_CODE_MANAGER } from './injection-tokens/gjs-code-manager.token';
import { GJS_DOM_COMPONENTS } from './injection-tokens/gjs-dom-components.token';
import { GJS_PANELS } from './injection-tokens/gjs-panels.token';
import { GJS_ASSET_MANAGER } from './injection-tokens/gjs-asset-manager.token';
import { GJS_CSS_COMPOSER } from './injection-tokens/gjs-css-composer.token';
import { GJS_CONFIG } from './injection-tokens/gjs-config.token';
import { GJS_BLOCK_MANAGER } from './injection-tokens/gjs-block-manager.token';
import { GJS_STORAGE_MANAGER } from './injection-tokens/gjs-storage-manager.token';
import { GJS_UNDO_MANAGER } from './injection-tokens/gjs-undo-manager.token';
import { GJS_STYLE_MANAGER } from './injection-tokens/gjs-style-manager.token';

declare const grapesjs: typeof GrapesEditor;

@Injectable({
  providedIn: 'root',
})
export class GrapesjsAngularService {
  private editorInstancesCount = 0;

  constructor(private readonly dynamicComponentLoaderService: DynamicComponentLoaderService) {}

  /**
   * Loads the GrapesJS Editor in the given component dynamically, makes its managers available as Injection tokens to the component-scoped
   * injector.
   *
   * @param config - [the GrapesJS Editor config object](https://github.com/artf/grapesjs/blob/master/src/editor/config/config.js)
   * @param componentType - The class name of the component to load the editor into, it must have a ViewContainerRef slot named
   * `grapesJsEditorContainer`
   * @param viewContainerRef - The ViewContainerRef to load the component into
   */
  loadEditorIntoComponent(config: grapesjs.EditorConfig, componentType: Type<any>, viewContainerRef: ViewContainerRef): void {
    const id = `gjs-editor-${this.editorInstancesCount++}`;

    /**
     * Load the editor in a detached node element first with `autorender: false`, this allows us to access the editor instance
     *  to setup all of the injectables before instantiating the component (which requires those injectables)
     */
    const editorElement = document.createElement('div');
    editorElement.setAttribute('id', id);

    const editorInstance = grapesjs.init({
      ...config,
      container: editorElement,
      autorender: false,
    });
    editorInstance.on('destroy', () => this.editorInstancesCount--);

    // Setup the local component's injector with the GJS injectables & creates the component with it
    const gjsProviders = [
      { provide: GJS_EDITOR, useValue: editorInstance },
      { provide: GJS_MODAL, useValue: editorInstance.Modal },
      { provide: GJS_COMMANDS, useValue: editorInstance.Commands },
      { provide: GJS_CODE_MANAGER, useValue: editorInstance.CodeManager },
      { provide: GJS_DOM_COMPONENTS, useValue: editorInstance.DomComponents },
      { provide: GJS_ASSET_MANAGER, useValue: editorInstance.AssetManager },
      { provide: GJS_PANELS, useValue: editorInstance.Panels },
      { provide: GJS_CSS_COMPOSER, useValue: editorInstance.CssComposer },
      { provide: GJS_CONFIG, useValue: editorInstance.Config },
      { provide: GJS_BLOCK_MANAGER, useValue: editorInstance.BlockManager },
      { provide: GJS_STORAGE_MANAGER, useValue: editorInstance.StorageManager },
      { provide: GJS_UNDO_MANAGER, useValue: editorInstance.UndoManager },
      { provide: GJS_STYLE_MANAGER, useValue: editorInstance.StyleManager },
    ];

    const instanceInjector = Injector.create({ providers: gjsProviders });
    const component = this.dynamicComponentLoaderService.loadComponent(componentType, {}, false, instanceInjector);

    if (!component.instance.hasOwnProperty('grapesJsEditorContainer')) {
      throw new Error(
        `${this.constructor.name}.loadEditorIntoComponent requires the component to load the editor into to have a ViewContainerRef slot
        named 'grapesJsEditorContainer' exposed !`
      );
    }

    // Attach the editor's node to the component in the predefined `gjsEditorContainer` slot & render it into the DOM
    const editorContainer = component.instance.grapesJsEditorContainer.element.nativeElement;
    editorContainer.parentNode.replaceChild(editorElement, editorContainer);
    viewContainerRef.insert(component.hostView);
    editorInstance.render();
  }
}
