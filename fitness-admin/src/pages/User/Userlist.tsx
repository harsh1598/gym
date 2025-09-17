import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import Table, { Cell, Row } from '../../components/Table/Table';
import AddEditUser from "./AddEditUser";

const Userlist = () => {
    const [modelName, setModelName] = useState<{ name: string; id: number }>({ name: "", id: 0 });
    const [keyword, setKeyword] = useState("");
    const [rows, setRows] = useState<Row[]>([]);

    const localheaders = [
        { title: "Id", id: "id" },
        { title: "User Name", id: "userName" },
        { title: "Action" },
    ];

    const localdata = [
        { title: "User 1" },
        { title: "User 2" },
    ];

    const actionList = (row: any) => (
        <div className="dropdown">
            <button
                type="button"
                className="btn btn-sm btn-color text-color"
                id={`dropdownMenuButton-${row.id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="fa-solid fa-dice-six"></i>
            </button>
            <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby={`dropdownMenuButton-${row.id}`}
            >
                <li>
                    <a className="dropdown-item" href="#profile">
                        <i className="mdi mdi-account-circle text-muted me-2"></i>
                        Profile
                    </a>
                </li>
            </ul>
        </div>
    );

    const getList = () => {
        const result: Row[] = [];
        localdata.forEach((item, index) => {
            result.push({
                data: [
                    { value: index + 1 }, // ID
                    { value: item.title }, // Name
                    { value: actionList(item) }, // Actions
                ]
            });
        });
        setRows(result);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            {/* Modal */}
            <AddEditUser
                show={modelName.name === "AddEditUser"}
                onCloseClick={() => setModelName({ name: "", id: 0 })}
            />

            {/* Page Content */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white border-0 py-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-md-4 mb-2 mb-md-0">
                                    <Search keyword={keyword} setKeyword={setKeyword} />
                                </div>
                                <div className="col-12 col-md-8 text-md-end">
                                    <button
                                        className="btn btn-color text-color"
                                        onClick={() => setModelName({ name: "AddEditUser", id: 0 })}
                                    >
                                        Add User
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Table
                                Header={true}
                                HeaderList={localheaders}
                                rows={rows}
                                Checkbox={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Userlist;
