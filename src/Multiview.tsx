import { Box, Spacer, Text, Transform, useInput } from "ink";
import React, { useMemo, useState } from 'react';
import useForceUpdate from "./useForceUpdate";

interface Props {
  screens: {
    name: string,
    component: JSX.Element
  }[]
}

export default function Multiview(props: Props) {

  const screens = props.screens;
  const forceUpdate = useForceUpdate()
  const [screenIdx, setScreenIdx] = useState(0);

  const screen = useMemo(() => {
    return screens.find((_, idx) => idx === screenIdx).component;
  }, [screens, screenIdx]);

  useInput((key) => {
    // on raspi its ^[[[A, no idea why...
    if(key.startsWith('^[')) key = key.substr(2);
    // F1 === [[A, F2 === [[B ... F5
    if(['[[A', '[[B', '[[C', '[[D', '[[E'].includes(key)) {
      const newIdx = key.charCodeAt(2) - 65;
      if(newIdx < screens.length)
        setScreenIdx(newIdx);
    }
    forceUpdate();
  })

  return (
    <Box flexDirection="column" width="100%">
      <Box
        paddingX={2}
        paddingY={0}
        flexGrow={1}
        borderStyle="double"
        borderColor="cyan"
      >
        {screen}
      </Box>
        <Box height={1} paddingLeft={2}>
          {screens.map((screen, idx) => <>
            <Text
              color={idx === screenIdx ? 'cyan' : ''}
            >F{idx + 1}: {screen.name}  </Text>
          </>)}
        </Box>
    </Box>
  )
}