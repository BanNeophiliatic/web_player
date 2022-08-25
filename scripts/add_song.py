from os import chdir, system
from os import name as n

file = str(input("Input the song path or drag the file into this window: "))
name = str(input("Input the song name with extension (ex. Never_Gonna_Give_You_Up.mp3): "))

chdir("../resources/audio/")

if(n == "nt"):
    system(f"copy {file} {name}")
else:
    system(f"cp {file} {name}")
