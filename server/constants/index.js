export const product = {
  name: 'Margarita',
  image: '/files/margarita.png',
  price: 9,
  description: 'Italian herbs, tomato sauce, tomatoes, mozzarella',
  enabled: ['mozzarella', 'blue cheese'],
}

export const adminData = {
  name: 'Anastasiya',
  email: 'test@mail.ru',
  password: '123',
}

export const userData = {
  ...adminData,
  email: 'newUSer@test.com',
}