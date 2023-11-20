import Input from '../Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import { email_validation, firstName_validation, lastName_validation, num_validation, password_validation, verifyPassword_validation } from '../../utils/inputValidation';
import './Form.scss';
import Button from '../Button/Button';

function Form() {
    const methods = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hej")
    }
  return (
    <FormProvider {...methods}>
        <form
            onSubmit={handleSubmit}
            autoComplete='on'
            className='form'
        >
            <section className="form__inputs">
                <Input {...firstName_validation} placeholder="First name"/>
                <Input {...lastName_validation} placeholder="Last name"/>
                <Input {...email_validation} placeholder="Email"/>
                <Input {...num_validation} placeholder="Phone" />
                <Input {...password_validation} placeholder="Password" />
                <Input {...verifyPassword_validation} placeholder="Verify password" />
            </section>
            <Button type="submit">Confirm</Button>
        </form>
    </FormProvider>
  )
}

export default Form