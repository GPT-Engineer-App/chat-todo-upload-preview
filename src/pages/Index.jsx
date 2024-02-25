import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Input, Button, Text, IconButton, useToast, Image, InputGroup, InputRightElement, List, ListItem, ListIcon, Divider, InputLeftElement, FormControl, FormLabel, InputRightAddon, Spacer } from "@chakra-ui/react";
import { FaPaperPlane, FaPlus, FaTrash, FaFileUpload } from "react-icons/fa";

const Index = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const sendMessage = () => {
    if (message.trim() !== "") {
      setChats([...chats, message]);
      setMessage("");
    }
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { text: todo, imageUrl: null }]);
      setTodo("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles([...files, { name: file.name, src: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ChakraProvider>
      <VStack spacing={8}>
        {/* Todo List */}
        <Box w="full" p={5} shadow="md" borderWidth="1px">
          <VStack>
            <InputGroup>
              <Input placeholder="Add a new task..." value={todo} onChange={(e) => setTodo(e.target.value)} />
              <InputRightElement children={<FaPlus cursor="pointer" onClick={addTodo} />} />
            </InputGroup>
            <List w="full">
              {todos.map((todoItem, index) => (
                <ListItem key={index} py={2}>
                  <HStack w="full">
                    {todoItem.imageUrl ? <Image boxSize="2rem" borderRadius="full" src={todoItem.imageUrl} alt={`Todo ${index}`} mr={2} /> : null}
                    <Text flex="1">{todoItem.text}</Text>
                    <IconButton icon={<FaTrash />} onClick={() => deleteTodo(index)} aria-label="Delete todo" size="sm" />
                  </HStack>
                  <Divider my={2} />
                </ListItem>
              ))}
            </List>
          </VStack>
        </Box>

        {/* File Upload and Preview */}
        <Box w="full" p={5} shadow="md" borderWidth="1px">
          <VStack>
            <FormControl>
              <FormLabel>Upload a file</FormLabel>
              <InputGroup>
                <Input type="file" p={1} onChange={handleFileChange} accept="image/*" />
                <InputRightAddon children={<FaFileUpload />} />
              </InputGroup>
            </FormControl>
            <HStack w="full" overflowX="auto">
              {files.map((file, index) => (
                <Box key={index} p={2} shadow="sm" borderWidth="1px" m={2}>
                  <Image boxSize="100px" objectFit="cover" src={file.src} alt={file.name} />
                  <Text fontSize="sm" mt={2} isTruncated>
                    {file.name}
                  </Text>
                </Box>
              ))}
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default Index;
