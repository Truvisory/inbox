import React from 'react';

const Toolbar = (props) => {
  const disabledWhenNothingSelected = props.selectedIndicator === 0 ? "disabled" : ""
    return ( 
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{props.unreadCount}</span>
            unread messages
          </p>

          <a className="btn btn-danger" href="/#">
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={props.bulkSelect}>
            <i 
              className={props.selectedIndicator === props.messageCount 
                ? "fa fa-check-square-o"
                : props.selectedIndicator === 0
                  ? "fa fa-square-o" 
                  : "fa fa-minus-square-o"}>
            </i>
          </button>

          <button 
            className="btn btn-default"
            disabled={disabledWhenNothingSelected} 
            onClick={props.markedRead}>Mark As Read</button>

          <button 
            className="btn btn-default"
            disabled={disabledWhenNothingSelected}
            onClick={props.markedUnread}>Mark As Unread</button>

          <select 
            className="form-control label-select" 
            disabled={disabledWhenNothingSelected} 
            onChange={props.applyLabel}>
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
          </select>

          <select 
            className="form-control label-select" 
            disabled={disabledWhenNothingSelected} 
            onChange={props.removeLabel}>
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
          </select>

          <button 
            className="btn btn-default" 
            disabled={disabledWhenNothingSelected} 
            onClick={props.delete}>
              <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
}

export default Toolbar