import BottomFooter from "../components/footer/bottomFooter";
import Navbar from "../components/navbar";
import "../styles/globals.css";

export default function DashboardLayout({ children }) {
    return (
        <div>
            {children}
            <BottomFooter />
        </div>
    );
} 