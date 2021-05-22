import React from 'react';
import errorIcon from '../blocks/infoToolTip/error.svg';
import okIcon from '../blocks/infoToolTip/ok.svg';

function InfoTooltip (props) {
  let icon;
  if (props.type === 'ok') {
    icon = okIcon;
  } else {
    icon = errorIcon;
  }
  return (
    <div className={`popup ${!props.isOpen ? 'popup_hidden' : ''}`}>

      <form onSubmit={props.onSubmit} className='info-tool-tip' noValidate>
        <img className='info-tool-tip__icon' src={icon} alt="icon" />
        <h3 className='info-tool-tip__title'>{props.text}</h3>
        <button onClick={props.isClose} className='btn btn_type_close' type='button' />

        {/* {props.children}
        <button className='btn btn_type_text js-place-submit'>{props.btnName}</button> */}
      </form>
    </div>
  );
}

export default InfoTooltip;
