import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebviewComponent } from './webview/webview.component';
import { DiscordChatComponent } from './discord-chat/discord-chat.component';
import { LandingComponent } from './landing/landing.component';
import { ExtensionCheckComponent } from './extension-check/extension-check.component';

@NgModule({
  declarations: [
    AppComponent,
    WebviewComponent,
    DiscordChatComponent,
    LandingComponent,
    ExtensionCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
