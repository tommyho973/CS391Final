import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: "blue";
`;
const StyledForm = styled.form``;
const Label = styled.label``;
const Input = styled.input``;
const Button = styled.button``;
export default function AddTaskPage() {
  return (
    <StyledDiv>
      <StyledForm>
        <Label htmlFor="Task">Task</Label>
        <Input id="task" type="text" placeholder="Enter task description" />
        <Label htmlFor="CompletionDate">Completion Date</Label>
        <Input id="date" type="text" placeholder="Enter completion date" />
        <Label htmlFor="CompletionTime">Completion Time</Label>
        <Input id="time" type="text" placeholder="Enter completion time" />
        <Button type="submit">Submit</Button>
      </StyledForm>
    </StyledDiv>
  );
}
