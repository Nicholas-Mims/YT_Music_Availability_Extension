
const urlRegex = /https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9]*/;

function makeHttpRequest(videoid) {

}

function editHTML(available) {
    console.log("START!");
    video_title_element = document.querySelector("h1 > yt_formatted-string, .ytd-watch-metadata");
    availability_text = document.createElement("p");
    if(available){
        availability_text.textContent = 'Video Is Available: ✔️';
        video_title_element.insertAdjacentElement("afterend", availability_text);
    } else {
        availability_text.textContent = 'Video Is Unavailable: ❌';
        video_title_element.insertAdjacentElement("afterend", availability_text);
    }
    console.log("done");
}

function checkVideoAvailable(tab) {
    //availability = false;
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //     // use `url` here inside the callback because it's asynchronous!
    //     let url = tabs[0].url;
    //     console.log(url);
        
    // });
    if(tab.url !== undefined){
        console.log("Url not undefined");
        if(tab.url.match(urlRegex) != null) {
            console.log("Youtube video found!");
            console.log("id: ${tab.id}");
            //Edit YouTube HTML
            chrome.scripting.executeScript({
                target : {tabId : tab.id},
                func : editHTML,
                args : [true],
            })
        }
    }
}

//chrome.tabs.onUpdated.addListener(checkVideoAvailable); 
chrome.action.onClicked.addListener(async (tab) => {
    console.log(tab.id);
    checkVideoAvailable(tab);
});