from json import dumps, loads
from os import listdir, chdir, system, name

def menu():
    print("1_ Show all playlists")
    print("2_ Create playlist")
    print("3_ Modify playlist")
    print("4_ Delete playlist")
    print("5_ Exit")

def printList(list):
    s = 0
    for i in list:
        print(str(s) + "_ " + i)
        s += 1

def createFile(n):
    with open(f"{n}.json", "w") as file:
        file.write('{}')

def deleteFile(n):
    if(name == "nt"):
        system(f"del {n}.json")
    else:
        system(f"rm {n}.json")



if __name__ == '__main__':
    chdir("../resources/playlists")

    playlists = listdir(".")

    while(True):
        menu()

        choice = int(input("\n[i]Input your choice: "))

        if(choice == 1):
            playlists = listdir(".")
            printList(playlists)

        elif(choice == 2):
            n = str(input("[i]Input the playlist name (ex. shakira_songs): "))
            createFile(n)

        elif(choice == 3):
            n = str(input("[i]Input the playlist name (ex. shakira_songs): "))
            contents = {}

            with open(f"{n}.json", "r", encoding = "utf-8") as file:
                contents = loads(file.read())
            
            while(True):
                print("\n")
                print("1_ Change playlist name")
                print("2_ Add song")
                print("3_ Show songs")
                print("4_ Remove song")
                print("5_ Save changes")

                choice2 = int(input("\n[i]Input your choice: "))

                if(choice2 == 1):
                    nn = str(input("[i]Input the new name (ex. not_shakira:songs): "))

                elif(choice2 == 2):
                    songN = str(input("[i]Input the song name with file extension (ex. say_goodbye.mp3): "))
                    contents[len(contents)] = songN

                elif(choice2 == 3):
                    s = 0
                    for k in contents:
                        print(str(s) + "_ " + contents[k])
                        s += 1

                elif(choice2 == 4):
                    songN = str(input("[i]Input the song name with file extension (ex. say_goodbye.mp3): "))
                    d = str(input(f"[i]Are you sure you want to delete {songN} from {n}? (y/n): "))

                    if(d == 'y'): 
                        res = None
                        for sub in contents:
                            if contents[sub] == songN:
                                res = sub
                        
                        if(res == None):
                            print("[-]Song not found")
                        else:
                            del contents[res]
                    
                    else:
                        print("[-]Canceled")

                elif(choice2 == 5):
                    with open(f"{n}.json", "w", encoding = "utf-8") as file:
                        file.write(dumps(contents))

                    break

                else:
                    print("[-]Invalid option")

        elif(choice == 4):
            n = str(input("[i]Input the playlist name (ex. shakira_songs): "))
            d = str(input(f"[i]Are you sure you want to delete {n}? (y/n): "))
            
            if(d == 'y'): deleteFile(n)
            else: print("[-]Canceled")

        elif(choice == 5):
            break

        else:
            print("[-]Invalid choice")

        print("\n")