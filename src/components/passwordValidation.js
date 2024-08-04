// Función para verificar si la contraseña cumple con la longitud mínima de 8 caracteres
const isValidLength = (password) => {
  return password.length >= 8;
};

// Función para verificar si la contraseña tiene al menos una mayúscula
const hasUpperCase = (password) => {
  return /[A-Z]/.test(password);
};

// Función para verificar si la contraseña tiene al menos una minúscula
const hasLowerCase = (password) => {
  return /[a-z]/.test(password);
};

// Función para verificar si la contraseña tiene al menos un carácter especial
const hasSpecialCharacter = (password) => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

// Función para verificar si la contraseña no tiene números consecutivos
const hasNoConsecutiveNumbers = (password) => {
  return !/(\d)\1/.test(password); // No permite números consecutivos
};

// Función para verificar si la contraseña no tiene letras consecutivas exactas
const hasNoConsecutiveLetters = (password) => {
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      return false;
    }
  }
  return true;
};

// Función para validar la contraseña según todas las reglas
const validatePassword = (password) => {
  const lengthValid = isValidLength(password);
  const upperCaseValid = hasUpperCase(password);
  const lowerCaseValid = hasLowerCase(password);
  const specialCharValid = hasSpecialCharacter(password);
  const noConsecutiveNumbersValid = hasNoConsecutiveNumbers(password);
  const noConsecutiveLettersValid = hasNoConsecutiveLetters(password);

  console.log('Length valid:', lengthValid);
  console.log('Upper case valid:', upperCaseValid);
  console.log('Lower case valid:', lowerCaseValid);
  console.log('Special character valid:', specialCharValid);
  console.log('No consecutive numbers valid:', noConsecutiveNumbersValid);
  console.log('No consecutive letters valid:', noConsecutiveLettersValid);

  return (
    lengthValid &&
    upperCaseValid &&
    lowerCaseValid &&
    specialCharValid &&
    noConsecutiveNumbersValid &&
    noConsecutiveLettersValid
  );
};

export {
  isValidLength,
  hasUpperCase,
  hasLowerCase,
  hasSpecialCharacter,
  hasNoConsecutiveNumbers,
  hasNoConsecutiveLetters,
  validatePassword
};
