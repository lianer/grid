interface Materials {
  [id: number]: any;
}

const materials: Materials = {
  1: '@/materials/text',
};

const loadById = async function (id: number) {
  const src = materials[id];
  if (!src) {
    throw new Error(`resource not found: ${id}`);
  }
  return import(src);
};

export { loadById };
