function checkVideoAvailable() {
    availability = false;

    chrome.tabs.query({url:["https://www.youtube.com/watch*"], active: true, lastFocusedWindow: true}, tabs => {
        // use `url` here inside the callback because it's asynchronous!
        if(tabs[0] == null) {
            console.log("Not Youtube!");
        } else {
            let url = tabs[0].url;
            console.log(url);
        }
    });

    return availability;
}

console.log("Checking Availability")
checkVideoAvailable();