import { useRef, useEffect, useState } from "react";
import jspreadsheet from "jspreadsheet-ce";

import "@/../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";

/**
 * 
 * This component is a wrapper around the jspreadsheet library.
 * https://jspreadsheet.com/
 */

const Spreadsheet = ({ ...props }) => {
    const jRef = useRef(null);
    const [data, setData] = useState([]);

    const defaultOptions = {
        minDimensions: [10, 10],
        onpaste: (instance, cell, value) => {
            console.log('onpaste', cell, value);
        },
        oninsertrow: (instance, cell, value) => {
            console.log('oninsertrow', cell, value);
        },
        onchange: (instance, cell, x, y, value) => {
            console.log(x, y);
            onCellChange(x, y, value, jspreadsheet.getColumnNameFromId([x, y]));
        }
    }


    const [options, setOptions] = useState(defaultOptions);


    useEffect(() => {
        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, { data, ...options });
        }
        // we can call getData here to bootstrap the spreadsheet
        // getData();
    }, []);

    // example for fetching data from an API
    const getData = () => {
        fetch('http://my.example.com/api/data')
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    };

    const onPaste = (pasteContents) => {
        // NOTE: Note, the paste event returns an array of arrays, 
        // so we need to handle the logic to convert it to a 2D array.
        // This also means that we need to have a unique identifier 
        // for each row to be able to send it to the backend.
        console.log('onPaste', pasteContents);
    };

    const onCellChange = (columnIndex, rowIndex, value, cell) => {
        // we can use the column and row indexes to update the right
        // row/data, but we still need a unique identifier for each
        // row to be able to save it properly to the backend.
        console.log('onCellChange', cell, value);
    };

    const addRow = () => {
        jRef.current.jspreadsheet.insertRow();
    };

    return (
        <div>
            <div ref={jRef} />
            <br />
            <input type="button" onClick={addRow} value="Add new row" />
        </div>
    );
}

export default Spreadsheet;