/*
    Create a list of buttons in the HTML code and give a handler for each button

    elements(object): A list with songs and their data
    parent(string): ID of the parent object
    isPlaylist(bool): Defines if the list is a list of songs or a list of playlists (used in callback)
    btnCallback(function): Callback function for the buttons
*/
export function createList(elements, parent, isPlaylist, btnPlaylist, btnCallback){
    let list = document.createElement("ul");

    for(let i = 0; i < Object.keys(elements).length; i++){
        let element = document.createElement("li");
        let btn = document.createElement("button");

        btn.setAttribute("class", "btn");
        btn.innerText = elements[i].name;
        
        if(!isPlaylist){
            btn.addEventListener("click", () => {
                btnCallback(elements[i].path, elements[i].name, i, btnPlaylist);
            });
        }else{
            btn.addEventListener("click", () => {
                if(document.getElementById("playlist-songs-hide") == null){
                    if(document.getElementById("playlist-songs").getAttribute("name") == elements[i].name){
                        document.getElementById("playlist-songs").setAttribute("id", "playlist-songs-hide");
                    
                    }else{
                        document.getElementById("playlist-songs").setAttribute("name", elements[i].name);
                        document.getElementById("playlist-songs").innerHTML = "";
                        createList(elements[i].songs, "playlist-songs", false, btnPlaylist[i]["songs"], btnCallback);
                    }
                }else{
                    document.getElementById("playlist-songs-hide").setAttribute("id", "playlist-songs");

                    document.getElementById("playlist-songs").setAttribute("name", elements[i].name);
                    document.getElementById("playlist-songs").innerHTML = "";
                    createList(elements[i].songs, "playlist-songs", false, btnPlaylist[i]["songs"], btnCallback);
                }
            });
        }
        element.appendChild(btn);
        list.appendChild(element);
    }

    document.getElementById(parent).appendChild(list);
}