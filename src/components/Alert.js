function Alert({ message, timeout }) {
    const [showAlert, setShowAlert] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, timeout);
  
      return () => {
        clearTimeout(timer);
      };
    }, [timeout]);
  
    return showAlert ? (
      <div className="alert-error">
        <p>{message}</p>
      </div>
    ) : null;
  }