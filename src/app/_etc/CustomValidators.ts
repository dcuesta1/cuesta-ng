import { ValidatorFn, FormGroup, Validators, ValidationErrors, AbstractControl } from "@angular/forms";

export let CustomValidators = {
    emailOrEmpty: function(control: AbstractControl): ValidationErrors | null {
        return control.value === '' || control.value === null ? null : Validators.email(control);
    },

    // Sucks because of constants
    passwordMatch(control: AbstractControl) {
        const password = control.root.get('password');
        const confirm = control.value;

        if (!password || !confirm) return null;

        if( password.value === confirm ) {
            return null;
        }
        return { nomatch: true };
    },
}