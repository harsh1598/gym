import React, { useEffect, useState } from "react";
import WebService from "../../utility/WebService";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {

    const [loader, setLoader] = useState<any>(false);
    const [data, setData] = useState<any>(false);

    useEffect(() => {
        // getList();
        alert("Df")
    }, []);

    const getList = () => {
        setLoader(true)
        WebService.getAPI({
            action: "/dashboard-count",
        })
            .then((res: any) => {
                if (res && res.result) {
                    setData(res.result);
                    setLoader(false);
                }
            })
            .catch((error: any) => {
                // toast.error(error);
                //   setLoading(false);
            });
    }

    return (
        <>
            <Loader show={loader} />
            <div className="row">
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-8">
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Users</p>
                                        <h5 className="font-weight-bolder mb-0">
                                            {data && data.total_users}
                                            {/* <span className="text-success text-sm font-weight-bolder">+55%</span> */}
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-4 text-end">
                                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                        <i className="fas fa-users text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-8">
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Product</p>
                                        <h5 className="font-weight-bolder mb-0">
                                            50
                                            {/* <span className="text-success text-sm font-weight-bolder">+55%</span> */}
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-4 text-end">
                                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                        <i className="fas fa-box-open text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-8">
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Category</p>
                                        <h5 className="font-weight-bolder mb-0">
                                            {data && data.total_category}
                                            {/* <span className="text-success text-sm font-weight-bolder">+55%</span> */}
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-4 text-end">
                                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                        <i className="fas fa-tags text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-8">
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Today's Money</p>
                                        <h5 className="font-weight-bolder mb-0">
                                            {data && data.total_suppliers}
                                            {/* <span className="text-success text-sm font-weight-bolder">+55%</span> */}
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-4 text-end">
                                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                        <i className="fas fa-truck text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">

            </div>
        </>
    );
}

export default Dashboard;