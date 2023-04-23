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

const getState = () => {
  let state = JSON.parse(window.localStorage.getItem("lastState"));
  if (state == null || state.id == null || state.id == "file-input") {
    state = {
      id: "home",
      parameters: {
        grade: 0,
        plan: null,
        fileStatus: {
          lectureHalls: false,
          instructors: false,
          courses: false,
          serviceCourses: false,
        },
      },
    };
  }
  return state;
};

const saveState = (state) => {
  window.localStorage.setItem("lastState", JSON.stringify(state));
};

const storageManager = {
  savePlan: savePlan,
  getPlans: getPlans,
  getState: getState,
  saveState: saveState,
};

export { storageManager };
