const savePlan = (name, plan) => {
  console.log("plans: ");
  let plans = getPlans();
  console.log(plans);
  plans.push({ name: name, plan: plan });
  window.localStorage.setItem("plans", JSON.stringify(plans));
};

const getPlans = () => {
  let plans = JSON.parse(window.localStorage.getItem("plans"));
  if (plans == null) plans = [];
  return plans;
};

const storageManager = {
  savePlan: savePlan,
  getPlans: getPlans,
};

export { storageManager };
