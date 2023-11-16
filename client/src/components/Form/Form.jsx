import Input from '../Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import { email_validation, firstName_validation, lastName_validation, num_validation, password_validation } from '../../utils/inputValidation';
import './Form.css';

function Form() {
    const methods = useForm();
  return (
    <FormProvider {...methods}>
        <form
            autoComplete='on'
            className='form'
        >
            <section className="inputs">
                <Input {...firstName_validation} placeholder="First name"/>
                <Input {...lastName_validation} placeholder="Last name"/>
                <Input {...email_validation} placeholder="Email"/>
                <Input {...num_validation} placeholder="Phone" />
                <Input {...password_validation} placeholder="Password" id="password" />
                <Input {...password_validation} placeholder="Verify password" id="verify_password" />
            </section>
            <button type='submit'>Submit</button>
        </form>
    </FormProvider>
  )
}

export default Form