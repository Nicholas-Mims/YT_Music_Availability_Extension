function makeHttpRequest(videoid) {

}

function editHTML(available) {
    video_title_element = document.querySelector("h1, .ytd-watch-metadata")
    availability_text = document.createElement("p");
    if(available){
        availability_text.textContent = 'Video Is Available: ✔️';
        video_title_element.insertAdjacentElement("afterend", availability_text);
    } else {
        availability_text.textContent = 'Video Is Unavailable: ❌';
        video_title_element.insertAdjacentElement("afterend", availability_text);
    }
}

function checkVideoAvailable() {
    //availability = false;
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        // use `url` here inside the callback because it's asynchronous!
        let url = tabs[0].url;
        console.log(url);
        
    });
    //editHTML(true);
}

function sum(a, b) {
    return a + b;
}

chrome.tabs.onActivated.addListener(async() => {
    console.log("RUN on activated");
});

chrome.tabs.onUpdated.addListener(async() => {
    console.log("RUN on updated");
});