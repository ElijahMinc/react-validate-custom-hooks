import React, { useEffect, useState } from 'react'
import styles from './FormPage.module.css'
import PropTypes from 'prop-types';


const useValidation = (value, validations) => {

   const [isEmpty, setEmpty] = useState(true)

   const [minLengthError, setMinLengthError] = useState(false)

   const [maxLengthError, setMaxLengthError] = useState(false)

   const [emailError, setEmailError] = useState(false)

   const [inputValid, setInputValid] = useState(false)

   React.useEffect(() => {
      for (const validation in validations) {
         switch (validation) {
            case "minLength":
               value.length < validations[validation]
                  ?
                  setMinLengthError(true)
                  :
                  setMinLengthError(false)
               break;
            case "isEmpty":
               value ? setEmpty(false) : setEmpty(true)
               break;
            case "maxLength":
               value.length > validations[validation]
                  ?
                  setMaxLengthError(true)
                  :
                  setMaxLengthError(false)
               break;
            case "isEmail":
               const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
               break;

         }
      }
   }, [value])

   useEffect(() => {
      if (isEmpty || maxLengthError || minLengthError || emailError) {
         setInputValid(false)
      } else {
         setInputValid(true)
      }
   }, [isEmpty, maxLengthError, minLengthError, emailError])


   return {
      isEmpty,
      minLengthError,
      maxLengthError,
      emailError,
      inputValid
   }
}

const useInput = (initialValue, validations) => {
   const [value, setValue] = React.useState(initialValue)
   const [isDirty, setDirty] = React.useState(false)

   const valid = useValidation(value, validations)

   const onChange = (e) => {
      setValue(e.target.value)
   }


   const onBlur = (e) => {
      setDirty(true)
   }
   // console.log(valid)

   return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid // здесь уже идет деструктуризация ( isEmpty, minLengthError )
   }
}

const FormPage = () => {

   const email = useInput('', {
      isEmpty: true,
      minLength: 3,
      isEmail: true
   })
   const password = useInput('', {
      isEmpty: true,
      minLength: 5,
      maxLength: 8
   })


   return (
      <form className="col s12 form__item">
         <div className="row">
            <div className="input-field col s12">
               <input onChange={email.onChange} onBlur={email.onBlur} value={email.value} id="email" placeholder="Email" type="email" name="email" className="validate" />
            </div>
            {(email.isDirty && email.isEmpty) && <div style={{ color: 'red' }}>Поле не может быть пустым</div>}
            {(email.isDirty && email.minLengthError) && <div style={{ color: 'red' }}>Не корректная длина</div>}
            {(email.isDirty && email.emailError) && <div style={{ color: 'red' }}>Не корректный емейл</div>}
         </div>
         <div className="row">
            <div className="input-field col s12">
               <input onChange={password.onChange} onBlur={password.onBlur} value={password.value} placeholder="Password" type="password" name="password" className="validate" />
            </div>
            {(password.isDirty && password.isEmpty) && <div style={{ color: 'red' }}>Поле не может быть пустым</div>}
            {(password.isDirty && password.minLengthError) && <div style={{ color: 'red' }}>Не корректная длина</div>}
            {(password.isDirty && password.maxLengthError) && <div style={{ color: 'red' }}>Слишком длинное слово</div>}
         </div>

         <button disabled={!email.inputValid || !password.inputValid} type="submit" className="waves-effect waves-light btn">Send</button>
      </form>
   )
}

FormPage.propTypes = {
   prop: PropTypes.string
};

export default FormPage