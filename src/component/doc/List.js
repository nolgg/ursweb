import React from 'react'
import moment from 'moment'
const List = ({project}) => {
    return (
      <div className="card z-depth-0 project-summary" style={{ borderRadius:"20px", backgroundColor:"white",height:'9vh' }}>
        <div className="card-content grey-text text-darken-3">
        <div className='left'>
          <span className="card-title " style={{fontSize:'25px'}}>{project.firstName} {project.lastName} </span>
          </div>
          <div className='right' >
          <p className="grey-text" style={{fontSize:'15px'}}>Posted by {project.authorFirstName} {project.authorLastName}</p>
          </div>
          
          <div className='right'>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
          </div>
        </div>
      </div>
    )
  }