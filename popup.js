document.addEventListener('DOMContentLoaded', function () {
    $("#count1").click(() => sendMessage());

    function sendMessage() {
        let url = $("#url").val();
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let tab = tabs[0];
            chrome.tabs.update(tab.id, { url }, () => {
                chrome.tabs.onUpdated.addListener(function listener(tabid, changedInfo) {
                    //listener for when loading is complete
                    if (changedInfo.status === "complete" && tabid === tab.id) {
                        //remove listener once the page is loaded
                        chrome.tabs.onUpdated.removeListener(listener);
                        chrome.tabs.sendMessage(tabs[0].id, { url: url }, (response) => {
                            console.log(response.proto);
                        })
                    }
                })
            })
        })
    }
})    
