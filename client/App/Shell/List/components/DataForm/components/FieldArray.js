import React, { useState } from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  List,
  TextField,
  Checkbox,
  Tooltip,
  ListItemIcon,
  Divider,
  Typography,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  RootRef,
  IconButton
} from '@material-ui/core';
import { Row } from 'mui-flex-layout';
import { Clear, Add, DragIndicator, ExpandMore } from '@material-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';

const CompletedText = styled(TextField)`
  .MuiInputBase-input {
    text-decoration: line-through;
    color: ${({
      theme: {
        palette: {
          text: { secondary: main }
        }
      }
    }) => main};
  }
`;

export default ({ name }) => {
  const { setValue, watch, control } = useFormContext();
  const [focused, setFocused] = useState(0);
  const { fields, append, swap, remove, insert: insertToArray } = useFieldArray({ control, name });

  const newInputKey = `${name}-new`;
  const insert = val => {
    append({ name: val, checked: false });
    setValue(newInputKey, '');
  };

  const onEnter = e => {
    if (e.key === 'Enter') {
      insert(e.target.value);
      e.preventDefault();
    }
  };

  const onRemove = index => {
    remove(index);
  };

  const unCheck = index => {
    fields[index].checked = false;
    watch(`${name}[${index}]`);

    return false;
  };

  const check = index => {
    fields[index].checked = true;
    watch(`${name}[${index}]`);

    return true;
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'droppable'}>
          {provided => (
            <RootRef rootRef={provided.innerRef}>
              <>
                <List dense>
                  {fields.map((item, index) => {
                    return (
                      !item.checked && (
                        <>
                          <Draggable key={item.id} draggableId={`${name}${index}`} index={index}>
                            {(provided, snapshot) => (
                              <ListItem
                                ContainerProps={{ ref: provided.innerRef }}
                                {...provided.draggableProps}
                              >
                                <ListItemIcon>
                                  <Row alignItems={'center'}>
                                    <div {...provided.dragHandleProps}>
                                      <DragIndicator />
                                    </div>
                                    <Controller
                                      as={<Checkbox />}
                                      name={`${name}[${index}].checked`}
                                      control={control}
                                      onChange={() => check(index)}
                                      defaultValue={item.checked}
                                    />
                                  </Row>
                                </ListItemIcon>
                                <ListItemText>
                                  <Controller
                                    as={
                                      <TextField
                                        inputRef={input =>
                                          focused === index && input && input.focus()
                                        }
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
                                      onClick={() => onRemove(index)}
                                      size={'small'}
                                      disableRipple
                                      edge={'end'}
                                    >
                                      <Clear />
                                    </IconButton>
                                  </Tooltip>
                                </ListItemSecondaryAction>
                                {provided.placeholder}
                              </ListItem>
                            )}
                          </Draggable>
                          <Divider variant={'inset'} />
                        </>
                      )
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
      {fields.some(x => x.checked) && (
        <ExpansionPanel defaultExpanded elevation={0}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant={'h6'}>
              {`${fields.filter(x => x.checked).length} Completed ${name}`}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {fields.map(
                (x, index) =>
                  x.checked && (
                    <ListItem key={x.id}>
                      <ListItemIcon>
                        <Controller
                          as={<Checkbox />}
                          name={`${name}[${index}].checked`}
                          control={control}
                          onChange={() => unCheck(index)}
                          defaultValue={x.checked}
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <Controller
                          as={
                            <CompletedText
                              InputProps={{ disableUnderline: true }}
                              fullWidth
                              type={'text'}
                            />
                          }
                          name={`${name}[${index}].name`}
                          control={control}
                          defaultValue={x.name}
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
                  )
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </>
  );
};
