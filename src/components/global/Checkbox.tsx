import React, { useState } from "react";

interface Props {
  label: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({ label, onChange }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        {label}
      </label>
    </div>
  );
};
