import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        // API calls here
    }, []);

    return (
        <>
            <Loader show={loader} />

            {/* Greeting Section */}
            <div className="dashboard-header mb-4">
                <h2 className="fw-bold">Good Morning, Anna! 🌞</h2>
                <p className="text-muted">Here’s what’s happening with your store today.</p>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="stat-card shadow-sm">
                        <h5>Total Sales</h5>
                        <h3>$12,450</h3>
                        <small className="text-success">+8% from last week</small>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card shadow-sm">
                        <h5>New Customers</h5>
                        <h3>145</h3>
                        <small className="text-success">+12% from last week</small>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card shadow-sm">
                        <h5>Pending Orders</h5>
                        <h3>23</h3>
                        <small className="text-danger">-5% from last week</small>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="card p-3 shadow-sm">
                <h5 className="mb-3">Recent Activity</h5>
                <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                        📦 Order #1024 was shipped <span className="text-muted">2 hours ago</span>
                    </li>
                    <li className="mb-2">
                        👤 New customer <b>John Smith</b> registered <span className="text-muted">4 hours ago</span>
                    </li>
                    <li>
                        💳 Payment of <b>$250</b> received <span className="text-muted">yesterday</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Dashboard;
