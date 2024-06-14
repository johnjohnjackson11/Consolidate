// File path: src/RadioToggleButtonGroup.js

import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const RadioToggleButtonGroup = ({ type, currentValue, onChange }) => {
  return (
    <ButtonGroup>
      {['New', 'Link', 'N/A'].map((value) => (
        <ToggleButton
          key={value}
          id={`${type}_${value}`}
          type="radio"
          variant="outline-primary"
          name={`radio_${type}`}
          value={value}
          checked={currentValue === value}
          onChange={(e) => onChange(e.currentTarget.value, type)}
        >
          {value}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default RadioToggleButtonGroup;
