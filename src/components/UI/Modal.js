import styles from "./Modal.module.css";
function Modal(props) {
  return (
    <div>
      <div>
        <div className={styles.overlay} onClick={props.cancel}></div>
      </div>
      <div className={styles.modal}>
        <p>Do you really want to delete?<span className={styles.item_name}>{props.item.name}</span></p>
        <div className={styles.actions}>
        <button onClick={props.delete}>Delete</button>
        <button onClick={props.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
