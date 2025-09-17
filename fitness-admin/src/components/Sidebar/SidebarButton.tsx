import { useState } from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";

const SidebarButton = () => {

    const [isshow, setIsShow] = useState<any>(false);

    const switchGradient = (theme: string) => {
        let newGradient = theme;
        document.documentElement.style.setProperty('--theme-color', newGradient);
    };

    const switchColor = (theme: string) => {
        let newGradient = theme;
        document.documentElement.style.setProperty('--font-color', newGradient);
    };

    return (
        <div className="sidebar-bottom-btn-wrapper">
            <button className="sidebar-bottom-btn" type="button" onClick={() => setIsShow(true)}>
                <i className="fa-solid fa-gear"></i>
            </button>
            <Offcanvas show={isshow} placement={"end"} onHide={() => setIsShow(false)} className="size-md">
                <Offcanvas.Header closeButton className="border">
                    <Offcanvas.Title className="text-dark">Theme Setting</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className="align-items-center mb-3">
                        <Col xs={6} md={10}>
                            <label htmlFor="themeColor" className="me-2 mb-0">Theme color</label>
                        </Col>
                        <Col xs={6} md={2}>
                            <input
                                type="color"
                                id="themeColor"
                                defaultValue="#344767"
                                className="form-control form-control-color p-0"
                                onChange={(e) => {
                                    const selectedColor = e.target.value;
                                    switchGradient(`linear-gradient(310deg, ${selectedColor} 0%, ${selectedColor} 100%)`);
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className="align-items-center">
                        <Col xs={6} md={10}>
                            <label htmlFor="fontColor" className="me-2 mb-0">Font color</label>
                        </Col>
                        <Col xs={6} md={2}>
                            <input
                                type="color"
                                id="fontColor"
                                defaultValue="#fff"
                                className="form-control form-control-color p-0"
                                onChange={(e) => {
                                    const selectedColor = e.target.value;
                                    switchColor(selectedColor); // For font color you don't need gradient
                                }}
                            />
                        </Col>
                    </Row>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top p-3 text-center hstack gap-2 justify-content-end">
                    <button type="submit" className="btn btn-color text-color" id="add-user-submit-btn">
                        Submit
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsShow(false)}>
                        Cancel
                    </button>
                </div>
            </Offcanvas>
        </div>
    );
};

export default SidebarButton;
