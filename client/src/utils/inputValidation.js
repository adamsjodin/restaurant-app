export const firstName_validation = {
  name: "first",
  type: "text",
  id: "firstName",
  placeholder: "",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const lastName_validation = {
  name: "last",
  type: "text",
  id: "lastName",
  placeholder: "",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const num_validation = {
  name: "num",
  type: "tel",
  id: "num",
  placeholder: "",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const email_validation = {
  name: "email",
  type: "email",
  id: "email",
  placeholder: "",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};

export const password_validation = {
  name: "password",
  type: "password",
  id: "password",
  placeholder: "",
  validation: {
    required: {
      value: true,
      message: "Password is required",
    },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      message:
        "Password must contain at least 1 capital letter and a special symbol",
    },
  },
};
