export const domInject = (selector: string) => (target: unknown, key: string): void => {
  let elemento: JQuery;
  const getter = () => {
    if (!elemento) {
      console.log(`Buscando ${selector} para injetar em ${key}`);
      elemento = $(selector);
    }
    return elemento;
  };

  Object.defineProperty(target, key, {
    get: getter,
  });
};
