const renderForm = (id, formProps) => {
  const root = document.getElementById(id);

  const componentsStyles = {
    placeholcerColor: `placeholder:text-[${formProps?.placeholder_color}]`,
    formBg: `bg-[${formProps?.background}]`,
    formColor: `text-[${formProps?.color}]`,
    buttonBg: `${`bg-[${
      formProps?.bgButton ? formProps?.bgButton : "#4361ee"
    }]`}`,
    buttonColor: `text-[${
      formProps?.colorButton ? formProps?.colorButton : "#fffff"
    }]`,
    height: `min-h-[${formProps.height}px]`,
    width: `min-w-[${formProps.width}px]`,
    sectionHeight: `min-h-[${
      formProps.height ? formProps.height / 1.6 : 264
    }px]`,
  };

  root.innerHTML = `
   <div>
        <div id="multi-step-form-container">
            <form
                id="userAccountSetupForm"
                name="userAccountSetupForm"
                encType="multipart/form-data"
            >
                ${formProps.steps.map((stepForm, index) => {
                  return `
                    <section
                        id="step-${id}-${index + 1}"
                        class="${componentsStyles.width} ${
                    componentsStyles.height
                  } ${componentsStyles.formBg} ${componentsStyles.formColor} ${
                    index !== 0 && "hidden"
                  } ${id}-form-step form-step"
                        key="form-${index}"
                    >
                        <div class="flex justify-between items-center">
                            <h2 class="font-normal">
                              Instant Shipping Quote <br /> Calculator
                            </h2>
                            <span class="form-stepper-circle">
                              <span>
                                ${index + 1} / ${formProps.steps.length}
                              </span>
                            </span>
                        </div>
                        <div class="${componentsStyles?.sectionHeight} mt-3">
                            ${stepForm.map((input, index) => {
                              return `
                                <div key="${input.name}-${index}">
                                    <label class="block">${input.field}</label>
                                    <input
                                      class="${
                                        componentsStyles.placeholcerColor
                                      }"
                                      placeholder="${input.placeholder}"
                                      name="${input.name}"
                                      ${{ ...input.validations }}
                                    />
                                </div>
                                `;
                            })}
                        </div>
                        <div class="mt-3">
                            <div class="flex justify-end">
                                <button
                                    class="${componentsStyles.buttonBg} ${
                    componentsStyles.buttonColor
                  } button btn-navigate-form-step"
                                    type="button"
                                    step_number="${index + 1}"
                                    id="onNextButton"

                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                `;
                })}
            </form>
        </div
   </div>
  `;
  const nextButton = document.getElementById("onNextButton");

  if (nextButton) {
    nextButton.addEventListener(("click", (e) => onFormNext(e, id)));
  }
};

function onFormNext(formNavigationBtn, id) {
  const stepNumber = parseInt(
    formNavigationBtn.target.getAttribute("step_number")
  );

  navigateToFormStep(stepNumber + 1, id);
}

function navigateToFormStep(stepNumber, id) {
  if (
    Array.from(document.querySelectorAll(`.${id}-form-step`)).length ===
    stepNumber - 1
  ) {
    return;
  }

  /**
   * Hide all form steps.
   */
  document.querySelectorAll(`.${id}-form-step`).forEach((formStepElement) => {
    formStepElement.classList.add("hidden");
  });

  /**
   * Show next form step
   */
  document
    .querySelector(`#step-${id}-` + stepNumber)
    .classList.remove("hidden");
}

export default {
  renderForm,
};
