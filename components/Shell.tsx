import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
export default function Shell({children,active}:{children:React.ReactNode;active?:string}){return <><Header/><div className="app-frame"><Sidebar active={active}/><main className="main-area">{children}<Footer/></main></div></>}
