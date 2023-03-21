import ReactDOMClient from "react-dom/client";
import Root from "./config/root"

import './assets/styles/style.scss'

const target = document.getElementById('root')

const root = ReactDOMClient.createRoot(target);

root.render(Root);
