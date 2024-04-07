import { AbstractControl, ValidationErrors } from "@angular/forms";

export function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noSpaces: true };
    }
    return null;
  }