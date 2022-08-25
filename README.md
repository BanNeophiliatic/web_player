# Web Player
<img title= "Player Image" src = "https://github.com/BanNeophiliatic/web_player/blob/main/player.png"/>

Para resumir este proyecto consiste en un reproductor de audio que se hostea de manera local. Cumple la función de un spotify simple que funciona fuera de conexión puesto que reproduce audios descargados en el almacenamiento y de un consumo y peso mínimos. **Me he negado a hacerlo con responsive desing así que lo siento por los móviles**.

Es intuitivo de usar así que me niego a explicar cada característica, mejor descárgalo y pruébalo ;).

(A la espera de testeo, desconozco si funciona en linux y ha sido probado usando win64 con la extensión live server de vscode para hostear).

## Requisitos
1. Python 3.x (opcional si sabes hacer las tareas de los scripts manualmente).
2. Cualquier forma de servidor local para hostear el proyecto.

## Guía de uso
### Guardar archivos de audio
Hay un script destinado a guardar archivos de audio dentro de la carpeta "scripts", aun así si se desea hacerlo de forma manual solo tiene colocar el archivo de audio dentro del directorio "/resources/audio/" y después ejecutar el script save_changes.py.

### Creación de playlists
De nuevo hay otro script destinado a la creación de playlists que hace de esta tarea algo sencillo. Aun así si por algún tipo de enfermedad mental se desea hacer este proceso de manera manual el procedimiento sería el siguiente:

1. Dirigirse al directorio "/resources/playlists/".
2. Crear un archivo .json donde el nombre del archivo será el nombre de la playlist.
3. Introducir las canciones en el siguiente formato: `{"0": "Canción0.mp3", "1": "Canción1.m4a"...}`.
4. Una vez acabado ese proceso se debe ejecutar el script save_changes.py.
5. Cabe destacar que las canciones que se añadan deben estar situadas en el directorio "/resources/audio/" por cuestiones lógicas.

### Guardar cambios
Como ya mencioné hay un script para eso (save_changes.py) pero siempre es posible hacerlo de manera manual. En este caso si por algún tipo de problema psicológico grave se desea hacer este pesado procedimiento de manera manual este es el orden a seguir:
1. Dirigirse al archivo "/javascript/functions/info.js".
2. Dentro del propio archivo se van a exportar dos variables una es una lista y otra un objeto.
3. En la primera línea debe escribirse lo siguiente `export var audioData = ["canción1.mp3", "canción2.mp3"];` y seguir añadiendo elementos a la lista hasta que contenga todos los audios del directorio "/resources/audio/".
4. Por último en la segunda línea debe colocarse lo siguiente: `export var playlistsData = {"playlist.json" : {"0": "Canción0", "1": "Canción1"...}...};` así hasta terminar con las playlist y con el contenido de cada una de ellas.

Este procedimiento es enfermizo así que mejor descarga python y déjale el trabajo al script, créeme.
