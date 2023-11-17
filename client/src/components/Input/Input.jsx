import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import './Input.css';

function Input({ type, id, placeholder, validation, name }) {
  const { register, formState: { errors } } = useFormContext();

  useEffect(() => {
    if (errors[name]) {
      const timeoutId = setTimeout(() => {
        console.log(`Input: ${name}, Error:`, errors[name]);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [errors, name]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {errors[name] && (
          <InputError message={errors[name].message} key={errors[name].message} />
        )}
      </AnimatePresence>
      <input
        className={`input ${errors[name] ? 'input-error' : ''}`}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name, validation)}
      />
    </>
  );
}

const InputError = ({ message }) => {
  return (
    <motion.p {...framer_error}>
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default Input;
