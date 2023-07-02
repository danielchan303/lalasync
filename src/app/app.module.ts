import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AutosizeModule } from 'ngx-autosize';
import { LightboxModule } from 'ngx-lightbox';

import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { ConnectComponent } from './screens/connect/connect.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { MessageBubbleComponent } from './components/message-bubble/message-bubble.component';
import { DialogComponent } from './screens/home/components/dialog/dialog.component';

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
    ZXingScannerModule,
    FormsModule,
    AutosizeModule,
    LightboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
