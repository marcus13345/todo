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
    return children.map(child => {
      return React.cloneElement(
        child
      )
    })
  }, [children])

  return (
    <Box flexDirection="column">
      
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