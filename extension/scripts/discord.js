; (function () {
    function checkDiscordLogin() {
        var loginButton = document.querySelector("div.mainLoginContainer-1ddwnR")

        return loginButton == null
    }

    function setupEventListeners() {
        window.addEventListener("popstate", function(event) {
            console.debug("[event:popstate]", event.state);
        })

        window.addEventListener("popstate", function(event) {
            console.debug("[event:popstate]", event.state);
        })
    }

    function setupDrawer() {
        var buttonDrawer = document.createElement("span")

        function openDrawer() {
            var drawerClosed = document.querySelector(".drawer.drawerClosed")

            if (drawerClosed) {
                drawerClosed.classList.replace("drawerClosed", "drawerOpen")
                buttonDrawer.innerHTML = "✖"
            }
        }
        function closeDrawer() {
            var drawerOpen = document.querySelector(".drawer.drawerOpen")

            if (drawerOpen) {
                drawerOpen.classList.replace("drawerOpen", "drawerClosed")
                buttonDrawer.innerText = "▶"
            }
        }


        buttonDrawer.className = "drawerButton dvc-drawer"
        buttonDrawer.innerText = "✖"
        buttonDrawer.title = "Toggle Options"
        buttonDrawer.addEventListener("click", function(event) {
            event.preventDefault()
            var drawerClosed = document.querySelector(".drawer.drawerClosed")
            var drawerOpen = document.querySelector(".drawer.drawerOpen")

            if (drawerOpen) {
                closeDrawer()
            } else if (drawerClosed) {
                openDrawer()
            }
        })

        var buttonNavigation = document.createElement("span")
        buttonNavigation.className = "drawerButton dvc-navigation"
        buttonNavigation.innerText = "‹"
        buttonNavigation.title = "Toggle Navigation"
        buttonNavigation.addEventListener("click", function(event) {
            event.preventDefault()
            document.body.classList.toggle("hideNavigation")
        })

        var buttonSidebar = document.createElement("span")
        buttonSidebar.className = "drawerButton dvc-sidebar"
        buttonSidebar.innerText = "«"
        buttonSidebar.title = "Toggle Sidebar"
        buttonSidebar.addEventListener("click", function(event) {
            event.preventDefault()
            document.body.classList.toggle("hideSidebar")
        })

        var buttonVideotext = document.createElement("span")
        buttonVideotext.className = "drawerButton dvc-videotext"
        buttonVideotext.innerText = "≡"
        buttonVideotext.title = "Open Text Chat"
        buttonVideotext.addEventListener("click", function(event) {
            event.preventDefault()
            var videotext = document.querySelector("a[data-list-item-id=channels___719768831693946893")
            if (videotext) {
                videotext.click()
            }

            setTimeout(() => {
                document.body.classList.remove("hideNavigation")
                document.body.classList.add("hideSidebar")
            }, 50)
        })

        function checkForVideochat() {
            var videochat = document.querySelector("a[data-list-item-id=channels___719773618707365889")

            if (videochat) {
                videochat.click()

                setTimeout(() => {
                    document.body.classList.add("hideNavigation")
                    document.body.classList.add("hideSidebar")
                }, 50)
            } else {
                requestIdleCallback(checkForVideochat)
            }
        }

        function checkForPushToTalk() {
            var pushToTalkButton = document.querySelector("div[aria-label='Push to Talk Required'] button")

            if (pushToTalkButton) {
                pushToTalkButton.click()
                requestIdleCallback(checkForVideochat)
            } else {
                requestIdleCallback(checkForPushToTalk)
            }
        }

        var buttonVideochat = document.createElement("span")
        buttonVideochat.className = "drawerButton dvc-videochat"
        buttonVideochat.innerText = "⊞"
        buttonVideochat.title = "Open Video Chat"
        buttonVideochat.addEventListener("click", function(event) {
            event.preventDefault()
            var videochat = document.querySelector("a[data-list-item-id=channels___719773618707365889")

            if (videochat) {
                videochat.click()
            }

            checkForPushToTalk()

        })


        var drawer = document.createElement("div");
        drawer.className = "drawer drawerOpen"
        drawer.appendChild(buttonDrawer)
        drawer.appendChild(buttonNavigation)
        drawer.appendChild(buttonSidebar)
        drawer.appendChild(buttonVideotext)
        drawer.appendChild(buttonVideochat)

        function setDrawerIdle() {
            drawer.classList.add("drawerIdle")
        }

        var drawerIdleTimeout = setTimeout(setDrawerIdle, 5000);
        var drawerOpenTimeout = setTimeout(closeDrawer, 60000);

        drawer.addEventListener("mouseenter", function(event) {
            requestIdleCallback(openDrawer)
        })

        drawer.addEventListener("mouseleave", function(event) {
            requestIdleCallback(() => {drawer.classList.add("drawerIdle")})
        })

        drawer.addEventListener("mousemove", function(event) {
            requestIdleCallback(() => {drawer.classList.remove("drawerIdle")})
            clearTimeout(drawerIdleTimeout)
            drawerIdleTimeout = setTimeout(setDrawerIdle, 5000)

            var drawerOpen = document.querySelector(".drawer.drawerOpen")
            if (drawerOpen) {
                clearTimeout(drawerOpenTimeout)
                drawerOpenTimeout = setTimeout(closeDrawer, 10000)
            }
        })

        if (checkDiscordLogin()) {
            document.body.prepend(drawer)
        } else {
            clearTimeout(drawerIdleTimeout)
            clearTimeout(drawerOpenTimeout)

            var loginWarning = document.createElement("div");
            loginWarning.className = "drawer drawerWarning"
            loginWarning.innerText = "Please login to Discord and refresh the page."

            document.body.prepend(loginWarning)
        }

    }

    function onPopstate() {

    }

    function setup() {
        setupDrawer()
        setupEventListeners()
    }

    function checkForDOM() {
      if (document.body && document.head) {
        setup();
      } else {
        requestIdleCallback(checkForDOM);
      }
    }
    requestIdleCallback(checkForDOM);

  })()
