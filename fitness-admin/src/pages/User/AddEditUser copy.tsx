import React, { useEffect, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useForm } from "react-hook-form";
// Images
import tim from "../../assets/img/tim.png";
import WebService from "../../utility/WebService";
import toast from "react-hot-toast";
import Select from "../../components/Select/Select";
import { status } from "../../components/common/list";

interface propData {
    show: boolean,
    handleClose: any,
    modalData: any
    getlist: any
    id: any
}

const AddEditUser = (props: propData) => {

    const [image, setImage] = useState<any>();
    const [previewImage, setPreviewImage] = useState<any>();

    const [cities, setCities] = useState<any>([]);
    const [states, setStates] = useState<any>([]);
    const [countries, setCountries] = useState<any>([]);

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getCitiesList();
        getStatesList();
        getCountriesList();
        if (props.id) {
            getUserDetails(props.id);
        }
    }, []);

    const oncloseBlade = () => {
        reset({});
        props.handleClose();
    };

    const handleChange = (name: string, object: any) => {
        return object;
    }

    const AddEditUser = (data: any) => {
        if (props.id > 0) {
            // Update existing user
            var obj: any = {};
            obj.id = props.id
            WebService.putAPI({
                action: `/update-user`,
                body: data,
                id: "add-user-submit-btn",
            })
                .then((res: any) => {
                    // console.log(res);
                    toast.success(res.message);
                    if (image && res.id) {
                        uploadlogo(res.id);
                    }
                    if (!image) {
                        props.handleClose(!props.show);
                    }
                    props.getlist();
                })
                .catch((e) => {
                    // console.log(e.message);
                    // setLoading(false);
                });
        } else {
            // Add new user
            WebService.postAPI({
                action: `/save-user`,
                body: data,
                id: "add-user-submit-btn",
            })
                .then((res: any) => {
                    toast.success(res.message);
                    if (image && res.id) {
                        uploadlogo(res.id);
                    }
                    if (!image) {
                        props.handleClose(!props.show);
                    }
                    props.getlist();
                })
                .catch((e) => {
                    // console.log(e.message);
                    // setLoading(false);
                });
        }
    };

    const onLoadImage = (e: any) => {
        const { files } = e.target;
        if (files && files[0]) {
            setImage(files[0]);
        }
        e.target.value = '';

        // to load image preview
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreviewImage(e.target?.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    }

    const uploadlogo = (id: any) => {

        WebService.fileUploadAPI({
            action: "/user-image-upload",
            key: "photo",
            file: image,
            body: {
                id: id,
            },
        })
            .then((res: any) => {
                if (res && res.status === "success") {
                    toast.success(res.message);
                    props.handleClose(!props.show);
                } else {
                    toast.error(res.message);
                }

            })
            .catch((e) => {
            });
    }

    const getUserDetails = (id: any) => {
        let obj = {
            id: id,
        };
        WebService.getAPI({
            action: `/user-details`,
            body: obj,
        })
            .then((res: any) => {
                if (res && res.result) {
                    reset(res.result);
                    // setImage(res.result.photo);
                    setPreviewImage(res.result.photourl);
                }
            })
            .catch((error: any) => {
                // toast.error(error);
                //   setLoading(false);
            });
    }

    const getCitiesList = () => {
        WebService.getAPI({
            action: "/cities-list",
        })
            .then((res: any) => {
                if (res && res.list) {
                    setCities(res.list);
                }
            })
            .catch((error: any) => {
                // toast.error(error);
                //   setLoading(false);
            });
    }

    const getStatesList = () => {
        WebService.getAPI({
            action: "/states-list",
        })
            .then((res: any) => {
                if (res && res.list) {
                    setStates(res.list);
                }
            })
            .catch((error: any) => {
                // toast.error(error);
                //   setLoading(false);
            });
    }

    const getCountriesList = () => {
        WebService.getAPI({
            action: "/countries-list",
        })
            .then((res: any) => {
                if (res && res.list) {
                    setCountries(res.list);
                }
            })
            .catch((error: any) => {
                // toast.error(error);
                //   setLoading(false);
            });
    }

    return (
        <>
            <Offcanvas show={props.show} placement={"end"} onHide={props.handleClose} className="size-md">
                <form onSubmit={handleSubmit(AddEditUser)} className="d-flex flex-column justify-content-end h-100">
                    <Offcanvas.Header closeButton className="bg-gradient-dark_theme">
                        <Offcanvas.Title className="text-white">{props.id > 0 ? "Edit User" : "Add User"}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="row">
                            <div className="form-group mb-2">
                                <div className="d-flex justify-content-center mb-4">
                                    <img id="selectedAvatar" src={previewImage ? previewImage : image ? image : tim}
                                        className="rounded-circle" style={{ width: "60px", height: "60px", objectFit: "cover" }} alt="User Photo" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="btn uploadBtn btn-primary">
                                        <input
                                            id="upload_device"
                                            type="file"
                                            className='input cursor-pointer'
                                            // accept="image/*" // this for only show image files
                                            onChange={(e: any) => {
                                                onLoadImage(e);
                                            }}
                                        />
                                        <span className="text-white ms-1 text-truncate">{previewImage ? "Update Photo." : image ? "Update Photo." : "Upload Photo."}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input
                                        type="text"
                                        {...register("first_name", { required: true })}
                                        className="form-control"
                                        id="emailInput"
                                        placeholder="Enter Your First Name"
                                    />
                                    {errors.first_name && <span className="text-danger">First Name is required</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        {...register("last_name", { required: true })}
                                        className="form-control"
                                        id="last_nameInput"
                                        placeholder="Enter Your Last Name"
                                    />
                                    {errors.last_name && <span className="text-danger">Last Name is required</span>}
                                </div>
                            </div>
                            {
                                props.id === 0 &&
                                <>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                {...register("email", { required: true })}
                                                className="form-control"
                                                id="emailInput"
                                                placeholder="Enter Email : name@example.com"
                                            />
                                            {errors.email && <span className="text-danger">Email is required</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                {...register("password", { required: true })}
                                                className="form-control"
                                                id="passwordInput"
                                                placeholder="Enter Your Password"
                                            />
                                            {errors.password && <span className="text-danger">Password is required</span>}
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="number"
                                        {...register("phone", { required: true })}
                                        className="form-control"
                                        id="phoneInput"
                                        placeholder="Enter Your Phone Number"
                                    />
                                    {errors.phone && <span className="text-danger">Phone is required</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="address"
                                        {...register("address", { required: true })}
                                        className="form-control"
                                        id="addressInput"
                                        placeholder="Enter Your Address"
                                    />
                                    {errors.address && <span className="text-danger">Address is required</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="countries_id">Country</label>
                                    <Select
                                        id="countries_id"
                                        name="countries_id"
                                        options={countries}
                                        className="form-select"
                                        placeholder="Select Country"
                                        onChange={(value: string) => {
                                            setValue("countries_id", value);
                                            handleChange("countries_id", { required: true });
                                        }}
                                        defaultValue={props.id ? register("countries_id") : ""}
                                    />
                                    <div>
                                        {errors.countries_id && (
                                            <span className="text-danger fs-12">Please Select Country</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="states_id">State</label>
                                    <Select
                                        id="states_id"
                                        name="states_id"
                                        options={states}
                                        className="form-select"
                                        placeholder="Select State"
                                        onChange={(value: string) => {
                                            setValue("states_id", value);
                                            handleChange("states_id", { required: true });
                                        }}
                                        defaultValue={props.id ? register("states_id") : ""}
                                    />
                                    <div>
                                        {errors.states_id && (
                                            <span className="text-danger fs-12">Please Select State</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="cities_id">City</label>
                                    <Select
                                        id="cities_id"
                                        name="cities_id"
                                        options={cities}
                                        className="form-select"
                                        placeholder="Select City"
                                        onChange={(value: string) => {
                                            setValue("cities_id", value);
                                            handleChange("cities_id", { required: true });
                                        }}
                                        defaultValue={props.id ? register("cities_id") : ""}
                                    />
                                    <div>
                                        {errors.cities_id && (
                                            <span className="text-danger fs-12">Please Select City</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <Select
                                        id="status"
                                        name="status"
                                        options={status}
                                        className="form-select"
                                        placeholder="Select Status"
                                        onChange={(value: string) => {
                                            setValue("status", value);
                                            handleChange("status", { required: true });
                                        }}
                                        defaultValue={props.id ? register("status") : ""}

                                    />
                                    <div>
                                        {errors.status && (
                                            <span className="text-danger fs-12">Please Select File Type</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Body>
                    <div className="offcanvas-footer border-top p-3 text-center hstack gap-2 justify-content-end">
                        <button type="submit" className="btn btn-primary" id="add-user-submit-btn">
                            Submit
                        </button>
                        <button className="btn btn-secondary" onClick={() => {
                            oncloseBlade()
                        }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Offcanvas>
        </>
    );
}

export default AddEditUser;