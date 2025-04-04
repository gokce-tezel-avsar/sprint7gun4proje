import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Card } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
  email: '',
  password: '',
  terms: false,
};
export const errorMessages = {
    email:"Geçerli bir email adresi giriniz.",
    password:" En az 8 karakter giriniz.En az 1 büyük harf, küçük harf, sembol ve rakam içermelidir.",
    terms:"Giriş yapabilmek için lütfen şartları kabul edin."
}

export default function Login() {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState(
    {email:false,
    password:false,
    terms:false})
  const [isValid, setIsValid]= useState(false)
 
  const [isDisabled, setIsDisabled] = useState(false);
  const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    useEffect(() => {
        if(validateEmail(form.email) && regex.test(form.password) && form.terms === true){
            setIsValid(true);
        }else{
            setIsValid(false)
        }
        }, [form])
    

  const history = useHistory();

  const handleTermsChange = (event) => {
    let { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
           if(name=="terms") {
        if(isValid === !isValid) { 
            setIsDisabled(!checked);   
            setErrors({...errors, [name]:false })
        }else {
          setIsDisabled(checked);
            setErrors({...errors, [name]:true })
        }
    }
    }
    const handleChange = (event) => {
    let { name, value} = event.target;
    setForm({ ...form, [name]: value});
    if(name=="email") {
        if(validateEmail(value)){
            setErrors({...errors, [name]:false })
        }else {
            setErrors({...errors, [name]:true })
        }
    }
    if(name=="password") {
        if(regex.test(value)) {    
            setErrors({...errors, [name]:false })
        }else {
            setErrors({...errors, [name]:true })
        }
    }
    
    
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!isValid)return;

    axios.post('https://reqres.in/api/user', form)
     .then((response) => {
        response.password == form.password && response.email == form.email
        setForm(initialValues);
        history.push('/success');
     })
      .catch((error) => {
        console.error('Login Error:', error);
      });
    
    }
  
   

  return (
    <Card>
    <Form onSubmit={handleSubmit} >
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
          data-cy="email-input"
        />{errors.email && <FormFeedback data-cy="error-input">{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="pasword">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
          data-cy="password-input"
        />{errors.password && <FormFeedback data-cy="error-input">{errorMessages.password}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          onChange={handleTermsChange}
          checked={form.terms}
          invalid={errors.terms}
          data-cy="terms-input"
        />

        <Label for="terms">
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>{errors.terms && <FormFeedback data-cy="error-input">{errorMessages.terms}</FormFeedback>}

      <FormGroup className="text-center p-4">
        <Button data-cy="register-button" disabled={!isDisabled} color="primary">
         Kayıt Ol
        </Button>
      </FormGroup>
    </Form>
    </Card>
  )
}
