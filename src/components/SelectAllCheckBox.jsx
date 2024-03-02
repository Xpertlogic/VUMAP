import React from "react";
import { Checkbox } from "antd";
const SelectAllCheckbox = ({
  indeterminate,
  checkAll,
  onCheckAllChange,
  title,
}) => {
  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        {title}
      </Checkbox>
    </div>
  );
};
export default SelectAllCheckbox;
