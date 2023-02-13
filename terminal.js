(async function(id='terminal'){ // activating a textarea with id "terminal"
    document.getElementById(id).onkeyup=function(ev){
        //console.log(ev.keyCode)
        if(ev.keyCode==13){
            let val=terminal.value.match(/>([^>]+)\n$/)[1]
            if(val==' '){
                terminal.value='> '
            }else{
                // full eval works best through script tag loading, not ES6 imports
                terminal.value+=eval(val) 
                terminal.value+='\n> '
            }
        }
    }
})()