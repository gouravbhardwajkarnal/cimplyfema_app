import { FormGroup } from '@angular/forms';
    
export function ConfirmedValidator(pan: string, gst: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[pan];
        const matchingControl = formGroup.controls[gst];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value.slice(2,12)) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}