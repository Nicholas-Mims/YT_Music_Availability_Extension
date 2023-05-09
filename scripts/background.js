
const urlRegex = /https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9]*/;
const request_url = "https://music.youtube.com/youtubei/v1/player?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";

function checkJson(response){
    console.log("checking JSON");
    //videojson = JSON.parse(response);
    //console.log(videojson.playabilityStatus.status);
}

async function makeFetchRequest(video_id) {
    console.log("making request: " + video_id);
    const response = await fetch(request_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "referer": "https://music.youtube.com/watch?v=" + video_id
        },
        body: {"videoId":video_id, "context":{"client":{"clientName":"WEB_REMIX", "clientVersion":"1.20230424.01.00"}}},
    });

    return response.json();
}

function editHtml(available) {
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
    availability = false;
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //     // use `url` here inside the callback because it's asynchronous!
    //     let url = tabs[0].url;
    //     console.log(url);
        
    // });
    if(tab.url !== undefined){
        if(tab.url.match(urlRegex) != null) {
            console.log("Youtube video found!");

            // //Edit YouTube HTML
            // chrome.scripting.executeScript({
            //     target : {tabId : tab.id},
            //     func : editHTML,
            //     args : [true],
            // })

            //Make Fetch Request
            //Example url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
            id_start_index = tab.url.search(/\/watch\?v=/i);
            video_id = tab.url.substring(id_start_index + 9, id_start_index + 20);
            response = makeFetchRequest(video_id);
            console.log(response);

            //Check JSON For Availability
            //availability = checkJson(response);
        }
    }
}

//chrome.tabs.onUpdated.addListener(checkVideoAvailable); 
chrome.action.onClicked.addListener(async (tab) => {
    checkVideoAvailable(tab);

});