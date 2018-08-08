
export default class Main {
    constructor(){

    }
    httpGetAsyncPromise(theUrl){
        return new Promise(function (resolve,reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    return resolve(xmlHttp.responseText);
                }
                if (xmlHttp.readyState == 4 && xmlHttp.status == 404){
                    return reject(xmlHttp.responseText);
                }
            }
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send(null);
        })
    }
    generateNewSvgWithBackground(frameUrl,backgroundUrl){
        const that = this;
        return new Promise((resolve, reject) => {

            function onError(e) {
                return reject("rejected");
            }

            return that.httpGetAsyncPromise(frameUrl).then(function(xmlString) {
                return that.httpGetAsyncPromise(backgroundUrl).then(function(adString) {

                    const parcer = new DOMParser();
                    let xml = parcer.parseFromString(xmlString,"text/xml");
                    let ad = parcer.parseFromString(adString,"text/xml");

                    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    let id = ad.getElementsByTagName('svg')[0].getAttribute("id");
                    let fill = "url(#"+id+")";
                    xml.getElementsByTagName('g')[0].setAttribute('fill',fill);
                    ad.getElementsByTagName('svg')[0].setAttribute("patternUnits","userSpaceOnUse");
                    ad.getElementsByTagName('svg')[0].setAttribute("patternTransform","scale(19 19)");

                    let pattern = ad.getElementsByTagName("svg")[0].outerHTML.replace(/<svg/g,"<pattern");

                    defs.innerHTML = pattern;

                    let svgNode = xml.getElementsByTagName("svg")[0];

                    svgNode.insertBefore(defs, svgNode.firstChild);

                    return resolve(xml.documentElement);

                },onError);
            },onError);
        })
    }
}
