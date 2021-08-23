import React from 'react';
import { Text, Box } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

export default function TaskView() {



  return (
    <Gradient name="pastel">
      <BigText
        font="tiny"
        text="Current Tasks"
      />
    </Gradient>
  )
}