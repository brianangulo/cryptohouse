import React, { useState, useEffect } from 'react';
import { ToastAndroid, Platform, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import ContactComponent from './Contact';
import { db } from "../../firebase/firebase";
import * as firebase from "firebase";
import "firebase/firestore";


function Contact() {

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
    //Firebase Url reference
    const url = db.collection("url").doc("url");
    //hook to hold it
    const [mailerURL, setMailerUrl] = useState("");
    //hook to update on mount
    useEffect(
      () => {
        //Getting post url from FB
        url
          .get()
          .then((doc) => {
            setMailerUrl(doc.data().url);
          })
          .catch(console.error);
      }, []
    )

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

      console.log(data); 
      
      db.collection("contactus")
        .add({
          timestamp: firebase.firestore.Timestamp.now(),
          subject: data.subject,
          body: data.body,
        })
        .then(() => {
          console.log("Document successfully written!");
         if (Platform.OS === "ios") {
            Alert.alert("Message succesfully sent!");
         } else {
           ToastAndroid.show("Message succesfully sent", ToastAndroid.LONG);
         }
          reset()
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
           if (Platform.OS === "ios") {
             Alert.alert(`Error writing document: ${error}`);
           } else {
             ToastAndroid.show(
               `Error writing document: ${error}`,
               ToastAndroid.LONG
             );
           }
          
        });
        sendMail(data.body, mailerURL, data.subject);
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