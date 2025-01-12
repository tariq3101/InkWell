import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './ContactUs.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  emailjs.init('n1TjZ4rDTJun0p61t'); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs.send('service_wihzp1d', 'template_3fvp84g', templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        toast.success('Message sent successfully!'); 
      }, (err) => {
        console.error('Failed to send email. Error: ', err);
        toast.error('Failed to send message. Please try again later.'); 
      });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className='contact'>
      <div className="contactUs">
        <h1 className="contactUsTitle">Contact Us</h1>
        <form className="contactUsForm" onSubmit={handleSubmit}>
          <label className="contactUsLabel">Name</label>
          <input 
            type="text" 
            className="contactUsInput" 
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="contactUsLabel">Email</label>
          <input 
            type="email" 
            className="contactUsInput" 
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="contactUsLabel">Message</label>
          <textarea 
            className="contactUsTextarea" 
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="contactUsButton">Send Message</button>
        </form>
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default ContactUs;
