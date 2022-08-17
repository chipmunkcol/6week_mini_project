import React from 'react';
import Router from './route/router';
import './App.css';
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "./shared/firebase";
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

function App() {

// const uploadFB = async (e) => {
//   console.log(e.target.files)
//   const uploaded_file = await uploadBytes(
//     ref(storage, `images/${e.target.files[0].name}`),
//     e.target.files[0]
//   );
//   console.log(uploaded_file)

//   const file_url = await getDownloadURL(uploaded_file.ref)

//   console.log(file_url)
// } 

  return (
    <div className="App">
      {/* <div>
            <input type="file" 
            onChange={uploadFB}
            />

      </div> */}
      <Router />
      
      
    </div>
  );
}

export default App;
