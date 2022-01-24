import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ContactComponent from './Contact';


function Contact() {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    //hook to hold it
    const [mailerURL, setMailerUrl] = useState("");

    //Mailer notification
     const sendMail = (message, url, subject) => {
       const data = {
         email: `bangulo219@gmail.com`,
         subject: "Message received via GPUTrackIT",
         message: `You have received a message with the following subject: ${subject}. And the following body: ${message}`,
       };
       fetch(url, {
         method: "POST",
         mode: "cors",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       }).catch(console.error);
     };

    const onSubmit = (data) => {
    }

    return (
      <ContactComponent 
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      Controller={Controller}
      onSubmit={onSubmit}
      />
    );
}

export default Contact;