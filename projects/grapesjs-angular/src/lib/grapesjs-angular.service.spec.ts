import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DynamicComponentLoaderService } from '@rakutentech/angular-dynamic-component-loader';

import { GrapesjsAngularService } from './grapesjs-angular.service';

@Component({
  template: '<div #editor></div>',
})
class FakeComponent {
  @ViewChild('editor', { read: ViewContainerRef, static: true }) testContainer;
}

describe('GrapesjsAngularService', () => {
  let fixture;
  let fakeComponent;
  let fakeContainer;
  let service: GrapesjsAngularService;
  let fakeComponentInstance;

  const fakeEditor = jasmine.createSpyObj(['on', 'render']);

  beforeEach(() => {
    const fakeElement = document.createElement('div');
    fakeContainer = document.createElement('div');
    fakeContainer.appendChild(fakeElement);

    fakeComponentInstance = {
      instance: {
        grapesJsEditorContainer: {
          element: new ElementRef(fakeElement),
        },
      },
    };

    const dynamicComponentLoaderServiceSpy = jasmine.createSpyObj('DynamicComponentLoaderService', ['loadComponent']);
    dynamicComponentLoaderServiceSpy.loadComponent.and.returnValue(fakeComponentInstance);

    TestBed.configureTestingModule({
      declarations: [FakeComponent],
      providers: [
        {
          provide: DynamicComponentLoaderService,
          useValue: dynamicComponentLoaderServiceSpy,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(GrapesjsAngularService);
    fixture = TestBed.createComponent(FakeComponent);
    fakeComponent = fixture.componentInstance;
    fixture.detectChanges();

    window['grapesjs'] = {
      init: jasmine.createSpy('init'),
    };
    window['grapesjs'].init.and.returnValue(fakeEditor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.loadEditorIntoComponent', () => {
    it('should fail if component to load has no projection slot for the editor', () => {
      delete fakeComponentInstance.instance.grapesJsEditorContainer;
      const throwingFunction = () => {
        service.loadEditorIntoComponent({}, FakeComponent, null);
      };

      expect(throwingFunction).toThrow();
    });

    it('should load the component, & project grapesjs editor into its projection slot', () => {
      spyOn(fakeComponent.testContainer, 'insert');
      expect(fakeContainer.innerHTML).toEqual('<div></div>');
      service.loadEditorIntoComponent({}, FakeComponent, fakeComponent.testContainer);
      expect(window['grapesjs'].init).toHaveBeenCalled();
      expect(fakeComponent.testContainer.insert).toHaveBeenCalled();
      expect(fakeEditor.render).toHaveBeenCalled();
      expect(fakeContainer.innerHTML).toEqual('<div id="gjs-editor-0"></div>');
    });
  });
});
