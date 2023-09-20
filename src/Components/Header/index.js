import { useState } from "react";

function Header(props){
const {name,headerStyling} = props;

return(
    <h2 className={headerStyling}>{name}</h2>
)
} 

export default Header;