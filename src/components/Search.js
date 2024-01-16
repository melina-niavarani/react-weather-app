import { useState } from "react";

export default function Search(props){
    const [inputValue, setInputValue] = useState("");
    return(
        <div className="container input-group  my-3">
            <input
                type="search"
                placeholder="Enter a city ..."
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        props.handleSubmit(inputValue);
                        setInputValue("");
                    }
                }}
                value={inputValue}
                className="form-control"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                  />
            <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => {
                props.handleSubmit(inputValue);
                setInputValue("");
            }}
            >
            Search
            </button>
        </div>
    )
}