
const urlRegex = /https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9]*/;
const request_url = "https://yt.lemnoslife.com/videos?part=music&id="

function checkJson(response){
    //videojson = JSON.parse(response);
    available = response.items[0].music.available;
    if(available == true) {
        return true;
    }
    return false;
}

async function makeOperationalApiRequest(video_id) {

    const response = await fetch(request_url + video_id, {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        }
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

async function checkVideoAvailable(tab) {
    availability = false;
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //     // use `url` here inside the callback because it's asynchronous!
    //     let url = tabs[0].url;
    //     console.log(url);
        
    // });
    if(tab.url !== undefined){
        if(tab.url.match(urlRegex) != null) {

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
            response = await makeOperationalApiRequest(video_id);

            //Check JSON For Availability
            availability = checkJson(response);
        }
    }

    return availability;
}

//chrome.tabs.onUpdated.addListener(checkVideoAvailable); 
chrome.action.onClicked.addListener(async (tab) => {
    if(await checkVideoAvailable(tab)){
        console.log("Available");
    } else {
        console.log("Unvailable");
    }
});