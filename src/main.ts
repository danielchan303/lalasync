import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

window.addEventListener('resize', () => {
  // For the rare legacy browsers that don't support it
  if (!window.visualViewport) {
    return;
  }

  const visualHeight = window.visualViewport.height;
  document.documentElement.style.maxHeight = visualHeight + 'px';
  document.body.style.maxHeight = visualHeight + 'px';
});
