const FormComponent = () => {
    const [formData, setFormData] = React.useState('');
    const [message, setMessage] = React.useState('');
  
    const sendStuff = async (event) => {
      event.preventDefault(); // prevent form default event which refreshes the page
      try {
        const response = await fetch('/madlibs', {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=UTF-8',},
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setMessage(await response.json());  // assuming response is JSON
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    const handleChange = (event) => {
      const { id, value } = event.target;
      setFormData((prevFormData) => {
        // Spread the previous state
        const updatedFormData = { ...prevFormData };
        // Update the property corresponding to the provided id with the new value
        updatedFormData[id] = value;
        return updatedFormData; // Return the updated state
      });
    };
  
    return (
      <div>
        <form method="post" onSubmit={sendStuff}>
          <label> Male Person #1: </label><br />
          <input type="text" id="male1" placeholder="Male Person #1" 
                              value={formData.first} onChange={handleChange}></input><br /><br />
          <label> Male Person #2: </label><br />
          <input type="text" id="male2" placeholder="Male Person #2" 
                              value={formData.first} onChange={handleChange}></input><br /><br />
           <label> Female Person #1: </label><br />
          <input type="text" id="female1" placeholder="Female Person #1" 
                              value={formData.first} onChange={handleChange}></input><br /><br />
          <label> Female Person #2: </label><br />
          <input type="text" id="female2" placeholder="Female Person #2" 
                              value={formData.first} onChange={handleChange}></input><br /><br />
          <label> Article of Clothing: </label> <br />
          <input type="text" id="clothes" placeholder="Article of Clothing" 
                              value={formData.last} onChange={handleChange}></input><br /><br />
          <label> Vehicle: </label> <br />
          <input type="text" id="vehicle" placeholder="Vehicle" 
                              value={formData.last} onChange={handleChange}></input><br /><br /><br />
          <input type="submit" value="Generate MadLib!"></input>
        </form>
        {message && (
          <>
          <p>{message.male1}</p>
          <p>{message.male2}</p>
          <p>{message.female1}</p>
          <p>{message.female2}</p>
          <p>{message.clothes}</p>
          <p>{message.vehicle}</p>
          </>
        )}
      </div>
    );
  };
  
  const form = ReactDOM.createRoot(document.getElementById('form'));
  form.render(<FormComponent />);