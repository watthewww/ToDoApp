import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim() === '') return;
    const newTask = { id: Date.now(), text: taskText, completed: false };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const handleToggleTask = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity style={[styles.uncheckButton, item.completed && styles.checkButton]} onPress={() => handleToggleTask(item.id)}>
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To Do List</Text>
      <TextInput
        style={styles.input}
        value={taskText}
        onChangeText={text => setTaskText(text)}
        onSubmitEditing={handleAddTask}
      />
      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 35,
  },

  input: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  list: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  taskText: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
    alignSelf: 'flex-end'
  },
  uncheckButton: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,


  },
});
