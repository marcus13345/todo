import { Box, Text } from "ink";
import React, { useCallback, useMemo, useState } from "react";

const Input = ({

}: any) => {

  return (
    <Text></Text>
  )
}

const Form = ({
  children
}: any) => {

  const [formData, setFormData] = useState({});

  const handleData = useCallback((datum) => {

  }, []);

  const modifiedChildren = useMemo(() => {
    return React.Children.map(children, child => {
      return React.cloneElement(
        child,
        {
          updateData: handleData
        }
      )
    });
  }, [children]);

  return (
    <Box flexDirection="column">
      {modifiedChildren}
    </Box>
  );
}

export default function NewTask() {
  return (
    <Form>
      <Input />
    </Form>
  )
}