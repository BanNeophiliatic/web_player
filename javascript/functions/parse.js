/*
    Gets the name of the file removing the extension

    file(string): Full file name
*/
export function findFileName(file){
    let pointPos = -1;

    for(var i = 0; i < file.length; i++){

        if(file[i] == '.'){
            pointPos = i;
        }
    }

    if(pointPos == -1) return "Invalid";

    return file.substring(0, pointPos);
}

/*
    Limits the name length to 40 characters

    name(string): File name
*/
export function parseFileName(name){
    if(name.length > 40){
        return name.substring(0, 40) + "...";
    }else{
        return name;
    }
}

/*
    Parses the time from seconds with decimals to 00:00 format without decimals

    time(float): Time to be parsed
*/
export function parseTime(time){
    time = Math.round(time);

    let minutes = Math.trunc(time / 60);

    let seconds = time - minutes * 60;

    if(seconds < 10) seconds = '0' + seconds.toString();
    if(minutes < 10) minutes = '0' + minutes.toString();

    if(isNaN(seconds)) return "00:00";

    return minutes + ':' + seconds;
}