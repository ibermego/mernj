test('should return user data from API', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.id).toBe(1);
  });
  