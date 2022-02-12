const socket = io("http://localhost:3001");
let roomId = "";

function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const email = urlParams.get("email");
    const avatar = urlParams.get("avatar");

    document.querySelector(".user_logged").innerHTML += `
        <img
            class="avatar_user_logged"
            src="${avatar}"
        />
        <strong id="user_logged">${name}</strong>
    `;

    socket.emit("start", {
        email,
        name,
        avatar
    });

    socket.on("new_users", user => {
        const existInDiv = document.getElementById(`user_${user._id}`);
        if (!existInDiv) {
            addUser(user);
        }
    });

    socket.emit("get_users", (users) => {
        console.log("getUsers", users);

        users.map(user => {
            if (user.email !== email) {
                addUser(user);
            }
        });
    });
}

function addUser(user) {
    const usersList = document.getElementById("users_list");
    usersList.innerHTML += `
    <li
        class="user_name_list"
        id="user_${user._id}"
        idUser="${user._id}"
    >
    <img
        class="nav_avatar"
        src="${user.avatar}"
    />
        ${user.name}
    </li>
    `
}

document.getElementById("users_list").addEventListener("click", (event) => {
    if (event.target && event.target.matches("li.user_name_list")) {
        const idUser = event.target.getAttribute("idUser");
        console.log("idUser", idUser);

        socket.emit("start_chat", { idUser }, (data) => {
            console.log(data);
            roomId = data.room.idChatRoom;
        });
    }
});

onLoad();
