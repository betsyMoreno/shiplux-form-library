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
    <div class="bg-[red]">
      ${formProps.steps.map(
        (stepForm, index) => `
      <section
      id={step-${id}-${index + 1}}
      class={${componentsStyles.width} ${componentsStyles.height} ${
          componentsStyles.formBg
        } ${componentsStyles.formColor} ${
          index !== 0 && "d-none"
        } ${id}-form-step form-step}
      key={form-${index}}
    >
      <div class="d-flex justify-between items-center">
        <h2 class="font-normal">
          Instant Shipping Quote <br /> Calculator
        </h2>
        <span class="form-stepper-circle">
          <span>
            {index + 1} / {formProps.steps.length}
          </span>
        </span>
      </div>
      {/* Mapping form inputs */}
      <div class={${componentsStyles?.sectionHeight} mt-3}>
      ${stepForm.map(
        (input, index) => `
        <div key={"${input.name}-${index}"}>
        <label>{input.field}</label>
        <input
          class={"${componentsStyles.placeholcerColor}"}
          placeholder={input.placeholder}
          name={input.name}
          {...input.validations}
        />
        </div>
        `
      )}
      </div>
      <div className="mt-3">
        <div className="d-flex justify-end">
          <button
            class={"${componentsStyles.buttonBg} ${
          componentsStyles.buttonColor
        } button btn-navigate-form-step"}
            type="button"
            step_number={index + 1}
            onClick={(e) => window.onFormNext(e, id)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
      `
      )}
    </div>
  `;
};
export default {
  renderForm,
};
