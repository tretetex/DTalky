'use strict';

function updateInfo() {
    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");
}

function loadMessages(startFrom, count) {
    apiClient.getMessages(function (resp) {
        if (resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                for (const post of result) {
                    showPost(post);
                }
                document.querySelector(".posts").lastChild.scrollIntoView();
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098; font-size: 14px;' class='d-flex justify-content-center'>Not found :(</div>";
            }
        }
    });
}

function loadMyMessages() {
    apiClient.getMyMessages(function (resp) {
        if (resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098; font-size: 14px;' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                for (const post of result) {
                    showPost(post);
                }
                document.querySelector(".posts").lastChild.scrollIntoView();
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098; font-size: 14px;' class='d-flex justify-content-center'>Not found :(</div>";
            }
        }
    });
}

function showPost(post) {
    let innerHtml = `<div class="post d-flex justify-content-between ml-auto mr-auto">
            <div id="postId" hidden>${post.id}</div>

            <div class="data">
                <div class="post-container">
                    <div class="message">
                        <div class="title">${post.message}</div>
                        <div class="d-flex justify-content-between">
                            <div class="from"><i class="far fa-user"></i><span>${post.wallet}</span></div>
                            <div class="created"><i class="far fa-clock"></i>${convertUnixStampToScreenDate(Date.parse(post.added))}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`;

    let container = document.querySelector(".posts");
    let div = document.createElement('div');
    div.innerHTML = innerHtml;

    container.append(div.firstChild);
}

function loadMembers() {
    apiClient.getMembersInLastDay((resp) => {
        if (resp) {
            let result = JSON.parse(resp.result);
            let count = 0;
            document.querySelector(".members").innerHTML = "";

            if (result && result.length > 0) {
                result = result.reverse();
                for (const wallet of result) {
                    showMember(wallet);
                    count++;
                }
            } else {
                document.querySelector(".members").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Empty</div>";
            }

            document.querySelector("#questionsCount").innerHTML = count;
        }
    });
}

function showMember(wallet) {
    let innerHtml = `<div class="member">
                    <i class="far fa-user"></i>
                    ${wallet}
                </div>`;

    let container = document.querySelector(".members");
    let div = document.createElement('div');
    div.innerHTML = innerHtml;
    container.append(div.firstChild);

}

/* ------------------------------ */

function showLoaders() {
    let loader = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = loader;
    }
}

function hideLoaders() {
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = "";
    }
}