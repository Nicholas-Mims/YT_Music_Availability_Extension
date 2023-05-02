
const urlRegex = /https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9]*/;

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

function checkVideoAvailable(tabId, changeInfo, tabInfo) {
    //availability = false;
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //     // use `url` here inside the callback because it's asynchronous!
    //     let url = tabs[0].url;
    //     console.log(url);
        
    // });
    //editHTML(true);
    if(changeInfo.url !== undefined){
        console.log("Url not undefined");
        if(changeInfo.url.match(urlRegex) != null) {
            console.log("Youtube video found!");
        }
    }
}

chrome.tabs.onUpdated.addListener(checkVideoAvailable); 