// UI manipulation
console.log('UI fun')
epiVerseTrackerDiv.innerHTML='-- plot --'
terminal.onkeyup=function(ev){
    //console.log(ev.keyCode)
    if(ev.keyCode==13){
        let val=terminal.value.match(/>([^>]+)\n$/)[1]
        if(val==' '){
            terminal.value='> '
        }else{
            terminal.value+=eval(val)
            terminal.value+='\n> '
        }
        //debugger
    }
}