import React, { useRef, useState } from 'react';
import { db, storage} from '../Firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';

const Form = () => {
  const useFilePickerRef = useRef(null);
  const useNameRef = useRef(null);
  const useAmountRef = useRef(null);
  const useDescriptionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoding] = useState(false);

  const uploadPost = async () => {
    if(loading) return;
    setLoding(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      name: useNameRef.current.value,
      amount: useAmountRef.current.value,
      description: useDescriptionRef.current.value,
      timestamp: serverTimestamp()
    })
    console.log(`New Doc Added with ID: ${docRef.id}`);

    const imgRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imgRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
        })
    });
    setLoding(false);
    setSelectedFile(null);
  }
  const addImageToModle = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
    }
  }

  return (
    <>
      <div className='text-center my-5'>
        <h1 className='text-primary'>Add your Credentials</h1>
      </div>
      <div className='col-lg-8 mx-lg-auto'>
        <div className='row gy-3'>
          <div className='col-lg-6 col-md-11 col-sm-11 col-11 mx-lg-auto mx-md-auto mx-sm-auto mx-auto'>
            
            <div className="card shadow-sm">
            {selectedFile ? (
                <div className='selected_file_img'><img src={selectedFile} onClick={()=> setSelectedFile(null)} className="img-thumbnail" alt="selected/img" />
                  <h4 className='text-center my-3'>File has selected.</h4>
                </div>
              ) : (
                <>
                  <div className='custom_class' onClick={() => useFilePickerRef.current.click()}>
                    <div><svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="#000" viewBox="0 0 16 16"><path fillRule='evenodd' d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/></svg></div>
                    <p className="card-text mt-5">Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB</p>   
                    <div><input type={"file"} hidden onChange={addImageToModle} ref={useFilePickerRef} /></div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className='col-lg-6 col-md-11 col-sm-11 col-11 mx-lg-auto mx-md-auto mx-sm-auto mx-auto'>
            <div className="form-floating">
              <input type="text" className="form-control shadow-sm" ref={useNameRef} id="name" placeholder="Your Name" required />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating my-4">
              <input type="number" className="form-control shadow-sm" ref={useAmountRef} id="amount" placeholder="Set amount" required />
              <label htmlFor="amount">Set Amount</label>
            </div>
            <div className="form-floating">
              <textarea className="form-control shadow-sm" ref={useDescriptionRef} style={{height: "11vh",}} placeholder="Description" id="description"></textarea>
              <label htmlFor="description">Description</label>
            </div>
            <button type='submit' className='mt-3 btn btn-lg w-100 btn-primary' disabled={!selectedFile} onClick={uploadPost}>
              {loading ? <div className="progress">
                <div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                </div> : "Submit"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Form