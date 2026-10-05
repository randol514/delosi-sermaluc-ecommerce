import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import styles from "./field.module.sass";

type FieldControl = "input" | "textarea" | "select";
type FieldState = "focus" | "filled" | "error" | "success" | "disabled";

interface FieldOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface FieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  as?: FieldControl;
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  label?: ReactNode;
  icon?: ReactNode;
  state?: FieldState;
  options?: FieldOption[];
  inline?: boolean;
}

export const Field = ({
  as = "input",
  inputType = "text",
  label,
  icon,
  state,
  options = [],
  id,
  className,
  disabled = false,
  inline = false,
  ...inputProps
}: FieldProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const currentState = disabled ? "disabled" : state;
  const classes = [
    styles["field"],
    as !== "input" && styles[`field--${as}`],
    currentState && styles[`field--${currentState}`],
    inline && styles["field--inline"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const controlProps = {
    ...inputProps,
    id: fieldId,
    disabled,
    className: styles["field__input"],
  };

  return (
    <div className={classes}>
      {label && (
        <label className={styles["field__label"]} htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className={styles["field__inside"]}>
        {as === "textarea" && (
          <textarea
            {...(controlProps as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        )}
        {as === "select" && (
          <select
            {...(controlProps as unknown as SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
        {as === "input" && <input {...controlProps} type={inputType} />}
        {icon && <span className={styles["field__icon"]}>{icon}</span>}
      </div>
    </div>
  );
};
