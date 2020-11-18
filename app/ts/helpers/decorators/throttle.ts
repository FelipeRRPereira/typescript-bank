export const throttle = (milisegundos = 500) => (
  _target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const metodoOriginal = descriptor.value;
  let timer = 0;

  descriptor.value = function (...args: unknown[]) {
    if (event) event.preventDefault();
    clearInterval(timer);
    timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
  };

  return descriptor;
};
