export const patterns = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
  userName: /[A-Za-z]/,
  vatNumber: /^[0-9]{11,20}/,
  nameEnPattern: "[a-zA-Z ]{2,40} *",
  nameArPattern: "[\u0600-\u06FF ]{2,40} *"
};
