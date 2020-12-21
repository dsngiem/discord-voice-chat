import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscordChatComponent } from './discord-chat/discord-chat.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'videochat', component: DiscordChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
