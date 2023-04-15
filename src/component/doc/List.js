// import React from 'react'

// import { Link } from 'react-router-dom'
// import { collection, query, where, getDocs } from "firebase/firestore";
// import bg from './qq.png'
// // import{authurId,auth,projects} from ".../store/projectActions"
// // import { doc} from "firebase/firestore"; 


// // const q = query(collection('projects'), where(projects.authurId, "==" ,auth.uid, "==", true));

// const List = ({projects, auth}) => {
  
//   // console.log(doc.id, " => ", doc.data());

//   return (
    
//      <div className="project-list section" style={{backgroundColor:"transparent"}}>
//       <div className='left'>
//         <p style={{color:'gray'}}>รายชื่อผู้เข้ารับการครวร</p>
//       </div>
//       <div className='right'>
//         <p  style={{color:'gray',marginRight:'50px'}}>แพทย์เจ้าของไข้</p>
//       </div>
//       <div className='right'>
//         <p style={{color:'gray',marginRight:'30px'}} >วันที่ตรวจ</p>
//       </div>
//       <br></br>
//       <br></br>
//       { projects && projects.map(project => {
//         console.log(auth.uid == projects[0].authurId)
//         if (project.authurId === auth.uid) {
//           return (
//             <Link to={'/project/' + project.id} key={project.id}>
//                <div className="card z-depth-0 project-summary" style={{ borderRadius:"20px", backgroundColor:"white",height:'9vh' }}>
//       <div className="card-content grey-text text-darken-3">
//       <div className='left'>
//         <span className="card-title " style={{fontSize:'25px'}}>{project.firstName} {project.lastName} </span>
//         </div>
//         <div className='right' >
//         <p className="grey-text" style={{fontSize:'15px'}}>Posted by {project.authorFirstName} {project.authorLastName}</p>
//         </div>
        
//         <div className='right'>
//         <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
//         </div>
//       </div>
//     </div>
//               project={project}
//             </Link>
//           )

//         }
       
//       })}  
//     </div>
    
    
//   )
//     }
    


// export default List
 