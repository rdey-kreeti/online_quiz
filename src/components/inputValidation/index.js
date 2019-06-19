const validateInput = (data) => {
  let errors = {};
  let isValid = false;

  if (!data.name.length) {
    errors.name = "name can't be blank";
  }

  if(!data.email.length) {
    errors.email = "email can't be blank"
  } else if (data.email.length) {
    const emailReg = RegExp('.+\@.+\..+');
    const isEmailValid = emailReg.test(data.email.toLowerCase());
    if (!isEmailValid) {
      errors.email = "Email is invalid";
    }
  }

  if(!data.dateOfBirth.length) {
    errors.dateOfBirth = "Date of Birth can't be blank";
  }

  if (!Object.keys(errors).length) {
    isValid = true;
  }

  return {errors, isValid};
};

export default validateInput;