import React, {useState , useRef} from 'react';
import './resumeForm.css';


function ResumeForm({onResult}){

    const [name, setName] =useState('');
    const [email, setEmail] =useState('');
    const [jobDescription, setJobDescription] =useState('');
    const [resumeFile, setResumeFile] =useState(null);
    const [loading,setLoading]=useState(false);
    const fileInputRef =useRef(null);
    const API_BASE = process.env.REACT_APP_API_BASE_URL;
    
    const handleSubmit =async (e)=>{
        e.preventDefault();

        const formData= new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('jobDescription', jobDescription);
        formData.append('resume', resumeFile);

        setLoading(true);
        try {
             const res = await fetch(`${API_BASE}/api/submitResume`,{
                method:"POST",
                body: formData
             });

            const data = await res.json();
            console.log(data);
            if(data.message){
                alert(data.message.message);
            }else{
                alert("Resume uploaded, but no message returned");
            }

            const responseData = data.message.resumedata;
            onResult(responseData);
            setName('');
            setEmail('');
            setJobDescription('');
            fileInputRef.current.value =null;
        
        }
        catch(err){
            console.error("upload failed",err);
        }

        setLoading(false);
    };



    if (loading) {
    return (
        <div className="loader-container">
        <div className="spinner"></div>
        <p>Analyzing resume, please wait...</p>
        </div>
    );
    }
    return (    
       
       
        <div className="resumeform">        
         <h1 id ="head"> Resume Scanner</h1>
        <form className="classy" onSubmit={handleSubmit} encType="multipart/form-data">

            <label> Name </label>
            <input 
                type="text"
                value ={name}
                onChange={(e)=> setName(e.target.value)}
                name="name"
                /><br/>
            
            <label> Email</label>
            <input 

                type="email"
                value ={email}
                onChange={(e)=> setEmail(e.target.value)}
                name="email"
                /><br/>

            <label> Job Description</label>
            <textarea
                value ={jobDescription}
                onChange={(e)=> setJobDescription(e.target.value)}
                name="jobDescription"
                /><br/>

            <label> Resume :</label><br/>
            <input 
                type="file" 
                accept= ".pdf, .doc, .docx"
                onChange={(e)=> setResumeFile(e.target.files[0])}
                name="resume"
                ref={fileInputRef}
                /> <br/>

            <button id="submit" type ="submit"> Submit</button>

        </form>

        
        </div>
         
    )
}

export default ResumeForm;