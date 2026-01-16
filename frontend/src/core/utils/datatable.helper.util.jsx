export const fallback = (
  title,
  description,
  labels = [],
  actions = []
) => {
  const buttons = labels.map((label, index) => ({
    label,
    action: actions[index],
  }));

  return {
    title,
    description,
    buttons,
  };
};

export const createbtn = (
  label,
  action,
  permission
) => ({
  label,
  action,
  permission,
  provision: permission,
});

