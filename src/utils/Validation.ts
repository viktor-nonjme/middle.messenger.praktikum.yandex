class Validation {
  static validationRegexs = {
    login: /^(?!\d+$)[A-Za-z-_0-9]{3,20}$/,
    password: /\w{8,40}/,
    phone: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
    message: /.+/,
  };

  static formValidators: Record<string, Function> = {
    login: (value: string) => Validation.loginValidation(value),
    password: (value: string) => Validation.passwordValidation(value),
    newPassword: (value: string) => Validation.passwordValidation(value),
    confirmPassword: (value: string) => Validation.passwordValidation(value),
    oldPassword: (value: string) => Validation.passwordValidation(value),
    phone: (value: string) => Validation.phoneValidation(value),
    email: (value: string) => Validation.emailValidation(value),
    message: (value: string) => Validation.messageValidation(value),
    first_name: (value: string) => Validation.nameValidation(value),
    second_name: (value: string) => Validation.nameValidation(value),
    password_repeat: (value: string) => Validation.passwordValidation(value),
    newPasswordRepeat: (value: string) => Validation.passwordValidation(value),
  };

  static inputValidation(value: string | number, reg: RegExp) {
    const regexp = new RegExp(reg);
    if (!value) {
      return false;
    }
    return regexp.test(String(value));
  }

  static loginValidation(value: string) {
    const isValid = Validation.inputValidation(value, Validation.validationRegexs.login);
    if (!isValid) {
      return 'Некорректный логин';
    }
    return '';
  }

  static emailValidation(value: string) {
    const isValid = Validation.inputValidation(value, Validation.validationRegexs.email);
    if (!isValid) {
      return 'Email некорректный';
    }
    return '';
  }

  static nameValidation(value: string) {
    const isValid = Validation.inputValidation(value, Validation.validationRegexs.name);
    if (!isValid) {
      return 'Некорректное значение';
    }
    return '';
  }

  static passwordValidation(value: string) {
    const isValid = Validation.inputValidation(value, Validation.validationRegexs.password);
    if (!isValid) {
      return 'Пароль некорректный';
    }
    return '';
  }

  static messageValidation(value: string) {
    const isValid = Validation.inputValidation(value, Validation.validationRegexs.message);
    if (!isValid) {
      return 'Сообщение не может быть пустым';
    }
    return '';
  }

  static phoneValidation(value: string) {
    const isValid = Validation.inputValidation(value, Validation.validationRegexs.phone);
    if (!isValid) {
      return 'Номер телефона некорректный';
    }
    return '';
  }

  static checkElement(element: HTMLInputElement): { [key: string]: string } {
    const { name, value } = element;
    const error = Validation.formValidators[name](value);
    return {
      value, error,
    };
  }

  static onSubmitValidation(form: HTMLFormElement) {
    const [...elements] = form;
    let isValid: boolean = true;
    for (const element of elements) {
      // @ts-ignore
      if (element.nodeName === 'INPUT') {
        // @ts-ignore
        const { error } = Validation.checkElement(element);
        if (error.length > 0) {
          isValid = false;
        }
      }
    }
    return isValid;
  }
}

export default Validation;
