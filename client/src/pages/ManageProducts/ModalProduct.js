import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
function ModalProduct(props) {
  const { dataModal, show, onHide } = props;
  const qrCodeRef = useRef(null);
  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
        onHide();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{dataModal?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="center" ref={qrCodeRef}>
          <QRCode
            value={`${window.location.href}/products/${dataModal?.pId}`}
            size={300}
            className="center"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={downloadQRCode}>
            Download QR Code
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalProduct;
