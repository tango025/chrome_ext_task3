chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        console.log(msg.url)
        scrapeUrl(msg.url);
        sendResponse({ proto: "protocol" });
    });

function scrapeUrl(url){
        $.ajax({
        url: url,
        contentType: "json",
        crossDomain: true,
        success: function (response) {
            var phoneArr = [
                "\\+\\d\\d?-? ?\\d{3}-\\d{3}-\\d{4}",//
                "\\+\\d\\d?-? ?\\d{10}",
                "\\+\\d\\d?-? ?\\d{5} \\d{5}",
                "\\d{3}-\\d{3}-\\d{4}",
                "\\d{10}",
                "\\d{5} \\d{5}"
            ];
            var re = new RegExp(phoneArr.join("|"),"g");
            var phone = response.match(re);
            
            var email = response.match(/\w{1,}@\w{1,}.\w{1,3}/g);
            //matches    a@b.c, a1@b.c , a231a@b.c
            console.log("email from  page", email);
            console.log("contact information from  page", phone);
            // also it might bring many different data ids eg facebook
            //so filter it out as user's need

            //code to filter
            // var phone = response.match(/\d{10}/g).filter((d) => { return (d[0] == 9 || d[0] == 8 || d[0] == 7) });//flitering numbers starting from 7,8,9
            //to remove duplicates
            //console.log("numbers from page", [...new Set(phone)]);
        }

    });  
}    