import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios'
import { isPrescriptionSend } from '../utils/patientSlice';

const generatePdfFromContent = (contentElement, pdfFileName, email)=> async(dispatch) => {
  const pdf = new jsPDF('p', 'pt', 'a4');
  const content = contentElement;

  html2canvas(content, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 40, 40, 500, 400); // Adjust position and dimensions as needed

    

    // Convert the PDF to a blob
    const pdfBlob = pdf.output('blob');

    // Create a FormData object to send the PDF to the backend
    const formData = new FormData();
    formData.append('pdf', pdfBlob, pdfFileName);

    axios.post(`https://backend-app-n7as.onrender.com/api/v1/pdf-send?email=${email}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => {
        dispatch(isPrescriptionSend(true))
        console.log('PDF sent to backend:', response.data);
      })
      .catch(error => {
        console.error('Error sending PDF to backend:', error);
      });
  });
};

export default generatePdfFromContent;
