// Async controller mein error aaye to apne aap errorHandler tak pahunch jata hai
// (har jagah try/catch likhne ki zaroorat nahi)
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
