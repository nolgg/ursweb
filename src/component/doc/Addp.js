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

  const getUserId = () => {
    // Get the current user from Firebase Authentication.
    const user = firebase.auth().currentUser;
    
    // If the user is authenticated, return their ID.
    if (user) {
      return user.uid;
    } else {
      // If the user is not authenticated, throw an error.
      throw new Error('User is not authenticated');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const randomId = db.collection('projects').doc().id;
    const storageRef = firebase.storage().ref();
    const userId = getUserId();
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const firstName = userDoc.data().firstName;
    const lastName = userDoc.data().lastName;
  
    const imageUrls = [];
    for (const image of selectedImages) {
      const imageRef = storageRef.child(`${randomId}/${image.name}`);
      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();
      imageUrls.push(imageUrl);
    }
  
    db.collection('projects')
      .doc(randomId)
      .set({
        ...inputValues,
        userId: userId, 
        firstnamedoc: firstName,
        lastnamedoc: lastName,
        imageUrls: imageUrls,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
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
      Ai: "1",
      IDcard: '',
    });
    setSelectedImages([]);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: name === 'age' || name === 'WBC' || name === 'gravity' || name === 'ph' || name === 'glu' || name === 'calox1' || name === 'WBC1' || name === 'RBC' || name === 'IDcard' ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 15); // limit selected files to maximum of 15
    setSelectedImages(files);
  };

  return (

    <form  onSubmit={handleSubmit}>
      <h1 className='textADD'>ADD</h1>
      <h1 className='textADD1'>PATIENT</h1>
      <div  className="center">
      <div className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}} >
        <label htmlFor="IDcard">IDcard</label>
        <input 
        
          id="IDcard"
          type="number"
          name="IDcard"
          value={inputValues.IDcard}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}} >
        <label htmlFor="firstName">First Name:</label>
        <input 
        
          id="firstName"
          type="text"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}}>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
        />
      </div>

      <div  className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}}>
        <label htmlFor="age">Age:</label>
        <input id="age"
 type="number"
 name="age"
 value={inputValues.age}
 onChange ={handleInputChange}
        />
       </div>

<div  className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}} >
  <label htmlFor="WBC">WBC:</label>
  <input
    id="WBC"
    type="number"
    name="WBC"
    value={inputValues.WBC}
    onChange={handleInputChange}
  />
</div>
<div  className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}}>
  <label htmlFor="blood">Blood:</label>
  <input
    id="blood"
    type="number"
    name="blood"
    value={inputValues.blood}
    onChange={handleInputChange}
  />
</div>
<div  className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}}>
  <label htmlFor="gravity">Gravity:</label>
  <input
    id="gravity"
    type="number"
    name="gravity"
    value={inputValues.gravity}
    onChange={handleInputChange}
  />
</div>
<div  className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}}>
  <label htmlFor="ph">pH:</label>
  <input
    id="ph"
    type="number"
    name="ph"
    value={inputValues.ph}
    onChange={handleInputChange}
  />
</div>
<div  className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}}>
  <label htmlFor="glu">Glucose:</label>
  <input
    id="glu"
    type="number"
    name="glu"
    value={inputValues.glu}
    onChange={handleInputChange}
  />
</div>
<div className="input-field"  style={{borderRadius:"20px",backgroundColor:"white", width:"1000px"}}>
  <label htmlFor="ketone">Ketones:</label>
  <input
    id="ketone"
    type="number"
    name="ketone"
    value={inputValues.ketone}
    onChange={handleInputChange}
  />
</div>
</div>

<div className='left' >
<br></br>
<br></br>
  <label htmlFor="images">Images:</label>
  <br></br>
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
  <br></br>
   <br></br>
<button  type="submit"  
style=
{{borderRadius:"10px",backgroundColor:" #1776CF", width:"100px",color:"white"
}}
 >Submit</button>
</div>

</form>

   
   );
  };

export default Addp;