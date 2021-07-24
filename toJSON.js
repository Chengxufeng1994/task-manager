const pet = {
  name: 'Hal',
};

pet.toJSON = function () {
  console.log(this);

  return this;
};

console.log(JSON.stringify(pet));
