import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import { email } from '../config/Myservice';
import logo from './logo.png'
import Swal from 'sweetalert2'
const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
};
export default function Preview() {
    const { state } = useLocation();
    console.log(state)
    const ref = React.createRef();
    const sendmail = () => {
        let abc =state.user.remail;
        console.log(abc);
        const input = document.getElementById("divToPrint");
        console.log(input);
        Swal.fire(
            'Good job!',
            'We have sent the  Email On your Email Address....',
            'success'
          )
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            // console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            email(formData).then((res) => {
                console.log(res);
            });
        });
    };

    return (
        <div className="container" >
            <nav class="navbar">
                <div class="container-fluid">
                    <Link to="/dashboard"><button className='btn btn-primary'>Go Back</button></Link>
                    <button className="btn btn-success">
                        <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0} y={0} scale={0.6}>
                            {({ toPdf }) => (
                                <button onClick={() => {
                                    // sendData();
                                    toPdf();
                                  
                                }}  className='btn btn-success'>
                                    Save
                                </button>
                            )}
                        </ReactToPdf>
                    </button>
                    <button onClick={sendmail} className='btn btn-primary'>Send Email</button>

                </div>
            </nav>
            <div ref={ref} id='divToPrint'className="container p-3" style={{border:"2px solid grey",height:"900px",width:"800px"}} >

                <nav class="navbar  navbar-light bg-light" >
                    <div class="container-fluid" style={{ height: "168px" }}>
                        <img src={logo} alt="" height="82px" width=" 185px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                        <h3 style={{ marginRight: "173px", marginTop: "5px" }}>InVoice</h3>
                    </div>
                </nav>
                <div className='row m-0 border'>
                    <div className='col text-left ml-4'>
                        <h6>From</h6>
                        <h5>{JSON.parse(localStorage.getItem('user')).fname} {JSON.parse(localStorage.getItem('user')).lname}</h5>
                        <h5>{JSON.parse(localStorage.getItem('user')).email}</h5>
                        <h5>{JSON.parse(localStorage.getItem('user')).address}</h5>
                        <br />
                        <h6>To</h6>
                        <h5>{state.user.rname}</h5>
                        <h5>{state.user.remail}</h5>
                        <h5>{state.user.raddress}</h5>
                    </div>
                    <div className='col text-right mr-4'>
                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Status</h6>
                        <h5 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "25px" }}>{state.user.status}</h5>
                        <br />
                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Due Date</h6>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.rdate}</h5>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                        <h3 style={{ textAlign: "right", marginRight: "15px" }}>Rs. {state.amount}</h3>
                    </div>

                </div>
                <br />
                <div className="container-fluid">

                    <table class="table m-4">
                        <thead>
                            <tr>
                                <th scope="col">Sr No</th>
                                <th scope="col">Item</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {state.user.product.map((ele, index) =>

                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{ele.title}</td>
                                    <td>{ele.quantity}</td>
                                    <td>{ele.price}</td>
                                    <td>{ele.total}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
