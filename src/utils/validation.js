const validationConfig = {
  fields: {
    name: {
      required: "Name is required",
    },
    imageUrl: {
      required: "Link is required",
      pattern: {
        value: /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i,
        message: "This is not a valid image link",
      },
    },
    temperature: {
      required: "Please select a weather type",
    },
  },
};

const validateField = (name, value, config = validationConfig) => {
  const rules = config.fields[name];
  if (!rules) return "";
  if (rules.required && !String(value).trim()) return rules.required;
  if (rules.pattern && !rules.pattern.value.test(value))
    return rules.pattern.message;
  return "";
};

const isFormValid = (values, config = validationConfig) => {
  return Object.keys(config.fields).every(
    (field) => !validateField(field, values[field] ?? "", config),
  );
};

export { validationConfig, validateField, isFormValid };
