const validateForm = (formData) => {
    const errors = {};
  
    const {name, email, phone, password} = formData;
    // Example validation for name, email, and password
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (phone.length < 10) {
      errors.phone = 'Phone number must be 10 characters';
    }
  
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    return errors;
  };
  
  export { validateForm };
  