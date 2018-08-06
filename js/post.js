let timeout = setTimeout(function it() {
    if (isExtensionExist !== undefined) {
        addMessageHandler();
        document.querySelector("#loadMyPosts").addEventListener("click", () => loadMyMessages());
        loadMembers();

    } else {
        timeout = setTimeout(it, 200);
    }
}, 200);

function addMessageHandler() {
    let form = document.querySelector("#createPost");
    form.onsubmit = function (event) {
        event.preventDefault();
        let message = document.querySelector("#title").value;
        apiClient.add(message, (resp) => {});
    }
}

function addLikeHandler(id) {
    apiClient.like(id, (resp) => {
        if (resp) {
            loadPosts();
        }
    });
}