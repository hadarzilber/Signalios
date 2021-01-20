import React, { useState } from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  List,
  TextField,
  Tooltip,
  ListItemIcon,
  Divider,
  ListItemText,
  RootRef,
  IconButton
} from '@material-ui/core';
import { Row } from 'mui-flex-layout';
import { Clear, Add, DragIndicator } from '@material-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';

export default ({ name }) => {
  const [focused, setFocused] = useState(0);
  const { setValue, control } = useFormContext();
  const { fields, append, swap, remove, insert: insertToArray } = useFieldArray({ control, name });

  const newInputKey = `${name}-new`;
  const insert = val => {
    append({ name: val, checked: false });
    setValue(newInputKey, '');
  };

  const onEnter = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      insert(e.target.value);
    }
  };

  const handleKey = ({ e, index }) => {
    if (e.key === 'Enter') {
      insertToArray(index + 1, { name: '', checked: false });
      setFocused(index + 1);
    }
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    swap(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'droppable'}>
        {provided => (
          <RootRef rootRef={provided.innerRef}>
            <>
              <List dense>
                {fields.map((item, index) => {
                  return (
                    <>
                      <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                        {(provided, snapshot) => (
                          <ListItem
                            ContainerProps={{
                              ref: provided.innerRef
                            }}
                            {...provided.draggableProps}
                          >
                            <ListItemIcon>
                              <Row alignItems={'center'}>
                                <div {...provided.dragHandleProps}>
                                  <DragIndicator />
                                </div>
                              </Row>
                            </ListItemIcon>
                            <ListItemText>
                              <Controller
                                as={
                                  <TextField
                                    inputRef={input => focused === index && input && input.focus()}
                                    InputProps={{ disableUnderline: true }}
                                    fullWidth
                                    type={'text'}
                                  />
                                }
                                onKeyUp={e => handleKey({ e, index })}
                                name={`${name}[${index}].name`}
                                control={control}
                                defaultValue={item.name}
                              />
                            </ListItemText>
                            <ListItemSecondaryAction>
                              <Tooltip title={'Delete'}>
                                <IconButton
                                  onClick={() => remove(index)}
                                  size={'small'}
                                  disableRipple
                                  edge={'end'}
                                >
                                  <Clear />
                                </IconButton>
                              </Tooltip>
                            </ListItemSecondaryAction>
                          </ListItem>
                        )}
                      </Draggable>
                      <Divider variant={'inset'} />
                    </>
                  );
                })}
                <ListItem key={newInputKey}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>
                    <Controller
                      as={
                        <TextField
                          onKeyUp={onEnter}
                          InputProps={{ disableUnderline: true }}
                          fullWidth
                          type={'text'}
                        />
                      }
                      name={newInputKey}
                      control={control}
                      placeholder={'List item'}
                    />
                  </ListItemText>
                </ListItem>
                <Divider variant={'inset'} />
              </List>
              {provided.placeholder}
            </>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
};
