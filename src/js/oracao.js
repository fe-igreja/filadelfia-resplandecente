class FormSubmit {
  constructor(settings) { // Configurações [*]
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action"); // Atributos do Form
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success; // Msg de Sucesso
  }

  displayError() {
    this.form.innerHTML = this.settings.error; // Msg de Erro
  }

  FormComplete() {
    inputs = document.querySelectorAll("input")
    return inputs != ""
  }

  getFormObject() { // Corpo do Formulário, campos
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value; // Valor do Nome
    });
    return formObject;
  }

  //Coleta e retorna os erros de validação, se houver 
  validations(nome, mensagem = null) {
    const errors = {};

    if (!nome) {
      errors.nomeError = "Este campo é obrigatório.";
    } else if (nome.length > 30) {
      errors.nomeError = "Máximo de 30 caracteres.";
    }
    if (!mensagem) {
      errors.mensagemError = "Este campo é obrigatório.";
    } else if (mensagem.length > 250) {
      errors.mensagemError = "A mensagem é grande de mais.";
    }

    return errors;
  }

  //Limpa os erros ao iniciar envio de formulário
  clearErrors() {
    const errorElements = document.querySelectorAll(".formErrors");
    errorElements.forEach((element) => {
      element.innerText = "";
    });
  }

  // Exibe os erros se houver
  displayErrors(errors) {
    for (let key in errors) {
      document.getElementById(key).innerText = errors[key];
    }
  }

  onSubmission(event) {
    event.preventDefault();
    this.clearErrors();
    const submitButton = event.target;

    const formData = new FormData(submitButton);
    const nome = formData.get('nome');
    const mensagem = formData.get('mensagem');
    const errors = this.validations(nome, mensagem);

    if (Object.keys(errors).length > 0) {
      this.displayErrors(errors);
      return false;
    }
    submitButton.innerHTML = '<h1 style="text-align: center;">Enviando...</h1>';
    submitButton.disabled = true;
    return true;
  }

  async sendForm(event) { // Enviar o Formulário
    try {
      const valid = this.onSubmission(event);
      //O formulário só é enviado se estiver validado
      if (valid) {
        await fetch(this.url, { // Indica o Form submit, como e o que enviar
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()), // Converte um Object(js) para uma string json
        });
        this.displaySuccess();
      }
    } catch (error) { // Se der Erro
      this.displayError();
      throw new Error(error); // Erro mostrado no Console
    }
  }

  init() {
    if (this.form) this.form.addEventListener("submit", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({ // Constante de Ajuste, para o final, e enviar ao Email
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.<br><br>Verifique os campos e tente novamente!</h1>",
});
formSubmit.init();