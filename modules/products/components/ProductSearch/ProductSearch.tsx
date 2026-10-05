import type { ChangeEvent } from "react";
import { Field } from "@/shared/components/Field";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSearch = ({ value, onChange }: ProductSearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Field
      label="Buscar"
      inline
      inputType="search"
      value={value}
      onChange={handleChange}
      placeholder="Buscar por nombre"
    />
  );
};
