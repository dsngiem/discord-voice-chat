import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-webview',
  templateUrl: './webview.component.html',
  styleUrls: ['./webview.component.css']
})

export class WebviewComponent implements OnInit, OnChanges {
  @Input() id: number = 0
  @Input() url: string = ""
  trustedUrl: SafeResourceUrl;

  tabId: number = -1
  frameId: number = -1

  @Input() showDebug: boolean = false;
  @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    if (this.url == "") {
      this.url = `about:blank?webview=${this.id}&allowScripts=true&popup=false`
    }

    this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propertyName in changes) {
      if (changes.hasOwnProperty(propertyName)) {
        switch (propertyName) {
          default:
            console.log(`Webview: ${propertyName} will change`)
            this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
            break;
        }
      }
    }
  }

  onLoad(event: Event) {
    let iframeElement: HTMLIFrameElement = event.target as HTMLIFrameElement
    console.debug('[Webview Component]', `${iframeElement.src}`);

    if (this.url != iframeElement.src) {
      this.url = iframeElement.src
    }
  }

//   addEventListener(eventName: string, listener: (...args: any[]) => void) {
//     this.emitter.addListener(eventName, listener)
//   }

//   removeEventListener(eventName: string, listener: (...args: any[]) => void) {
//     this.emitter.removeListener(eventName, listener)
//   }

//   dispatchExtensionMessage(type: string, payload?: any, extra?: any) {
//     if (!type.startsWith('metastream-')) {
//       throw new Error('Extension messages must start with metastream-')
//     }

//     const message = { type, payload, ...extra }

//     const chrome = (window as any).chrome
//     if (typeof chrome === 'object' && typeof chrome.runtime === 'object') {
//       const extensionId = document.documentElement.dataset.extensionId
//       if (extensionId) {
//         chrome.runtime.sendMessage(extensionId, message)
//         return
//       }
//     }

//     window.postMessage(message, location.origin)
//   }

//   dispatchRemoteEvent<T>(type: string, payload?: T, options: { allFrames?: boolean } = {}): void {
//     if (this.tabId === -1 || this.frameId === -1) return

//     this.dispatchExtensionMessage(
//       'metastream-webview-event',
//       { type, payload },
//       { tabId: this.tabId, frameId: options.allFrames ? undefined : this.frameId }
//     )
//   }

  loadURL(url: string, opts: { httpReferrer?: string; userAgent?: string } = {}) {
    this.url = url
    // else if (this.props.popup) PopupWindow.loadURL(url)
  }

//   getURL() {
//     return this.url
//   }

//   goBack() {
//     this.dispatchRemoteEvent('navigate', -1)
//   }

//   goForward() {
//     this.dispatchRemoteEvent('navigate', 1)
//   }

//   stop() {
//     this.dispatchRemoteEvent('stop')
//     this.emitter.emit('did-stop-loading')
//   }

//   reload() {
//     this.dispatchRemoteEvent('reload')
//   }

//   reloadIgnoringCache() {
//     this.dispatchRemoteEvent('reload', true)
//   }
}
