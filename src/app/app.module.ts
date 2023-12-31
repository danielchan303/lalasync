import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { AutosizeModule } from 'ngx-autosize';
import { LightboxModule } from 'ngx-lightbox';
import { AdsenseModule } from 'ng2-adsense';

import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { ConnectComponent } from './screens/connect/connect.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { MessageBubbleComponent } from './components/message-bubble/message-bubble.component';
import { DialogComponent } from './screens/home/components/dialog/dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectComponent,
    LoadingSpinnerComponent,
    MessageBubbleComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    AppRoutingModule,
    FormsModule,
    AutosizeModule,
    LightboxModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7807917064284650',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
