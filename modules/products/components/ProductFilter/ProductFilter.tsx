import { ArrowDown } from "lucide-react";
import { Field } from "@/shared/components/Field";

interface ProductFilterProps {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
}

export const ProductFilter = ({
  categories,
  value,
  onChange,
}: ProductFilterProps) => {
  return (
    <Field
      as="select"
      label="Filtrar por"
      inline
      value={value}
      onChange={(event) => onChange(event.target.value)}
      options={[
        ...categories.map((category) => ({
          value: category,
          label: category,
        })),
      ]}
      icon={<ArrowDown size={14} />}
    />
  );
};
