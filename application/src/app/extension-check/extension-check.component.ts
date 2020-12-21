import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extension-check',
  templateUrl: './extension-check.component.html',
  styleUrls: ['./extension-check.component.css']
})
export class ExtensionCheckComponent implements OnInit {
  isInstalled: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.extensionCheck()
  }

  extensionCheck() {
    this.isInstalled = typeof document.documentElement.dataset.extensionInstalled !== 'undefined'

    if (this.isInstalled) {
      this.router.navigate(["videochat"])
    }
  }
}
