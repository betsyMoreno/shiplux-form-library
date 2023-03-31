export const renderForm = (id, formProps) => {
    const root = document.getElementById(id);
    console.log(formProps, "first version")
    root.innerHTML = <div>
        <p>form test</p>
    </div>
}