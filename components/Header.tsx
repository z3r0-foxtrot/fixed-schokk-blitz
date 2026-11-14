import Brand from "./Brand";
import SearchBox from "./SearchBox";
export default function Header() {
  return <header className="topbar"><div className="topbar-inner"><Brand/><div className="topbar-search"><SearchBox compact/></div><div className="topbar-meta"><span className="status-dot"/> PUBLIC DATABASE</div></div></header>;
}
