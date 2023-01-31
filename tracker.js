console.log('epiVerseTracker imported from https://epiverse.github.io/tracker/export.js');

(async function(){
    //epiVerseTracker = await import('http://localhost:8000/tracker/export.js')
    epiVerseTracker = await import('https://epiverse.github.io/tracker/export.js')
    if(typeof(define)!='undefined'){
        define(epiVerseTracker)
    }
})()
