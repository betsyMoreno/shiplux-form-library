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
                ${formProps.steps.map(
                  (stepForm, index) => `
                    <section
                        id={step-${id}-${index + 1}}
                        className={${componentsStyles.width} ${
                    componentsStyles.height
                  } ${componentsStyles.formBg} ${componentsStyles.formColor} ${
                    index !== 0 && "hidden"
                  } ${id}-form-step form-step}
                        key={form-${index}}
                    >
                        <div className="d-flex justify-between items-center">
                            <h2 className="font-normal">
                              Instant Shipping Quote <br /> Calculator
                            </h2>
                            <span className="form-stepper-circle">
                              <span>
                                ${index + 1} / ${formProps.steps.length}
                              </span>
                            </span>
                        </div>
                        <div className={${
                          componentsStyles?.sectionHeight
                        } mt-3}>
                            ${stepForm.map(
                              (input, index) => `
                                <div key={${input.name}-${index}}>
                                    <label>${input.field}</label>
                                    <input
                                      className={${
                                        componentsStyles.placeholcerColor
                                      }}
                                      placeholder={${input.placeholder}}
                                      name={${input.name}}
                                      {${{ ...input.validations }}}
                                    />
                                </div>
                                `
                            )}
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-end">
                                <button
                                    className={${componentsStyles.buttonBg} ${
                    componentsStyles.buttonColor
                  } button btn-navigate-form-step}
                                    type="button"
                                    step_number={${index + 1}}
                                    onClick={(e) => ${onFormNext(e, id)}}

                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                `
                )}
            </form>
        </div
   </div>
  `;
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
