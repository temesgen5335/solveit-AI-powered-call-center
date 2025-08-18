import '../styles/globals.css';
import Navbar from '../components/navbar';
import "../styles/globals.css";
import BottomFooter from '../components/footer/bottomFooter';

export default function DashboardLayout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="pt-18">            
                {children}
                <BottomFooter />
            </div>
        </div>
    );
} 