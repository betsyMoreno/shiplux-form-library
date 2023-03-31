const renderForm = (id, formProps) => {
  const root = document.getElementById(id);
  console.log(formProps, "first version");
  root.innerHTML = `
    <div class="bg-[red]">
      <p>form test</p>
    </div>
  `;
};
export default {
  renderForm,
};
