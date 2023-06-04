import { useState, useContext, createContext } from 'react';

export const AlertContext = createContext({
  type: "",
  message: "",
  visible: null,
  showAlert: () => {},
  hideAlert: () => {},
});

export function AlertProvider(props) {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  function showAlert(msg, _type, hideTimeout) {
    if (_type === null) {
      setType("");
    } else {
      setType(_type);
    }

    if (msg !== undefined) {
      setMessage(msg);
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (hideTimeout) {
      const id = setTimeout(() => setVisible(false), hideTimeout);
      setTimeoutId(id);
    }

    setVisible(true);
  }

  function hideAlert() {
    setVisible(false);
  }

  return (
    <AlertContext.Provider value={{
      type, message, visible, showAlert, hideAlert,
    }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default function Alert() {
  const { type, message, visible } = useContext(AlertContext);

  if (visible) {
    const classes = type ? (" alert-" + type) : "";
    return (<div className={"alert" + classes}>
      <h2>{message}</h2>
    </div>);
  }

  return null;
}
