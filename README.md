# GrapesJS Angular

GrapesJS Angular is an Angular wrapper around the [GrapesJS](https://grapesjs.com/) library, it allows to instantiate an Angular component containing the GrapesJS editor, as well as all of its managers accessible as Angular Injectables.

## Table of contents

- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Usage](#usage)
- [License](#license)

## Prerequisites

- [Angular](https://angular.io/) (> 9.0.0)
- [GrapesJS](https://grapesjs.com/)

## Installation

- Install GrapesJS Angular:

```bash
npm install @rakutentech/grapesjs-angular
```

- Install GrapesJS as a dependency:

```bash
npm install grapesjs
```

- Install Angular Dynamic Component Loader as a dependency:

```bash
npm install @rakutentech/angular-dynamic-component-loader
```

- Add GrapesJS styles and script in the `angular.json` file of your app:

```json
"styles": ["./node_modules/grapesjs/dist/css/grapes.min.css"],
"scripts": ["./node_modules/grapesjs/dist/grapes.min.js"]
```

- Create a new Angular component to load the GrapesJS Editor into:

```bash
ng generate component editor
```

## Usage

To use GrapesJS Angular, you first need the following:

- A DOM [Projection](https://angular.io/guide/lifecycle-hooks#responding-to-projected-content-changes) slot to load your Angular Component containing the Editor, eg:

```typescript
@ViewChild('editor', { read: ViewContainerRef, static: true }) editorContainer;
```

```html
<ng-container #editor></ng-container>
```

- Your Angular Component to load the Editor into. All it needs is also a projection slot in its template, indicating where to load the GrapesJS Editor. This projection slot must be named `grapesJsEditorContainer`, eg:

```typescript
@ViewChild('grapesJsEditorContainer', { read: ViewContainerRef, static: true }) grapesJsEditorContainer;
```

```html
<!-- You may have other stuff around the projection slot to define custom panels, etc ... -->
<div class="panel-properties">
  <div class="panel-properties-header gjs-bg-one gjs-two-color">
    <i class="icon-styles-panel"></i>
    <p>Styles</p>
  </div>
  <div class="panel-properties-list">
    <div class="panel-properties-trait"></div>
    <div class="panel-properties-selector"></div>
    <div class="panel-properties-style"></div>
  </div>
</div>
<div #grapesJsEditorContainer></div>
```

You're now ready to load your Angular Component containing GrapesJS' editor !

This is done by calling the `loadEditorIntoComponent` method of the `GrapesjsAngularService`, which first needs to be injected.

```typescript
// ...

constructor(
  private readonly grapesjsAngularService: GrapesjsAngularService,
  // ...
) {}

ngOnInit() {
  // ...
  this.grapesJsAngularService.loadEditorIntoComponent(config, EditorComponent, this.editorContainer);
}
```

It takes three arguments:

- The [GrapesJS configuration object](https://github.com/artf/grapesjs/blob/master/src/editor/config/config.js). (Note that the `container` & `autorender` keys will be ignored)
- The class name of the component to load the editor into (which contains the `grapesJsEditorContainer` projection slot as seen previously)
- The projection slot to load it into

Your Angular Component is now loaded with the GrapesJS Editor ! It can also Inject the following tokens (which are provided _locally_ (see below)):

- `GJS_EDITOR`: the [GrapesJS Editor](https://grapesjs.com/docs/api/editor.html) object
- `GJS_MODAL`: the [GrapesJS Modal](https://grapesjs.com/docs/api/modal_dialog.html) object
- `GJS_COMMANDS`: the [GrapesJS Commands](https://grapesjs.com/docs/api/commands.html) object
- `GJS_CODE_MANAGER`: the GrapesJS Code Manager object
- `GJS_DOM_COMPONENTS`: the [GrapesJS DOM Components](https://grapesjs.com/docs/api/components.html) object
- `GJS_ASSET_MANAGER`: the [GrapesJS Asset Manager](https://grapesjs.com/docs/api/assets.html) object
- `GJS_PANELS`: the [GrapesJS Panels](https://grapesjs.com/docs/api/panels.html#panels) object
- `GJS_CSS_COMPOSER`: the [GrapesJS CSS Composer](https://grapesjs.com/docs/api/css_composer.html) object
- `GJS_CONFIG`: the [GrapesJS Config](https://github.com/artf/grapesjs/blob/master/src/editor/config/config.js) object
- `GJS_BLOCK_MANAGER`: the [GrapesJS Block Manager](https://grapesjs.com/docs/api/block_manager.html) object
- `GJS_STORAGE_MANAGER`: the [GrapesJS Storage Manager](https://grapesjs.com/docs/api/storage_manager.html) object
- `GJS_UNDO_MANAGER`: the [GrapesJS Undo Manager](https://grapesjs.com/docs/api/undo_manager.html) object
- `GJS_STYLE_MANAGER`: the [GrapesJS Style Manager](https://grapesjs.com/docs/api/style_manager.html) object

_Since multiple instances of the GrapesJS Editor can be loaded, each with its own instances of the above providers, please note that these Injection tokens are only available within the scope of the component & its children. If you need to inject them as dependencies to other services, these would also need to be provided locally with dependencies, eg:_

```typescript
// ...

@Component({
  // ...
  providers: [{ provide: MyService, useClass: MyService, deps: [GJS_CSS_COMPOSER, GJS_CONFIG] }],
})
```

_For more information: check out [this link](https://angular.io/guide/hierarchical-dependency-injection)_

## License

MIT
