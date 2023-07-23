import React from "react";
import { useForm } from "react-hook-form";

import styles from "./Form.module.css";

const Form = ({ formFields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form className={styles.formFlex} onSubmit={handleSubmit(onSubmit)}>
        {formFields.fields.map((field) => (
          <div key={field.name}>
            <label>{field.name}:</label> <br />
            <input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name, field.rules)}
            />
            {errors[field.name] && (
              <span className={styles.errorMessage}>{field.errorText}</span>
            )}
          </div>
        ))}
        <input type="submit" />
      </form>
    </>
  );
};

export default Form;
