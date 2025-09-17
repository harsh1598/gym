
import { Offcanvas } from "react-bootstrap";

interface propData {
  show: boolean,
  onCloseClick: any,
}

const AddEditUser = (props: propData) => {

  return (
    <>
      <Offcanvas show={props.show} placement={"end"} onHide={props.onCloseClick} className="size-md">
        <Offcanvas.Header closeButton className="border">
          <Offcanvas.Title className="text-dark">{"Add User"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        </Offcanvas.Body>
        <div className="offcanvas-footer border-top p-3 text-center hstack gap-2 justify-content-end">
          <button type="submit" className="btn btn-color text-color" id="add-user-submit-btn">
            Submit
          </button>
          <button className="btn btn-light" >
            Cancel
          </button>
        </div>
      </Offcanvas>
    </>
  );
}

export default AddEditUser;