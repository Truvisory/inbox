import React from 'react';

const Toolbar = (props) => {
    return ( 
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <a className="btn btn-danger" href="/#">
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={props.bulkSelect}>
            <i className="fa fa-minus-square-o"></i>
          </button>

          <button className="btn btn-default" onClick={props.markedRead}>Mark As Read</button>

          <button className="btn btn-default" onClick={props.markedUnread}>Mark As Unread</button>

          <select className="form-control label-select" onChange={props.applyLabel}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={props.removeLabel}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={props.delete}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
}

export default Toolbar