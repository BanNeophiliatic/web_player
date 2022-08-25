from os import listdir, chdir
from json import loads, dumps

chdir("../javascript/functions/")
playlistData = {}

with open("info.js", "w", encoding= "utf-8") as file:
    chdir("..")
    chdir("..")
    chdir("resources/")

    file.write("export var audioData = " + str(listdir("audio")) + ";\n")
    
    l = listdir("playlists")
    chdir("playlists/")

    for i in l:
        with open(i, "r", encoding = "utf-8") as file2:
            playlistData[i] = loads(file2.read())

    file.write("export var playlistsData = " + dumps(playlistData))
