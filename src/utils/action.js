const handleInputChange = (field, value, data, setData) => {
  setData({ ...data, [field]: value });
};

const selectItem = (value, key, data, setData) => {
  setData({ ...data, [key]: value });
};

const getTitle = (action_type) => {
  switch (action_type) {
    case "1":
      return "sleep";

    case "2":
      return "eat";

    case "3":
      return "diaper";

    default:
      return "eat";
  }
};

const validateSleep = (d, t) => {
  const requireds = [];
  if (!d.start_date) {
    requireds.push("field-start-date-required");
  }

  if (!d.end_date) {
    requireds.push("field-end-date-required");
  }

  return requireds;
};

const validateEat = (d, t) => {
  const requireds = [];
  if (!d.type) {
    requireds.push("field-type-required");
  }

  if (d.type === 1) {
    if (!d.start_date) {
      requireds.push("field-start-date-required");
    }
  }

  if (d.type === 2) {
    if (!d.side) {
      requireds.push("field-side-required");
    }
    if (!d.start_date) {
      requireds.push("field-start-date-required");
    }
    if (!d.end_date) {
      requireds.push("field-end-date-required");
    }
  }

  return requireds;
};

const validateDiaper = (d) => {
  const requireds = [];
  if (!d.type) {
    requireds.push("field-type-required");
  }

  if (!d.start_date) {
    requireds.push("field-start-date-required");
  }

  return requireds;
};

const validateFields = (data, actionType) => {
  switch (actionType) {
    case "1":
      return validateSleep(data);

    case "2":
      return validateEat(data);

    case "3":
      return validateDiaper(data);

    default:
      return validateEat(data);
  }
};

export {
  handleInputChange,
  getTitle,
  selectItem,
  validateFields,
};
