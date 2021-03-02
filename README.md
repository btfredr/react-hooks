# Module 2 Lesson 1, in depth useState

So far you have used the "useState" hook in your lesson assignments, and I have not gone into more depth on it yet because I want you to get a feel for it before diving in deep.

## About hooks in general

Those of you who are keen have seen the videos I've been dropping in discord lately. I urge you to watch them if you have not done so already.

One video in particular from fireship.io goes into detail on hooks, and that is what we are going to do now.

### What are hooks?

A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. We’ll learn more about other Hooks later.

### When should you use a Hook?

If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component. We’re going to do that right now!

### Hook rules and tips.

**Only Call Hooks at the Top Level**

Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.

```jsx
// Don't do this:
if (name !== '') {
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });
}

// Instead do this:
useEffect(function persistForm() {
  if (name !== '') {
    localStorage.setItem('formData', name);
  }
});
```

**Only Call Hooks from React functions**

Don’t call Hooks from regular JavaScript functions. Instead, you can:

✅ Call Hooks from React function components.

✅ Call Hooks from custom Hooks

(we’ll learn about them later in the course, alternatively you can start learning about it here: https://reactjs.org/docs/hooks-custom.html).

By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.

**Enforce a structure**

It’s recommended to first declare state variables with useState hook, then write the subscriptions with useEffect hook followed by any function relevant to the component’s job.
Then finally, you return the elements to be rendered by the browser.

```jsx
// Don't do this:
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log('component is mounted');
  }, []);
  const [name, setName] = useState('');
  return <h1>React component order</h1>;
}

// Instead do this:
function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  useEffect(() => {
    console.log('component is mounted');
  }, []);
  return <h1>React component order</h1>;
}
```

### More about useState in particular

You all know the syntax to declare a state variable. So let's go into something that you might NOT know.

Take this example first:

```jsx
import { useState } from 'react';

const Nav = () => {
  const [open, setOpen] = useState(false);
```

The only thing we pass into the useState function itself is the initial state of our returned state variable. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a boolean to control our navbar, so pass `false` as initial state for our variable. (If we wanted to store two different values in state, we would call useState() twice.)

**What does useState return exactly?**

It returns a pair of values: the current state and a function that updates it. This is why we write `const [open, setOpen] = useState()`.

Those of you who have taken a dive into todays content in moodle already will see that this is array destructuring.

**useState is not necessarily for only one value**

Many useState examples you will see out there do the following:

```jsx
const [name, setName] = useState('John Doe');
const [email, setEmail] = useState('johndoe@email.com');
const [age, setAge] = useState(28);
```

I've done this a lot myself before I took a deeper dive into how useState works.

The clue is that useState can hold arrays and objects just fine.
So you can group related data like so:

```jsx
const [user, setUser] = useState({
  name: 'John Doe',
  email: 'john@email.com',
  age: 28
});
```

There is a caveat though. When using the useState’s update function to update the state, the previous state is replaced with the new state. You might have heard me talk about this if you were in class last friday.

In order to preserve the previous state, you need to merge it manually by creating a callback function that passes the current state value into it. Because the above example has user variable assigned as state value, you can pass it into setUser function as follows:

```jsx
setUser((user) = > ({ ...user, name: 'Nathan' }));
// result is { name:'Nathan', email: 'john@email.com', age: 28 }
```

Let's look deeper at this:

```jsx
import { useState } from 'react';

const PreserveState = () => {
  // Define our state variable and set the initial state as an object
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@email.com',
    age: 28
  });

  const updateUser = () => {
    // Calling setUser
    setUser(
      // Passing the user object into a callback function
      user => (
        // Here I'm using the spread operator "..." to make a copy of the user object.
        // what my setUser function sees at this point is:
        // setUser({name: 'John Doe',email: 'john@email.com',age: 28})
        { ...user },
        // Now i change the name value of the copied object to "Nathan"
        // This is what setUser sees in the end:
        // setUser({name: 'Nathan',email: 'john@email.com',age: 28})
        { name: 'Nathan' }
      )
    );
  };

  return (
    <>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <h3>{user.age}</h3>
      <button onClick={updateUser}>Update User</button>
    </>
  );
};
```

## Lesson Task

Start a new react project.

Create a new state variable called order and set it's initial state to an object with the following values:

```jsx
    id:
    item:
    price:
    stock:
```

id, price and stock should be numbers, while item should be a string.

Create a button that when clicked updates `item` and `price` with new values.

If you are up to the task... Create a form that can be used to edit all the values of the state variable.
