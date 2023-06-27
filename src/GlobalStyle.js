import { createGlobalStyle } from "styled-components";




const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
        font-family: 'Noto Sans KR', sans-serif;
        a {
            text-decoration: none;
            color: inherit;
          }
    }
    `;

    export default GlobalStyle;
