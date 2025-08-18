import DashboardNavbar from "../components/dashboardNavbar";
import BottomFooter from "../components/footer/bottomFooter";
import "../styles/globals.css";

export default function DashboardLayout({ children }) {
    return (
        <div>
            <DashboardNavbar />
            {children}
            <BottomFooter />
        </div>
    );
} 