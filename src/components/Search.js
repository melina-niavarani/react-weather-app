import { useState } from "react";

export default function Search(props){
    const [inputValue, setInputValue] = useState("");
    return(
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
    )
}