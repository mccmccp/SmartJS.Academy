const regulars = {
  email: new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$'),
  password: new RegExp('[0-9]')
};
export const errorMessages = {
  email:"e-mail isn't valid",
  password:"password isn't valid",
  ALREADY_REGISTERED:"e-mail already registered"
};
export function checkValidation (inputName, val) {
  return regulars[inputName].test(val);
}

export function showError(inputName) {

}
