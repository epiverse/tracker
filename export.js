const hello = `hello at ${Date()}`

async function cdc(){ 
}

async function seer(){ 
}

// -------------- IARC (https://www.iarc.who.int/cancer-topics) --------------
let iarc={}
iarc.causes=['obesity','infections','uv','alcohol']
iarc.causesBy=['countries','cancers','attributable','regions','preventable']
iarc.causesGet= async (cause=iarc.causes[0],by=iarc.causesBy[0])=>{
    let url = `https://gco.iarc.fr/causes/${cause}/data/${by}.json`
    console.log(url)
    try{
        let d = await (await fetch(url)).json()
        return d
    } catch (err){
        console.log(`${url}`,err)
        return undefined
    } 
}
iarc.causesGetAll= async function(cache=false){  // retrieve all causal data
    let dt={}
    iarc.causes.forEach(async c=>{
        dt[c]={}
        iarc.causesBy.forEach(async b=>{
            let url = `https://gco.iarc.fr/causes/${c}/data/${b}.json`
            console.log(url)
            try{
                dt[c][b] = await (await fetch(url)).json()
            } catch (err){
                console.log(`${url}`, err)
            }
            
        })
    })
    if(cache){
        iarc.causesGetAll=dt //replaces original function with fetched results, i.e. caching them
    }
    return dt
}
// ---------------------------------------------------------------------------

async function getZipURL(url='https://corsproxy.io/?https://ci5.iarc.fr/CI5plus/old/CI5plus_Summary_April2019.zip'){
    const JSZip = (await import('https://cdn.jsdelivr.net/npm/jszip/+esm')).default
    let res={}
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            var zip = new JSZip();
            zip.loadAsync(blob)
            .then((zip) => {
                zip.forEach((relativePath, file) => {
                    file.async("uint8array").then((content) => {
                        // You will need to handle file content in browser's way like showing on the page or downloading it 
                        // as creating files directly on user's computer is not allowed for security reasons
                        console.log("File:", relativePath, "Size:", content.byteLength);
                        // remove trailing blanks
                        let txt = (new TextDecoder()).decode(content)
                        let trailingBlank = txt.match(/[/\n/\r]+$/g)
                        if(trailingBlank){
                            txt=txt.slice(0,-(trailingBlank.length+1))
                        }
                        // parse text into table
                        res[relativePath]=(txt).split(/[\n\r]+/g).map(r=>r.split(/[\t,]/g))
                    });
                });
            })
            .catch((err) => {
              console.log("Error reading zip:", err);
            });
        })
    .catch((err) => {
        console.log("Error fetching zip:", err);
    });
    return res
    // try files = getZipURL()
}


export { // these are the methods of epiVerseTracker
    hello,
    cdc,
    seer,
    iarc,
    getZipURL
}

