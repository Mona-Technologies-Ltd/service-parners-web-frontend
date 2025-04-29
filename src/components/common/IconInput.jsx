import React, { useState } from "react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

const IconInput = ({
  prefix,
  suffix,
  prefixIconName,
  suffixIconName,
  showCircle = false,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderIcon = (iconName, isPrefix = true) => {
    if (!iconName) return null;

    const icon = (
      <Icon
        icon={iconName}
        className={`input-icon ${
          type === "password" && !isPrefix
            ? "input-icon--clickable"
            : "input-icon--default"
        }`}
        onClick={
          type === "password" && !isPrefix
            ? () => setShowPassword(!showPassword)
            : undefined
        }
      />
    );

    if (showCircle && isPrefix) {
      return <div className="icon-circle">{icon}</div>;
    }

    return icon;
  };

  const getPasswordIcon = () => {
    return showPassword ? "mdi:eye-off" : "mdi:eye";
  };

  return (
    <div className="icon-input">
      <Input
        prefix={prefix || (prefixIconName && renderIcon(prefixIconName, true))}
        suffix={
          suffix ||
          (type === "password"
            ? renderIcon(getPasswordIcon(), false)
            : suffixIconName && renderIcon(suffixIconName, false))
        }
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...props}
      />
    </div>
  );
};

IconInput.propTypes = {
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  prefixIconName: PropTypes.string,
  suffixIconName: PropTypes.string,
  showCircle: PropTypes.bool,
  type: PropTypes.string,
};

export default IconInput;
