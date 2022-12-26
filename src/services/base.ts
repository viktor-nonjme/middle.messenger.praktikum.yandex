import Router from '../utils/Router';

import Tooltip from '../UI/Tooltip';
import Spinner from '../UI/Spinner';

import { TProps } from '../types';

export default class BaseService {
  protected toggleSpinner(isHidden: boolean) {
    Spinner.setProps({ isHidden });
  }

  protected redurectTo(pathname: string, timeout: number) {
    setTimeout(() => {
      Router.go(pathname);
    }, timeout);
  }

  protected clearForm(inputs: TProps) {
    Object.values(inputs).forEach((element) => {
      if (element.props.value !== undefined) {
        element.setProps({ value: '', error: '' });
      }
    });
  }

  protected displayTooltip(type: string, text: string) {
    Tooltip.setProps({ type, text });
  }
}
