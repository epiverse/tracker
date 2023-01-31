console.log('epiVerseTracker imported from https://epiverse.github.io/tracker/export.js');

(async function(){
    epiVerseTracker = await import('./export.js')
    if(typeof(define)!='undefined'){
        define(epiTracker)
    }
})()
