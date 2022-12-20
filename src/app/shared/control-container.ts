import { Provider, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

export function controlProviderFactory(container: ControlContainer) {
  return container;
}

export const CONTROL_CONTAINER: Provider = {
  provide: ControlContainer,
  useFactory: controlProviderFactory,
  deps: [[new SkipSelf(), ControlContainer]],
};