import React, { useState } from 'react';
import { Router, Switch, Route, Redirect, Link } from "react-router-dom";
//import { firebase } from "firebase/firestore"
import  firebase  from 'firebase/compat/app';
import "./Addp.css"
import 'firebase/compat/storage';


const Addp = () => {
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    WBC: '',
    blood: '',
    gravity: '',
    ph: '',
    glu: '',
    ketone: '',
    calox1: '0',
    WBC1: '0',
    RBC: '0',
    Sq: '0',
    Ai: "1"
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const randomId = db.collection('projects').doc().id;
    const storageRef = firebase.storage().ref();
    const imageUrls = [];

    // upload selected images to firebase storage and convert to base64
    for (const image of selectedImages) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      const imageUrlPromise = new Promise((resolve) => {
        reader.onload = (event) => {
          resolve(event.target.result);
        };
      });
      const imageUrl = await imageUrlPromise;
      const imageRef = storageRef.child(`images/${randomId}/${image.name}`);
      await imageRef.putString(imageUrl, 'data_url');
      imageUrls.push(await imageRef.getDownloadURL());
    }

    // save the form data along with the image urls to the firestore database
    db.collection('projects')
      .doc(randomId)
      .set({
        ...inputValues,
        images: imageUrls, // add the urls of the uploaded images to the firestore document
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    // reset the form and selected images
    setInputValues({
      firstName: '',
      lastName: '',
      age: '',
      WBC: '',
      blood: '',
      gravity: '',
      ph: '',
      glu: '',
      ketone: '',
      calox1: '0',
      WBC1: '0',
      RBC: '0',
      Sq: '0',
      Ai: "1"
    });
    setSelectedImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: name === 'age' || name === 'WBC' || name === 'gravity' || name === 'ph' || name === 'glu' || name === 'calox1' || name === 'WBC1' || name === 'RBC' ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 15); // limit selected files to maximum of 15
    setSelectedImages(files);
  };

  return (
    <form className="medical-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input id="age"
 type="number"
 name="age"
 value={inputValues.age}
 onChange ={handleInputChange}
        />
       </div>

<div>
  <label htmlFor="WBC">WBC:</label>
  <input
    id="WBC"
    type="number"
    name="WBC"
    value={inputValues.WBC}
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="blood">Blood:</label>
  <input
    id="blood"
    type="text"
    name="blood"
    value={inputValues.blood}
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="gravity">Gravity:</label>
  <input
    id="gravity"
    type="number"
    name="gravity"
    value={inputValues.gravity}
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="ph">pH:</label>
  <input
    id="ph"
    type="number"
    name="ph"
    value={inputValues.ph}
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="glu">Glucose:</label>
  <input
    id="glu"
    type="number"
    name="glu"
    value={inputValues.glu}
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="ketone">Ketones:</label>
  <input
    id="ketone"
    type="text"
    name="ketone"
    value={inputValues.ketone}
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="images">Images:</label>
  <input
  id="images"
  type="file"
  name="images"
  accept="image/*"
  multiple={true}
  onChange={(e) => {
    handleImageChange(e);
  }}
  />
</div>
<button type="submit">Submit</button>
</form>
   
   );
  };

export default Addp;