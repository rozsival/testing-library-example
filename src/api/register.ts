export type RegistrationBody = {
  name: string;
  email: string;
};

export const register = async (body: RegistrationBody) => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'post',
    body: JSON.stringify(body),
  });
  return response.json();
};
