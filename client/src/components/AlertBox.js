import "../styles/alert.css";

function AlertBox({

  message,
  type,
  onClose,

}) {

  return (
    <div className="alert-overlay">

      <div
        className={`alert-box ${type}`}
      >

        <h3>
          {
            type === "success"
              ? "Success"
              : "Error"
          }
        </h3>

        <p>
          {message}
        </p>

        <button
          onClick={onClose}
        >
          OK
        </button>

      </div>

    </div>
  );
}

export default AlertBox;