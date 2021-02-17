const contentType = 'application/json';

export async function addTodo(todo) {
  try {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify({
        task: todo.task,
        isCompleted: false,
      }),
    });

    if (!res.ok) {
      throw new Error(res.status);
    }
  } catch (error) {
    throw new Error('server error');
  }
}

export async function deleteTodo(_id) {
  try {
    const res = await fetch('/api', {
      method: 'DELETE',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify({
        _id,
      }),
    });

    if (!res.ok) {
      throw new Error(res.status);
    }
  } catch (error) {
    throw new Error('server error');
  }
}
