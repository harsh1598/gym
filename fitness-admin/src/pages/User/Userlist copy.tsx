import React, { useEffect, useState } from "react";
import AddEditUser from "./AddEditUser";
import Pagination from "../../components/Paginaion/Pagination";
import { Modal, ModalFooter, ModalHeader } from "reactstrap";
import WebService from "../../utility/WebService";
import tim from "../../assets/img/tim.png";
import Search from "../../components/Search/Search";
import toast from "react-hot-toast";
import { limit } from "../../components/common/list";

const Userlist = () => {

    const [modelName, setModelName] = useState<any>({ name: "", id: 0 });
    const [list, setlist] = useState<any>([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({ sortBy: "first_name", orderBy: "asc" });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        getList(page, keyword);
        // Load data for the selected page
    };
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getList(1, keyword);
    }, [keyword])

    const onCloseModal = () => {
        setModelName("");
    }

    const changeStatus = (id: any) => {
        let obj: any = {};
        obj.id = id;
        WebService.putAPI({
            action: "/update-user-status",
            body: obj
        })
            .then((res: any) => {
                if (res && res.message) {
                    toast.success(res.message);
                    getList(1, keyword);
                    setModelName("");
                }
            })
            .catch((error: any) => {
                // toast.error(error);
                //   setLoading(false);
            });
    }

    const handleSort = (field: any) => {
        if (filter.sortBy === field) {
            setFilter({ ...filter, orderBy: filter.orderBy === "asc" ? "desc" : "asc" });
        } else {
            setFilter({ ...filter, sortBy: field });
            setFilter({ ...filter, orderBy: "asc" });
        }
        getList(1, keyword);
    }

    const getList = (page?: any, keyword?: any) => {
        let obj: any = {};
        obj.offset = page - 1;
        obj.keyword = keyword;
        obj.limit = limit;
        obj.order_by = filter.orderBy;
        obj.sort_by = filter.sortBy;
        WebService.getAPI({
            action: "/user-list",
            body: obj
        })
            .then((res: any) => {
                if (res && res.list) {
                    setlist(res.list);
                    // setLoader(true);
                    setCount(res.count);
                }
            })
            .catch((error: any) => {
                // toast.error(error);
                //   setLoading(false);
            });
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <div className="row align-items-center">
                                <h6>User List</h6>
                                <div className="col-12 col-md-4 mb-2 mb-md-0">
                                    <Search keyword={keyword} setKeyword={setKeyword} />
                                </div>
                                <div className="col-12 col-md-8 d-grid d-md-flex justify-content-md-end">
                                    <button className="btn btn-primary" onClick={() => { setModelName({ name: "AddEditUser", id: 0 }) }}>Add</button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive p-0" style={{ height: '400px' }}>
                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        {/*  ps-2 */}
                                        <th
                                            className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                            onClick={() => handleSort('first_name')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Name
                                            {filter.sortBy === 'first_name' && (filter.orderBy === 'asc' ? <i className="fa fa-sort-up ms-1"></i> : <i className="fa fa-sort-down ms-1"></i>)}
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Number/Address</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                                </thead>

                                {/*  className={!loader ? 'table-loader' : ''} loader && */}
                                <tbody>
                                    {list.map((value: any, index: number) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        {
                                                            value.photo === "" ?
                                                                <img src={tim} className="avatar avatar-sm me-3" alt={value.userName} />
                                                                :
                                                                <img src={value.photo} className="avatar avatar-sm me-3" alt={value.userName} />
                                                        }
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">{value.userName}</h6>
                                                        <p className="text-xs text-secondary mb-0">{value.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">{value.phone}</p>
                                                <p className="text-xs text-secondary mb-0">{value.address},{value.city_name},{value.state_name},{value.country_name}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className={`badge badge-sm bg-gradient-${value.status === '0' ? 'secondary' : 'success'}`}>{value.status === '0' ? 'DeActive' : 'Active'}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{value.date}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="dropdown">
                                                    <button
                                                        className="btn btn-primary mb-0 px-3"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="fa fa-ellipsis-v text-xs"></i>
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <button className="dropdown-item" onClick={() => setModelName({ name: "AddEditUser", id: value.id })}>
                                                            <i className="fa fa-pencil text-dark fs-16 align-middle me-2"></i>
                                                            Edit
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => setModelName({ name: "Modal", id: value.id })}>
                                                            <i className={value.status === 0 ? "fa-solid fa-check text-dark fs-16 align-middle me-2" : "fa-solid fa-circle-xmark text-dark fs-16 align-middle me-2"}></i>
                                                            {value.status === 0 ? "Active" : "DeActive"}
                                                        </button>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {
                                        list?.length === 0 &&
                                        <tr>
                                            <td colSpan={5} className="text-center alert btn-primary text-white">No data found!</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            list.length > 0 &&
                            <div className="card-footer text-muted">
                                <Pagination
                                    totalItems={count}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        }

                    </div>
                </div>
            </div>
            <Modal size="md" isOpen={modelName.name === 'Modal'} centered>
                <ModalHeader
                    className="mb-2"
                    toggle={() => setModelName({ name: "", id: 0 })}
                >
                    Are you sure you want to do this action?
                </ModalHeader>
                <ModalFooter className="border-top p-2">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => setModelName({ name: "", id: 0 })}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            id="manage-user-modal-submit-btn"
                            className="btn btn-primary"
                            onClick={() => changeStatus(modelName.id)}
                        >
                            Ok
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default Userlist;