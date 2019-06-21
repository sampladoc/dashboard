let converter = require('json-2-csv');


export default function Csv(props) {
    let csvRaw = props.jsonFile

    let textFile = null
    let makeTextFile = function (csvFile) {
        let filename = props.name+".csv"
        let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            let link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                let url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

    let json2csvCallback = function (err, csv) {
        if (err) throw err;
        makeTextFile(csv)
    };

    converter.json2csv(csvRaw, json2csvCallback);



}