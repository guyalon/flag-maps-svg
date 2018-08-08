import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main'


const main = new Main();

main.httpGetAsyncPromise("/api/list").then(function(data){
    var list = JSON.parse(data);

    var d = list.map(function (item) {
        return main.generateNewSvgWithBackground(item.map_url,item.flag_url);
    });

    Promise.all(d.map(p => p.catch(e => e)))
        .then(function(results) {
            renderApp(results);
        }).catch(e => console.log(e));
});


function renderApp(svgs=[]) {
    ReactDOM.render(<App svgs={svgs}/>, document.getElementById('root'));
}

renderApp();

