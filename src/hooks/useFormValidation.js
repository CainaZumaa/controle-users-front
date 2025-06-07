import { useState, useCallback } from "react";

export const useFormValidation = (initialState = {}, validationRules = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState({});

  const validateField = useCallback((field, value, rules) => {
    if (!rules) return { isValid: true, error: "" };

    const fieldRules = rules[field];
    if (!fieldRules) return { isValid: true, error: "" };

    for (const rule of fieldRules) {
      const { validate, message } = rule;
      if (!validate(value)) {
        return { isValid: false, error: message };
      }
    }

    return { isValid: true, error: "" };
  }, []);

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      const { isValid: fieldIsValid, error } = validateField(
        field,
        value,
        validationRules
      );

      setErrors((prev) => ({ ...prev, [field]: error }));
      setIsValid((prev) => ({ ...prev, [field]: fieldIsValid }));
    },
    [validateField, validationRules]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    const newIsValid = {};

    Object.keys(validationRules).forEach((field) => {
      const { isValid: fieldIsValid, error } = validateField(
        field,
        formData[field],
        validationRules
      );
      newErrors[field] = error;
      newIsValid[field] = fieldIsValid;
    });

    setErrors(newErrors);
    setIsValid(newIsValid);

    return Object.values(newIsValid).every(Boolean);
  }, [formData, validateField, validationRules]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setIsValid({});
  }, [initialState]);

  return {
    formData,
    errors,
    isValid,
    handleInputChange,
    validateForm,
    resetForm,
    setFormData,
  };
};

// validações
export const commonValidationRules = {
  email: [
    {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Por favor, insira um email válido",
    },
  ],
  password: [
    {
      validate: (value) => value.length >= 6,
      message: "A senha deve ter pelo menos 6 caracteres",
    },
  ],
};
