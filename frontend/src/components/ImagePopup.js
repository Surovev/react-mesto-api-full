
function ImagePopup (props) {
  return (
    <div className={`${props.stateImgPopup === null ? 'popup_hidden' : ''} popup popup_type_img js-popup-img`}>
      <div className='popup-img'>
        <img className='popup-img__background-img' src={props.stateImgPopup?.link} alt='#' />
        <p className='popup-img__subtitle'>{props.stateImgPopup?.name}</p>
        <button onClick={props.isClose} className='btn btn_type_close' type='button' />
      </div>
    </div>
  );
}

export default ImagePopup;
