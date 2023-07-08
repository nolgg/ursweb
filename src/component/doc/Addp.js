import React, { useState } from 'react';
import { Router, Switch, Route, Redirect, Link, useHref } from "react-router-dom";
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

  // Calculate the total size of all selected images
  const totalSize = selectedImages.reduce((acc, image) => acc + image.size, 0);

  // Use Promise.all to upload all images simultaneously and get their download URLs
  const uploadPromises = selectedImages.map((image) => {
    const imageRef = storageRef.child(`${randomId}/${image.name}`);
    const uploadTask = imageRef.put(image);

    // Return a Promise that resolves with the download URL and size of the uploaded image
    return new Promise((resolve, reject) => {
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // Calculate the current progress of the upload
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress.toFixed(2)}%`);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          // When the upload is complete, get the download URL and resolve the Promise
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => resolve({ url, size: image.size }));
        }
      );
    });
  });

  // Wait for all uploads to complete and collect their results
  const uploadResults = await Promise.all(uploadPromises);

  // Update the progress to 100% once all uploads are complete
  console.log('Upload progress: 100%');

  // Calculate the total size of all uploaded images
  const uploadedSize = uploadResults.reduce((acc, result) => acc + result.size, 0);

  db.collection('projects')
    .doc(randomId)
    .set({
      ...inputValues,
      userId: userId,
      firstnamedoc: firstName,
      lastnamedoc: lastName,
      imageUrls: uploadResults.map((result) => result.url),
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
    Ai: '1',
    IDcard: '',
  });

  setSelectedImages([]);

  // Redirect to "/result" when the submission is complete
  window.location.href = '/result';
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: name === 'age' || name === 'WBC' || name === 'gravity' || name === 'ph' || name === 'glu' || name === 'calox1' || name === 'WBC1' || name === 'RBC' || name === 'IDcard' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length < 15) {
      alert('Please select at least 15 images');
      return;
    }
    setSelectedImages([...selectedImages, ...files]);
  };


  const validate = (values) => {
    const errors = {};
    if (values.images.length > 15) {
      errors.images = 'Please upload at 15 images';
    }
    return errors};
  
  

  return (

    <form  className=" font formhigh center" onSubmit={handleSubmit}>
      
 
      <h1 className='textADD' >เพิ่มผู้เข้ารับการตรวจ </h1>
     
      <div className='from'   >
      <div className="kk input-field"   >
        <label className='center'  htmlFor="IDcard">IDcard</label>
        <input 
      
          id="IDcard"
          type="number"
          name="IDcard"
          value={inputValues.IDcard}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="kk input-field"   >
        <label htmlFor="firstName">First Name:</label>
        <input 
        
          id="firstName"
          type="text"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="kk input-field" >
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div  className="kk input-field"  >
        <label htmlFor="age">Age:</label>
        <input id="age"
 type="number"
 name="age"
 value={inputValues.age}
 onChange ={handleInputChange}
 required
        />
       </div>

<div  className="kk input-field"   >
  <label htmlFor="WBC">* WBC ( 0 - 500 ) :</label>
  <input
    id="WBC"
    type="number"
    name="WBC"
    value={inputValues.WBC}
    onChange={handleInputChange}
  />
</div>
<div  className="kk input-field" >
  <label htmlFor="blood">* Blood ( 0 - 200 ) :</label>
  <input
    id="blood"
    type="number"
    name="blood"
    value={inputValues.blood}
    onChange={handleInputChange}
  />
</div>
<div  className="kk input-field"  >
  <label htmlFor="gravity">* Specific gravity of urine ( 1 - 1.030 ) : </label>
  <input
    id="gravity"
    type="number"
    name="gravity"
    value={inputValues.gravity}
    onChange={handleInputChange}
  />
</div>
<div  className="kk input-field" >
  <label htmlFor="ph">* pH of urine ( 5.0 - 8.5 ) :</label>
  <input
    id="ph"
    type="number"
    step="0.1"
    name="ph"
    value={inputValues.ph}
    onChange={handleInputChange}
  />
</div>
<div  className="kk input-field"  >
  <label htmlFor="glu">* Glucose of urine ( 0 - 110 ) :</label>
  <input
    id="glu"
    type="number"
    name="glu"
    value={inputValues.glu}
    onChange={handleInputChange}
  />
</div>
<div className="kk input-field"  >
  <label htmlFor="ketone">* Ketones of urine ( 0 - 16 ) :</label>
  <input
    id="ketone"
    type="number"
    name="ketone"
    value={inputValues.ketone}
    onChange={handleInputChange}
  />
</div>
</div>

<p className='l left'   >** อัปโหลดรูปภาพที่นี่ : ( 15 ภาพที่ได้จากกล้องจุลทรรศ์ ):</p>
<br></br>
<div className='r right' >

<div className='dotted inputimage' >
  <div className='c' >
  <input 
  id="images"
  type="file"
  name="images"
  accept="image/*"
  required
  multiple={true}
  onChange={(e) => handleImageChange(e)}
  
/>


  </div>
</div>

<br></br>
<button type="submit"  style={{borderRadius:"10px", backgroundColor: "#1776CF", width: "100px", color: "white",marginRight:"1vh"}} >
  
<a  className="font"  style={{ color: "white"}}>  Submit</a>
 
</button>

 </div>



</form>

   
   );
  };

export default Addp;